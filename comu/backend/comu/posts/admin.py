from django.contrib import admin
from .models import Post
from .models import Comment
from .models import Like

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)