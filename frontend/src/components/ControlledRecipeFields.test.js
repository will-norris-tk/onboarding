import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ControlledRecipeFields } from "./ControlledRecipeFields";

afterEach(cleanup);

const mockRecipeState = {
  name: "Test Recipe",
  description: "Test Description",
  ingredients: "Testing,this,recipe",
};

const mockUpdateRecipeState = jest.fn();

it('renders', () => {
  const { getByLabelText } = render(<ControlledRecipeFields recipeState={mockRecipeState} updateRecipeState={mockUpdateRecipeState}/>);
  const nameInput = getByLabelText('Name:');
  const descriptionInput = getByLabelText('Description:');
  const ingredientsInput = getByLabelText('Ingredients:');
  expect(nameInput).toHaveValue(mockRecipeState.name);
  expect(descriptionInput).toHaveValue(mockRecipeState.description);
  expect(ingredientsInput).toHaveValue(mockRecipeState.ingredients);
});