import React from 'react';
import useInputState from '../hooks/useInputState';
import { StyledRecipeDiv } from './styles/StyledRecipeDiv';
import { StyledForm } from './styles/StyledForm';
import { ControlledRecipeFields } from './ControlledRecipeFields';
import { StyledFieldset } from './styles/StyledFieldSet';

function Recipe(props) {
    const [recipeState, updateRecipe] = useInputState(props.recipe);
    const [isDisabled, setIsDisabled] = React.useState(true);

    function handleSubmit(event){
        event.preventDefault();
        props.recipeClient.updateRecipe(recipeState);
    }

    function handleDelete(){
        if (window.confirm('Are you sure you wish to delete this item?')) {
            props.recipeClient.deleteRecipe(recipeState.id);
        }
    }

    return (
        <StyledRecipeDiv>
            <StyledForm onSubmit={handleSubmit}>
                <StyledFieldset disabled={isDisabled}>
                    <ControlledRecipeFields recipeState={recipeState} updateRecipeState={updateRecipe}/>
                <button>Save</button>
                </StyledFieldset>
            </StyledForm>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setIsDisabled(!isDisabled)}>Enable/Disable Editing</button>
        </StyledRecipeDiv>
    )
}

export default Recipe;