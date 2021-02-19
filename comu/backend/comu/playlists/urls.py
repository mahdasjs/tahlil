from django.urls import path, re_path, include

from . import views


urlpatterns = [
    
    path('hashtags/', views.HashtagListCreateAPIView.as_view()),
    path('hashtags/<int:pk>', views.HashtagRetrieveUpdateDestroyAPIView.as_view()),
    path('', views.PlaylistCreateAPIView.as_view()),
    path('<int:user_id>', views.PlaylistListAPIView.as_view()), 
    path('<int:pk>/<int:user_id>', views.PlaylistRetrieveUpdateDestroyAPIView.as_view()), 
    path('clone/<int:pk>', views.PlaylistCloneAPIView.as_view()),
    path('featured/playlist/', views.FeaturedPlaylists.as_view()),
    path('top/tracks/', views.TopTracks.as_view()),
]