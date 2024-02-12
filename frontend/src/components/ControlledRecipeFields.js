import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export function ControlledRecipeFields({
  recipeState,
  updateRecipeState
}) {
  return (
    <>
      <label htmlFor='name'>Name:</label>
      <StyledInput type='text' id='name' name='name' value={recipeState.name} onChange={updateRecipeState}></StyledInput>
      <label htmlFor='description'>Description:</label>
      <StyledInput type='text' id='description' name='description' value={recipeState.description} onChange={updateRecipeState}></StyledInput>
      <label htmlFor='ingredients'>Ingredients:</label>
      <StyledInput type='text' id='ingredients' name='ingredients' value={recipeState.ingredients} onChange={updateRecipeState}></StyledInput>
    </>
  )
  }