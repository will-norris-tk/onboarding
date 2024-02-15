from rest_framework import serializers
from .models import Recipe, Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name',)


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=False, allow_empty=False)
    class Meta:
        model = Recipe
        fields = ('name', 'description', 'ingredients', 'id')

    def _create_ingredients(self, ingredients, recipe):
        for ingredient in ingredients:
            Ingredient.objects.create(recipe=recipe, **ingredient)

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        self._create_ingredients(ingredients_data, recipe)
        return recipe

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        instance.ingredients.all().delete()
        self._create_ingredients(ingredients_data, instance)
        return instance
