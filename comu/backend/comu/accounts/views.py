from django.contrib.auth import get_user_model
from rest_framework.response import Response
from . import serializers
from comu import settings
from django.utils.translation import gettext as _
from accounts.serializers import AccountDetailsSerializer, AccountLoginSerializer, AccountRegistrationSerializer,\
                                ProfileSerializer, UserProfileSerializer, UserSerializer
from rest_auth.registration.views import LoginView, RegisterView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from django.db.models import Q
from rest_framework.authtoken.models import Token
from rest_framework import status, views, generics
from accounts.models import Profile

User = get_user_model()

class Login(views.APIView):
    permission_classes = (AllowAny,)
    serializer_class = AccountLoginSerializer
    queryset = User.objects.all()

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.data['email']
            password = serializer.data['password']
            if not email and not password:
                return Response("Please enter password or email to login.")
            user = User.objects.filter(
                Q(email=email) | Q(password=password)
                ).exclude(
                    email__isnull=True
                ).exclude(
                    email__iexact=''
                ).distinct()
            if user.exists() and user.count() == 1:
                user_obj = user.first()
            else:
                return Response("This username/email is not valid.", status=status.HTTP_400_BAD_REQUEST)
            if user_obj:
                if not user_obj.check_password(password):
                    return Response("Invalid credentials.", status=status.HTTP_400_BAD_REQUEST)
            if user_obj.is_active:
                token, created = Token.objects.get_or_create(user=user_obj)
                return Response({'token': token.key, 'username': user_obj.username, 'id': user_obj.id},
                    status=status.HTTP_200_OK)
            else:
                return Response("User not active.", status=status.HTTP_400_BAD_REQUEST)


class CustomRegistrationView(RegisterView):
    """
    Custom registration view.
    """
    serializer_class = AccountRegistrationSerializer
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.filter(email=request.data['email'])
        user_data = AccountDetailsSerializer(user).data
        response.data.update(user_data)
        return response


# GET: Get all the users
class ShowAllUsers(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        users = User.objects.all().exclude(id=self.request.user.id)
        new_users = users
        for i in self.request.user.user_profile.follow.all():
            new_users = new_users.exclude(id=i.id)
        users_including_search = []
        # checks if the user is searching for something. if not, all the users will be shown
        if "search" in self.request.query_params.keys():
            search = self.request.query_params["search"]
            for user in users:
                if search in user.username or search in user.first_name or search in user.last_name:
                    if user != self.request.user:
                        users_including_search.append(user)
            return users_including_search
        return new_users


# GET: Get user profile (as well private information like email, etc.)
# POST: Update user profile
class UserProfileRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        user_id = self.kwargs.get("pk")
        user = User.objects.filter(id=user_id)
        return user

    def update(self, request, *args, **kwargs):
        user_id = self.kwargs.get("pk")
        if self.request.user.id == user_id:
            instance = self.get_object()
            instance.first_name = request.data.get('first_name', instance.first_name)
            instance.last_name = request.data.get('last_name', instance.last_name)
            instance.username = request.data.get('username', instance.username)
            instance.email = request.data.get('email', instance.email)
            instance.playlist_num = 0
            for playlist in self.request.user.users.all():
                instance.playlist_num += 1 
            instance.save()
            serializer = UserProfileSerializer(instance)
            return Response(serializer.data)
        return Response("It's not your account")


# GET: Get profile
# POST: Update profile
class ProfileRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def update(self, request, *args, **kwargs):
        user_id = self.kwargs.get("pk")
        if self.request.user.id == user_id:
            instance = self.get_object()
            instance.bio = request.data.get('bio', instance.bio)
            instance.profile_picture = request.data.get('profile_picture', instance.profile_picture)
            instance.header_picture = request.data.get('header_picture', instance.header_picture)
            instance.birth_date = request.data.get('birth_date', instance.birth_date)
            instance.profile_status = request.data.get('profile_status', instance.profile_status)
            instance.save()
            serializer = ProfileSerializer(instance)
            return Response(serializer.data)
        return Response("It's not your account")


# POST: follow a user
class Follow(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    lookup_url_kwarg = "user_id"

    def patch(self, request, *args, **kwargs):
        user_id = self.kwargs.get("user_id")
        to_user = User.objects.get(id=user_id)
        if to_user.user_profile.profile_status == 'private':
            if self.request.user.id != to_user.id:
                if self.request.user.user_profile not in to_user.follow_request.all():
                    to_user.follow_request.add(self.request.user.user_profile)
                    return Response(f"{self.request.user.username} sent a follow request to {to_user.username}")
                return Response(f"You had sent a follow request to {to_user.username}")
            return Response(f"You can't send a follow request to yourself, {self.request.user.username}")
        if self.request.user.user_profile in to_user.followed_by.all():
            return Response(f"You had followed {to_user.username}")
        to_user.follower_num += 1
        self.request.user.following_num += 1
        self.request.user.save()
        to_user.save()
        to_user.followed_by.add(self.request.user.user_profile)
        return Response(f"{self.request.user.username} follows {to_user.username}")


# POST: unfollow a user
class Unfollow(generics.DestroyAPIView):
    serializer_class = UserProfileSerializer
    lookup_url_kwarg = "user_id"

    def delete(self, request, *args, **kwargs):
        user_id = self.kwargs.get("user_id")
        to_delete = User.objects.get(id=user_id)
        if to_delete not in self.request.user.user_profile.follow.all():
            return Response(f"You didn't follow {to_delete.username}")
        to_delete.follower_num -= 1
        self.request.user.following_num -= 1
        self.request.user.save()
        to_delete.save()
        self.request.user.user_profile.follow.remove(to_delete)
        self.request.user.user_profile.follow_request.remove(to_delete)
        return Response("Unfollowed!")


class ListFollowers(generics.ListAPIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = "user_id"

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        to_user = User.objects.get(id=user_id)
        followers_profile = to_user.followed_by.all()
        if to_user.user_profile.profile_status == 'private':
            if self.request.user.user_profile in to_user.followed_by.all() or self.request.user.id == user_id:
                return [up.user_profile for up in followers_profile]
        else:
            return [up.user_profile for up in followers_profile]
            

# GET: List of all the people the user is following
class ListFollowing(generics.ListAPIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = "user_id"

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        to_user = User.objects.get(id=user_id)
        following_profiles = to_user.user_profile.follow.all()
        if to_user.user_profile.profile_status == "public":
            return following_profiles
        else:
            if self.request.user in to_user.followed_by.all() or self.request.user.id == user_id:
                return following_profiles                


class ListFollowRequest(generics.ListAPIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = "user_id"

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        follow_request_profile = self.request.user.follow_request.all()
        for i in self.request.user.followed_by.all():
            follow_request_profile = follow_request_profile.exclude(id=i.id)
        if self.request.user.id == user_id:
            return [up.user_profile for up in follow_request_profile]


class AcceptFollowRequest(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    lookup_url_kwarg = "user_id"

    def patch(self, request, *args, **kwargs):
        user_id = self.kwargs.get("user_id")
        to_user = User.objects.get(id=user_id)
        if to_user.user_profile in self.request.user.follow_request.all():
            if to_user.user_profile not in self.request.user.followed_by.all():
                to_user.following_num += 1
                self.request.user.follower_num += 1
                self.request.user.save()
                to_user.save()
                self.request.user.followed_by.add(to_user.user_profile)
                return Response("Accepted")
            return Response(f"You had accepted {to_user.username} follow request")
        return Response(f"{to_user.username} hasn't sent a follow request to you")
