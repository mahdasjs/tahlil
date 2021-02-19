from django.urls import path, re_path, include

from . import views

urlpatterns = [
    
    path('profile/list/<int:user_id>', views.ProfileStoryListAPIView.as_view()),
    path('create/', views.StoryCreateAPIView.as_view()),
    path('profile/<int:pk>', views.ProfileStoryRetrieveDestroyAPIView.as_view()),
    path('homepage/list/', views.HomepageStoryListAPIView.as_view()),
    path('homepage/<int:pk>', views.HomepageStoryRetrieveDestroyAPIView.as_view()),
    path('seen/create/', views.SeenCreateAPIView.as_view()),
    path('seen/list/<int:pk>', views.SeenListAPIView.as_view()),
]