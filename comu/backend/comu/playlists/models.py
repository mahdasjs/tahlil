from django.db import models
from django.apps import apps

from accounts.models import User

class Hashtag(models.Model):
	name = models.CharField(max_length = 100, blank=False) 
	
	def __str__(self):
		return self.name


class Playlist(models.Model):

	title = models.CharField(max_length = 100, blank=False) 
	date_created = models.DateTimeField(auto_now_add=True)
	image = models.ImageField(blank=True , upload_to='image/')
	hashtags = models.ManyToManyField(Hashtag, related_name = 'hashtags') 
	private = models.BooleanField(default=False)
	user = models.ForeignKey(User,related_name='users',on_delete=models.CASCADE)

	def str(self):
		return self.title
