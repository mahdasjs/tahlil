from rest_framework import serializers

from .models import Playlist, Hashtag
from accounts.models import User
from songs.models import Song
from songs.serializers import SongSerializer


class HashtagSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = Hashtag 
        fields = ('name',)

   

class PlaylistSerializer(serializers.ModelSerializer):
    
    users = serializers.RelatedField(read_only=True)
    hashtags = HashtagSerializer(many=True)
    image = serializers.ImageField(max_length=None, allow_empty_file=True, use_url=True, required=False, allow_null=True)
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = '__all__'

    def create(self, validated_data):
        hashtags_data = validated_data.pop('hashtags')
        playlist = Playlist.objects.create(**validated_data)
        for hashtag in hashtags_data:
            hashtag, created = Hashtag.objects.get_or_create(name=hashtag['name'])
            playlist.hashtags.add(hashtag)
        return playlist

        




     
