from rest_framework import serializers

from .models import Song
from accounts.models import User
from playlists.models import Playlist

class SongSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = Song 
        fields = '__all__'

    def create(self, validated_data):
        playlists_data = validated_data.pop('playlists')
        song = Song.objects.create(**validated_data)
        song.playlists.set(playlists_data)
        return song
