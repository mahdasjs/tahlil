from rest_framework import serializers

from .models import Post
from .models import Comment
from .models import Like
from songs.models import Song
from playlists.models import Playlist
from accounts.models import User
from songs.serializers import SongSerializer
from accounts.serializers import UserProfileSerializer
from accounts.serializers import ProfileSerializer
from accounts.serializers import UserSerializer
from playlists.serializers import PlaylistSerializer


class PostSerializer(serializers.ModelSerializer): 

    comment_count = serializers.ReadOnlyField()
    like_count = serializers.ReadOnlyField()
    posts_user = serializers.RelatedField(read_only=True)
    posts_playlist = serializers.RelatedField(read_only=True)
    song = SongSerializer(many=True)

    class Meta: 
        model = Post 
        fields = '__all__'

    def create(self, validated_data):
        song_data = validated_data.pop('song')
        post = Post.objects.create(**validated_data)
        for song in song_data:
            song, created = Song.objects.get_or_create(track_name=song['track_name'], playlists = validated_data['playlist'].id)
            post.song.add(song)
        return post

class ListPostSerializer(serializers.ModelSerializer): 

    comment_count = serializers.ReadOnlyField()
    like_count = serializers.ReadOnlyField()
    song = SongSerializer(many=True)
    user = UserSerializer(read_only=True)
    playlist = PlaylistSerializer(read_only=True)

    class Meta: 
        model = Post 
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer): 

    comments_user = serializers.RelatedField(read_only=True)
    comments_post = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Comment 
        fields = '__all__'

class ListCommentSerializer(serializers.ModelSerializer): 

    user = UserSerializer(read_only=True)
    comments_post = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Comment 
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer): 

    likes_user = serializers.RelatedField(read_only=True)
    likes_post = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Like 
        fields = '__all__'


class ListLikeSerializer(serializers.ModelSerializer): 

    user = UserSerializer(read_only=True)
    likes_post = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Like 
        fields = '__all__'


