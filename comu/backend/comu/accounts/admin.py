from django.contrib import admin
from .models import User, Profile
from rest_framework.authtoken.models import Token

admin.site.register(User)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    filter_horizontal = ['follow']

