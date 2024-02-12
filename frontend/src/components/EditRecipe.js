import React from 'react';
import useInputState from '../hooks/useInputState';
import { StyledRecipeDiv } from './StyledRecipeDiv';
import { StyledForm } from './StyledForm';
import { ControlledRecipeFields } from './ControlledRecipeFields';
import { StyledFieldset } from './StyledFieldSet';

function Recipe(props) {
    const [recipeState, updateRecipe] = useInputState(props.recipe);
    const [isDisabled, setIsDisabled] = React.useState(true);

    function handleSubmit(event){
        event.preventDefault();
        props.recipeClient.updateRecipe(recipeState);
    }

    return (
        <StyledRecipeDiv>
            <StyledForm onSubmit={handleSubmit}>
                <StyledFieldset disabled={isDisabled}>
                    <ControlledRecipeFields recipeState={recipeState} updateRecipeState={updateRecipe}/>
                <button>Save</button>
                </StyledFieldset>
            </StyledForm>
            <button onClick={() => props.recipeClient.deleteRecipe(recipeState.id)}>Delete</button>
            <button onClick={() => setIsDisabled(!isDisabled)}>Enable/Disable Editing</button>
        </StyledRecipeDiv>
    )
}

export default Recipe;