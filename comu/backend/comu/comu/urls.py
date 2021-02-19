from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/accounts/', include('accounts.urls')),
    path('api/v1/playlist/', include('playlists.urls')),
    path('api/v1/songs/', include('songs.urls')),
    path('api/v1/songs/', include('search.urls')),
    path('api/v1/posts/', include('posts.urls')),
    path('api/v1/stories/', include('stories.urls')),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

