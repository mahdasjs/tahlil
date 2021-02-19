from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('search/', views.SearchAPIView.as_view()),
    path('autocomplete/', views.AutoCompleteAPIView.as_view())
]
