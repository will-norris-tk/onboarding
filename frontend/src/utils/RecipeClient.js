import axios from 'axios';
import { config } from '../config';

class RecipeClient {

    baseUrl = config.backendUrl;

    constructor(notifier) {
        this.notifier = notifier;
    }

    _arrayOfObjectsToCommaSeparatedString(ingredients) {
        return ingredients.map(ingredient => ingredient.name).join(',');
    }
    
    _commaSeparatedStringToArrayOfObjects(ingredients) {
        return ingredients.split(',').map(ingredient => {
            return {name: ingredient};
        });
    }
    

    async getRecipes(setRecipes) {
        try {
            const res = await axios.get(this.baseUrl);
            res.data.map((recipe) => (recipe.ingredients = this._arrayOfObjectsToCommaSeparatedString(recipe.ingredients)) )
            setRecipes(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    async createRecipe(recipe) {
        try {
            await axios.post(this.baseUrl, {
                name: recipe.name,
                description: recipe.description,
                ingredients: this._commaSeparatedStringToArrayOfObjects(recipe.ingredients)
            });
            this.notifier.notifyStateChange();
        } catch (error) {
            console.error(error);
        }
    }
    
    async deleteRecipe(id) {
        try {
            await axios.delete(`${this.baseUrl}${id}/`);
            this.notifier.notifyStateChange();
        } catch (error) {
            console.error(error);
        }
    }
    
    async updateRecipe(recipe) {
        try { 
            await axios.patch(`${this.baseUrl}${recipe.id}/`, {
                name: recipe.name,
                description: recipe.description,
                ingredients: this._commaSeparatedStringToArrayOfObjects(recipe.ingredients)
            });
            this.notifier.notifyStateChange();
        } catch (error) {
            console.error(error);
        }
    }
}

export default RecipeClient;