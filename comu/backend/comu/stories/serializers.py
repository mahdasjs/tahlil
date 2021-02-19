from rest_framework import serializers

from .models import Story
from .models import Seen
from songs.models import Song
from playlists.models import Playlist
from accounts.models import User
from songs.serializers import SongSerializer
from accounts.serializers import UserProfileSerializer
from accounts.serializers import ProfileSerializer
from accounts.serializers import UserSerializer
from playlists.serializers import PlaylistSerializer


class StorySerializer(serializers.ModelSerializer): 

    stories_user = serializers.RelatedField(read_only=True)
    stories_playlist = serializers.RelatedField(read_only=True)
    song = SongSerializer(many=True)

    class Meta: 
        model = Story 
        fields = '__all__'

    def create(self, validated_data):
        song_data = validated_data.pop('song')
        story = Story.objects.create(**validated_data)
        for song in song_data:
            song, created = Song.objects.get_or_create(track_name=song['track_name'], playlists = validated_data['playlist'].id)
            story.song.add(song)
        return story

class ListStorySerializer(serializers.ModelSerializer): 

    song = SongSerializer(many=True)
    user = UserSerializer(read_only=True)
    playlist = PlaylistSerializer(read_only=True)

    class Meta: 
        model = Story 
        fields = '__all__'

class SeenSerializer(serializers.ModelSerializer): 

    seen_user = serializers.RelatedField(read_only=True)
    seen_story = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Seen 
        fields = '__all__'


class ListSeenSerializer(serializers.ModelSerializer): 

    user = UserSerializer(read_only=True)
    seen_story = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Seen 
        fields = '__all__'