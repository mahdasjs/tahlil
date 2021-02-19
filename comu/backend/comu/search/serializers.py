from rest_framework import serializers
from django.contrib.auth.models import User

class SearchSerializer(serializers.ModelSerializer):

    entry = serializers.CharField(max_length=100)
    filters = serializers.CharField(max_length=30)

    class Meta:
        model = User
        fields = ('entry', 'filters')

