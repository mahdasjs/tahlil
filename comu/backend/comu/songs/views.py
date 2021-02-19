from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError
import copy
import soundcloud
import requests 
import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

from .models import Song
from playlists.models import Playlist
from .serializers import SongSerializer
from playlists.serializers import PlaylistSerializer
from accounts.models import User


class SoundcloudSongListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = SongSerializer

    def get_queryset(self):
        return Song.objects.filter(platform='Soundcloud')

    def create(self, request, *args, **kwargs):
        song = {
            "track_url": request.data['track_url'],
            "track_name": request.data['track_name'],
            "artist_name": request.data['artist_name'],
            "image": request.data['image'],
            "platform": 'Soundcloud',
        }
        song.update({'playlists':[int(request.data['playlists'])]})
        serializer = self.get_serializer(data=song)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class SoundcloudSongRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.track_name = request.data.get('track_name', instance.track_name)
        instance.image = request.data.get('image', instance.image)
        instance.artist_name = request.data.get('artist_name', instance.artist_name)
        instance.track_url = request.data.get('track_url', instance.track_url)
        instance.save()
        if request.data.get('playlists') is not None:
            playlists_data = request.data.get('playlists')
            instance.playlists.clear()
            playlist = Playlist.objects.get(id = playlists_data)
            instance.playlists.add(playlist)
        serializer = SongSerializer(instance)
        return Response(serializer.data)


class SpotifySongListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = SongSerializer

    def get_queryset(self):
        return Song.objects.filter(platform='Spotify')

    def create(self, request, *args, **kwargs):
        song = {
            "track_url": request.data['track_url'],
            "track_name": request.data['track_name'],
            "artist_name": request.data['artist_name'],
            "image": request.data['image'],
            "platform": 'Spotify',
        }
        song.update({'playlists':[int(request.data['playlists'])]})
        serializer = self.get_serializer(data=song)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class SpotifySongRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.track_name = request.data.get('track_name', instance.track_name)
        instance.image = request.data.get('image', instance.image)
        instance.artist_name = request.data.get('artist_name', instance.artist_name)
        instance.track_url = request.data.get('track_url', instance.track_url)
        instance.save()
        if request.data.get('playlists') is not None:
            playlists_data = request.data.get('playlists')
            instance.playlists.clear()
            playlist = Playlist.objects.get(id = playlists_data)
            instance.playlists.add(playlist)
        serializer = SongSerializer(instance)
        return Response(serializer.data)

class SoundcloudLinkSongCreateAPIView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = SongSerializer

    def create(self, request, *args, **kwargs):

        track_link = request.data['track_link']
        result = requests.get('https://api-v2.soundcloud.com/resolve?url='+track_link+'&client_id=AJqBAB1k7AZFSvc0eEeXAaiCwDCR9Eu8')
        result = result.json()
        song = {
            "track_url": result['uri'][27:],
            "track_name": result['title'],
            "image": result['artwork_url'],
            "platform": 'Soundcloud',
        }
        song.update({'playlists':[int(request.data['playlists'])]})
        serializer = self.get_serializer(data=song)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SpotifyLinkSongCreateAPIView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = SongSerializer

    def create(self, request, *args, **kwargs):

        track_link = request.data['track_link']
        credential = \
        SpotifyClientCredentials(client_id='c88d24e641f74146a81e79273bbc7b93',
                                 client_secret='51a049a7ac1f4480b156a81b94241661')
        spotify = spotipy.Spotify(client_credentials_manager=credential)
        track = spotify.track(track_link)
        song = {
            "track_url": track['external_urls']['spotify'][25:],
            "track_name": track['name'],
            "artist_name": track['album']['artists'][0]['name'],
            "image": track['album']['images'][0]['url'],
            "platform": 'Spotify',
        }
        song.update({'playlists':[int(request.data['playlists'])]})
        serializer = self.get_serializer(data=song)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)