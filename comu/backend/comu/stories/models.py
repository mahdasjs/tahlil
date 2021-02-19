from django.db import models
from django.apps import apps

from accounts.models import User
from accounts.models import Profile
from playlists.models import Playlist
from songs.models import Song


class Story(models.Model):
    
    user = models.ForeignKey(User,related_name='stories_user',on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist,related_name='stories_playlist',on_delete=models.CASCADE)
    song = models.ManyToManyField(Song, related_name = 'stories_song')
    date = models.DateTimeField(auto_now_add=True)
    text = models.TextField(blank=True,null=True)


    def str(self):
        return self.text

class Seen(models.Model):
    user = models.ForeignKey(User,related_name='seen_user',on_delete=models.CASCADE,blank=True)
    story = models.ForeignKey(Story,related_name='seen_story',on_delete=models.CASCADE,blank=True)

    def str(self):
        return self.story