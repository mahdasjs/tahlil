from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError
from django.core.exceptions import ValidationError
import copy

from .models import Story
from .models import Seen
from playlists.models import Playlist
from songs.models import Song
from .serializers import StorySerializer
from .serializers import ListStorySerializer
from .serializers import ListSeenSerializer
from .serializers import SeenSerializer
from playlists.serializers import PlaylistSerializer
from songs.serializers import SongSerializer
from accounts.models import User

class SeenCreateAPIView(generics.CreateAPIView):
    serializer_class = SeenSerializer

    def get_queryset(self):
        queryset = Seen.objects.filter(story=self.kwargs['pk'])
        return queryset

    def create(self, request, *args, **kwargs):
        serializer_data = request.data.copy()
        serializer_data.update({'user':request.user.id})
        serializer = self.get_serializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SeenListAPIView(generics.ListAPIView):
    serializer_class = ListSeenSerializer

    def get_queryset(self):
        queryset = Seen.objects.filter(story=self.kwargs['pk'])
        return queryset

class StoryCreateAPIView(generics.CreateAPIView):
    serializer_class = StorySerializer

    def create(self, request, *args, **kwargs):
        serializer_data = request.data.copy()
        serializer_data.update({'user':request.user.id})
        serializer = self.get_serializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProfileStoryListAPIView(generics.ListAPIView):
    serializer_class = ListStorySerializer

    def get_queryset(self):
        queryset = Story.objects.filter(user=self.kwargs['user_id'])
        return queryset.order_by('-date')

class ProfileStoryRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = ListStorySerializer
    queryset = Story.objects.all()
    
class HomepageStoryListAPIView(generics.ListAPIView):
    serializer_class = ListStorySerializer

    def get_queryset(self):
        queryset = []
        for user in self.request.user.user_profile.follow.all():
            queryset.extend(list(Story.objects.filter(user=user)))
        queryset.sort(key=lambda r: r.date, reverse=True)
        return queryset

class HomepageStoryRetrieveDestroyAPIView(generics.RetrieveAPIView):
    serializer_class = ListStorySerializer
    queryset = Story.objects.all()
