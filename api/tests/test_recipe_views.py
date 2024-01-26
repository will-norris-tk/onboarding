from django.forms.models import model_to_dict
from django.test import TestCase
from parameterized import parameterized
from rest_framework.test import APIClient

from ..models import Recipe, Ingredient
from ..serializers import RecipeSerializer

# Create your tests here.
client = APIClient()


def dummy_payload():
    payload = {"name": "sausages", "description": "veggie stuff", "ingredients": [{"name": "vegetables"}]}
    return payload

def seed_db():
    recipe1 = Recipe.objects.create(name='Recipe 1', description='Description 1')
    Ingredient.objects.create(name='Ingredient 1', recipe=recipe1)
    recipe2 = Recipe.objects.create(name='Recipe 2', description='Description 2')
    Ingredient.objects.create(name='Ingredient 2', recipe=recipe2)
    return [recipe1, recipe2]


class TestRecipesApi(TestCase):

    RECIPES_URL = '/api/recipes/'

    def test_get_recipes_success(self):
        recipes = seed_db()
        response = client.get(self.RECIPES_URL)
        assert response.status_code == 200
        assert response.json() == [RecipeSerializer(recipe).data for recipe in recipes]
        assert len(response.data) == 2

    def test_get_recipes_when_db_empty_returns_empty_list(self):
        response = client.get(self.RECIPES_URL)
        assert response.status_code == 200
        assert response.data == []

    def test_get_recipes_with_name_filter_returns_filtered_data(self):
        recipes = seed_db()
        response = client.get(f'{self.RECIPES_URL}?name={recipes[0].name}')
        assert response.status_code == 200
        assert response.json() == [{'name': 'Recipe 1', 'description': 'Description 1', 'ingredients': [{'name': 'Ingredient 1'}], 'id': 1}]
        assert len(response.data) == 1

    def test_get_single_recipe_success(self):
        recipe = seed_db()[0]
        response = client.get(f'{self.RECIPES_URL}{recipe.id}/')
        assert response.status_code == 200
        assert response.json() == RecipeSerializer(recipe).data

    def test_get_single_recipe_fails_when_recipe_does_not_exist(self):
        response = client.get(f'{self.RECIPES_URL}1/')
        assert response.status_code == 404

    def test_create_recipe_success(self):
        payload = dummy_payload()
        response = client.post(self.RECIPES_URL, payload, format='json')
        assert response.status_code == 201
        assert response.json() == response.json() | payload
        assert 'id' in response.json()

    @parameterized.expand([('description',),('ingredients',),('name',)])
    def test_create_recipe_with_malformed_recipe_fails(self, field_name):
        payload = dummy_payload()
        payload.pop(field_name)
        response = client.post(self.RECIPES_URL, payload, format='json')
        assert response.status_code == 400
        assert response.json() == {field_name: ['This field is required.']}

    @parameterized.expand([('name',)])
    def test_create_recipe_with_malformed_ingredients_fails(self, field_name):
        payload = dummy_payload()
        payload['ingredients'][0].pop(field_name)
        response = client.post(self.RECIPES_URL, payload, format='json')
        assert response.status_code == 400
        assert response.json() == {'ingredients': [{field_name: ['This field is required.']}]}

    def test_create_recipe_with_empty_ingredients_fails(self):
        payload = dummy_payload()
        payload['ingredients'] = []
        response = client.post(self.RECIPES_URL, payload, format='json')
        assert response.status_code == 400
        assert response.json() == {'ingredients': {'non_field_errors': ['This list may not be empty.']}}

    def test_update_recipe_with_non_existent_recipe_returns_404(self):
        payload = dummy_payload()
        response = client.patch(f'{self.RECIPES_URL}1/', payload, format='json')
        assert response.status_code == 404
        assert response.json() == {'detail': 'Not found.'}

    def test_update_recipe_success(self):
        # arrange
        db_recipe = seed_db()[0]
        payload = dummy_payload()
        assert db_recipe.name != payload['name']
        assert db_recipe.description != payload['description']
        assert db_recipe.ingredients.first().name != payload['ingredients'][0]['name']

        # act
        response = client.patch(f'{self.RECIPES_URL}{db_recipe.id}/', payload, format='json')
        db_recipe.refresh_from_db()

        # assert
        assert response.status_code == 200
        assert db_recipe.name == payload['name']
        assert db_recipe.description == payload['description']
        assert db_recipe.ingredients.first().name == payload['ingredients'][0]['name']

    def test_update_recipe_with_empty_ingredients_fails(self):
        # arrange
        db_recipe = seed_db()[0]
        payload = dummy_payload()
        payload['ingredients'] = []

        # act
        response = client.patch(f'{self.RECIPES_URL}{db_recipe.id}/', payload, format='json')

        # assert
        assert response.status_code == 400
        assert response.json() == {'ingredients': {'non_field_errors': ['This list may not be empty.']}}

    def test_delete_recipe_with_non_existent_recipe_returns_404(self):
        response = client.delete(f'{self.RECIPES_URL}1/')
        assert response.status_code == 404
        assert response.json() == {'detail': 'Not found.'}

    def test_delete_recipe_success(self):
        db_recipe = seed_db()[0]
        response = client.delete(f'{self.RECIPES_URL}{db_recipe.id}/')
        assert response.status_code == 204
