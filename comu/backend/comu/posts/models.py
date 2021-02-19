from django.db import models
from django.apps import apps

from accounts.models import User
from accounts.models import Profile
from playlists.models import Playlist
from songs.models import Song


class Post(models.Model):
    
    user = models.ForeignKey(User,related_name='posts_user',on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist,related_name='posts_playlist',on_delete=models.CASCADE)
    song = models.ManyToManyField(Song, related_name = 'posts_song')
    date = models.DateTimeField(auto_now_add=True)
    caption = models.TextField(blank=True,null=True)

    @property
    def comment_count(self):
        return Comment.objects.filter(post_id=self.id).count()


    @property
    def like_count(self):
        return Like.objects.filter(post_id=self.id).count()

    def str(self):
        return self.caption

class Comment(models.Model):

    user = models.ForeignKey(User,related_name='comments_user',on_delete=models.CASCADE,blank=True)
    text = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True,blank=True)
    post = models.ForeignKey(Post,related_name='comments_post',on_delete=models.CASCADE,blank=True)

    def str(self):
        return self.text

class Like(models.Model):
    user = models.ForeignKey(User,related_name='likes_user',on_delete=models.CASCADE,blank=True)
    post = models.ForeignKey(Post,related_name='likes_post',on_delete=models.CASCADE,blank=True)

    def str(self):
        return self.post