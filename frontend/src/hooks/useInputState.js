import { useState } from 'react';

const useInputState = (initialVal) => {
    const [recipe, setRecipe] = useState(initialVal);
    const handleChange = e => {
        const { name, value } = e.target;
        setRecipe(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const reset = () => {
        setRecipe({'name': '', 'description': '', 'ingredients': ''});
    }
    return [recipe, handleChange, reset];
}

export default useInputState;