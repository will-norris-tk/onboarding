from django.urls import path
from . import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'recipes', views.RecipeViewSet, basename='recipes')
router.register(r'docs', views.DocsViewSet, basename='docs')

urlpatterns = router.urls
