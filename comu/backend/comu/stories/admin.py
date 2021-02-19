from django.contrib import admin
from .models import Story
from .models import Seen


admin.site.register(Story)
admin.site.register(Seen)
