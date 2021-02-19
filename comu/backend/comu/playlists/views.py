from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError
import copy
from django.core.cache import cache

from .top10 import get_featured_playlists
from .models import Playlist
from .models import Hashtag
from .serializers import PlaylistSerializer
from .serializers import HashtagSerializer
from accounts.models import User

from playlists.top10 import get_top_tracks


class HashtagListCreateAPIView(generics.ListCreateAPIView):
    
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializer


class HashtagRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializer


class PlaylistCreateAPIView(generics.CreateAPIView):

    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def create(self, request, *args, **kwargs):
        serializer_data = request.data.copy()
        serializer_data.update({'user':request.user.id})
        serializer = self.get_serializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PlaylistListAPIView(generics.ListAPIView):
    
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def get_queryset(self):
        queryset = Playlist.objects.filter(user=self.kwargs['user_id']) 
        return queryset.order_by('-date_created')


class PlaylistRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.title = request.data.get('title', instance.title)
        instance.image = request.data.get('image', instance.image)
        instance.private = request.data.get('private', instance.private)
        instance.save()
        new_hashtags = []
        for i in range(20):
            if request.data.get('hashtags['+str(i)+']name') is not None:
                instance.hashtags.clear()
                hashtag, created = Hashtag.objects.get_or_create(name=request.data.get('hashtags['+str(i)+']name'))
                new_hashtags.append(hashtag)
        instance.hashtags.add(*new_hashtags)
        serializer = PlaylistSerializer(instance)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = Playlist.objects.filter(user=self.kwargs['user_id']) 
        return queryset


class PlaylistCloneAPIView(generics.CreateAPIView):
   
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    def create(self, request, *args, **kwargs):    
        playlist_id = kwargs.get('pk')
        oldPlaylist = Playlist.objects.get(id=playlist_id)
        newPlaylist = copy.deepcopy(oldPlaylist)
        newPlaylist.id=None
        newPlaylist.user=self.request.user
        newPlaylist.save()
        newPlaylist.hashtags.add(*oldPlaylist.hashtags.all())
        newPlaylist.songs.add(*oldPlaylist.songs.all())
        serializer = PlaylistSerializer(newPlaylist)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        
class FeaturedPlaylists(generics.ListAPIView):
    
    serializer_class = PlaylistSerializer

    def list(self, request, *args, **kwargs):
        if cache.get('featured_playlists') is not None:
           playlists = cache.get('featured_playlists')
        else:
            playlists = get_featured_playlists()
            cache.set('featured_playlists', playlists, 86400)
        return Response(playlists, status=status.HTTP_200_OK) 
        
class TopTracks(generics.ListAPIView):
    
    serializer_class = PlaylistSerializer
    
    def list(self, request, *args, **kwargs):
        if cache.get('top_tracks') is not None:
           tracks = cache.get('top_tracks')
        else:
            tracks = get_top_tracks()
            cache.set('top_tracks', tracks, 86400)
        return Response(tracks, status=status.HTTP_200_OK)
        



