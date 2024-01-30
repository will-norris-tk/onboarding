from django.db import models

# Create your models here.
class Recipe(models.Model):

    def __str__(self):
        return self.name

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)


class Ingredient(models.Model):

    def __str__(self):
        return self.name

    recipe = models.ForeignKey(Recipe, related_name='ingredients', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
