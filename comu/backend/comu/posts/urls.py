from django.urls import path, re_path, include

from . import views

urlpatterns = [
    
    path('comment/create/', views.CommentCreateAPIView.as_view()),
    path('comment/list/<int:pk>', views.CommentListAPIView.as_view()),
    path('comment/<int:pk>', views.CommentRetrieveUpdateDestroyAPIView.as_view()),
    path('homepage/', views.HomePagePostListAPIView.as_view()), 
    path('homepage/<int:pk>', views.HomePagePostRetrieveAPIView.as_view()), 
    path('profile/list/<int:user_id>', views.ProfilePostListAPIView.as_view()),
    path('profile/create/', views.ProfilePostCreateAPIView.as_view()),
    path('profile/<int:pk>', views.ProfilePostRetrieveDestroyAPIView.as_view()),
    path('like/create/', views.LikeCreateAPIView.as_view()),
    path('like/list/<int:pk>', views.LikeListAPIView.as_view()),
    path('like/<int:pk>', views.LikeRetrieveDestroyAPIView.as_view()), 
]