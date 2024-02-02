from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Recipe
from .serializers import RecipeSerializer


class RecipeViewSet(viewsets.ModelViewSet):

    serializer_class = RecipeSerializer
    queryset =  Recipe.objects.prefetch_related('ingredients')

    def list(self, request):
        recipes_qs = Recipe.objects.prefetch_related('ingredients')
        if name_filter := request.query_params.get('name'):
            recipes_qs = recipes_qs.filter(name__icontains=name_filter)
        recipe_serializer = RecipeSerializer(recipes_qs, many=True)
        return Response(recipe_serializer.data)

    def update(self, request, pk=None, partial=True):
        recipe = get_object_or_404(Recipe, pk=pk)
        recipe_serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        if not recipe_serializer.is_valid():
            return Response(recipe_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        recipe_serializer.save()
        return Response(recipe_serializer.data)


class DocsViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({
            'List recipes': 'GET /recipes/',
            'Create recipe': 'POST /recipes/',
            'Delete recipe': 'DELETE /recipes/<pk>/',
            'Update recipe': 'PATCH /recipes/<pk>/',
            'Show detail of single recipe': 'GET /recipes/<pk>/',
        })
