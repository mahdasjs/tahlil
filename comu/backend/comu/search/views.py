from django.shortcuts import render
from .serializers import SearchSerializer
from rest_framework.response import Response
from rest_framework import status, generics
from .searches import search_items
from .searches import autocomplete

class SearchAPIView(generics.ListAPIView):
    serializer_class = SearchSerializer
    
    def list(self, request, *args, **kwargs):
        entry = request.GET.get('entry')
        Filters = request.GET.get('filters')
        filters = Filters.split()
        results = search_items(entry, filters)
        return Response(results, status=status.HTTP_200_OK)

class AutoCompleteAPIView(generics.ListAPIView):
    
    def list(self, request, *args, **kwargs):
        entry = request.GET.get('entry')
        results = autocomplete(entry)
        return Response(results, status=status.HTTP_200_OK)
