import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import CreateRecipe from "./CreateRecipe";

afterEach(cleanup);

const mockRecipeClient = {
    createRecipe: jest.fn()
};

const mockRecipe = {
    name: 'Test Recipe',
    description: 'Test Description',
    ingredients: 'list,of,ingredients'
};

const mockUpdateRecipeState = jest.fn();

it('renders', () => {
    const { getByLabelText, getByText } = render(<CreateRecipe recipeClient={mockRecipeClient} />);
    const nameInput = getByLabelText('Name:');
    const descriptionInput = getByLabelText('Description:');
    const ingredientsInput = getByLabelText('Ingredients:');
    const submitButton = getByText('Save');

    fireEvent.change(nameInput, { target: { value: mockRecipe.name } });
    fireEvent.change(descriptionInput, { target: { value: mockRecipe.description } });
    fireEvent.change(ingredientsInput, { target: { value: mockRecipe.ingredients } });

    // submit form
    fireEvent.click(submitButton);

    // input values reset on form submit
    expect(nameInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(ingredientsInput).toHaveValue("");

    // recipeClient.createRecipe called with correct arguments
    expect(mockRecipeClient.createRecipe).toHaveBeenCalledWith(mockRecipe);
});