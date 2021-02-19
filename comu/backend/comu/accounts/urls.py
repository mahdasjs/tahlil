from . import views
from django.conf.urls import include, url
from django.urls import path

urlpatterns = [
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    path('login/', views.Login.as_view(), name='login'),
    path('users/profile/<int:pk>', views.ProfileRetrieveUpdateDestroyAPIView.as_view()),
    path('users/userprofile/<int:pk>', views.UserProfileRetrieveUpdateDestroyAPIView.as_view()),
    path('users/', views.ShowAllUsers.as_view()),
    path('users/follow/<int:user_id>', views.Follow.as_view(), name='follow'),
    path('users/unfollow/<int:user_id>', views.Unfollow.as_view(), name='unfollow'),
    path('users/followers/<int:user_id>', views.ListFollowers.as_view(), name='followers'),
    path('users/following/<int:user_id>', views.ListFollowing.as_view(), name='following'),
    path('users/followrequest/<int:user_id>', views.ListFollowRequest.as_view(), name='follow request'),
    path('users/acceptfollowrequest/<int:user_id>', views.AcceptFollowRequest.as_view(), name='accept follow request')
]

