from django.db import models
from django.apps import apps

from accounts.models import User
from playlists.models import Playlist

platform = (
        ('Spotify', 'spotify'),
        ('Soundcloud', 'soundcloud'),
	)

class Song(models.Model):

    playlists = models.ManyToManyField(Playlist, related_name = 'songs', blank = True)
    track_url = models.CharField(max_length=500, blank=True)
    track_name = models.CharField(max_length=200, blank=True)
    artist_name = models.CharField(max_length=100, blank=True)
    image = models.CharField(max_length=500, blank=True)
    platform = models.CharField(max_length=10, choices=platform, default='spotify')

    def str(self):
        return self.track_name
