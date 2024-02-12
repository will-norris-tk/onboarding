import React from 'react';
import useInputState from '../hooks/useInputState';
import { StyledForm } from './styles/StyledForm';
import { ControlledRecipeFields } from './ControlledRecipeFields';
import { StyledRecipeDiv } from './styles/StyledRecipeDiv';

function CreateRecipe(props) {
    const [recipe, updateRecipe, resetRecipe] = useInputState({
        name: '',
        description: '',
        ingredients: ''
    });

    function handleSubmit(evt) {
        evt.preventDefault();   
        props.recipeClient.createRecipe(recipe);
        resetRecipe();
    }

    return (
        <StyledRecipeDiv>
            <StyledForm onSubmit={handleSubmit}>
                <ControlledRecipeFields recipeState={recipe} updateRecipeState={updateRecipe}/>
                <button>Save</button>
            </StyledForm>
        </StyledRecipeDiv>
    )
}

export default CreateRecipe;