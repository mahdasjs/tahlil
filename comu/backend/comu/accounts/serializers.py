from django.conf import settings
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer, SocialLoginSerializer
from accounts.models import Profile, User
from playlists.serializers import PlaylistSerializer

class ProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(
        max_length=None, allow_empty_file=True, use_url=True, required=False, allow_null=True)
    header_picture = serializers.ImageField(
        max_length=None, allow_empty_file=True, use_url=True, required=False, allow_null=True)
    following_num = serializers.IntegerField(source='user_profile.following_num')
    follower_num = serializers.IntegerField(source='user_profile.follower_num')

    class Meta:
        model = Profile
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    user_profile = ProfileSerializer()
    users = PlaylistSerializer(many=True)

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "user_profile", "last_login", "users", "playlist_num"]


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(source='user_profile.profile_picture')
    header_picture = serializers.ImageField(source='user_profile.header_picture')
    profile_status = serializers.CharField(source='user_profile.profile_status')
    class Meta:
        model = User
        fields = '__all__'


class AccountRegistrationSerializer(RegisterSerializer):
    """
    Account registration serializer.
    """
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def get_cleaned_data(self):
        super(AccountRegistrationSerializer, self).get_cleaned_data()

        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
        }


class AccountLoginSerializer(serializers.ModelSerializer):
    
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('email', 'password')
    

class AccountDetailsSerializer(serializers.ModelSerializer):
    """
    Custom account detail serializer.
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name',)
        read_only_fields = ('id',)


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'pk', 'email', 'password', 'first_name', 'last_name',)
        read_only_fields = ('email',)
