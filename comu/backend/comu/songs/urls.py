from django.urls import path, re_path, include

from . import views

urlpatterns = [
    
    path('soundcloud/', views.SoundcloudSongListCreateAPIView.as_view()),
    path('soundcloud/link/', views.SoundcloudLinkSongCreateAPIView.as_view()), 
    path('soundcloud/<int:pk>', views.SoundcloudSongRetrieveUpdateDestroyAPIView.as_view()),
    path('spotify/', views.SpotifySongListCreateAPIView.as_view()), 
    path('spotify/link/', views.SpotifyLinkSongCreateAPIView.as_view()),
    path('spotify/<int:pk>', views.SpotifySongRetrieveUpdateDestroyAPIView.as_view()), 
]