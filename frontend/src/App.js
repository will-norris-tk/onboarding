import React, { useEffect, useState } from 'react';
import { NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import CreateRecipe from './components/CreateRecipe';
import { StyledRecipeFormContainer } from './components/StyledRecipeFormContainer';
import Recipe from './components/EditRecipe.js';
import RecipeClient from './utils/RecipeClient';
import StateChangeNotifier from './utils/StateChangeNotifier';
import { StyledNavBar } from './components/StyledNavBar.js';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const notifier = new StateChangeNotifier(shouldReload, setShouldReload);
  
  
  const recipeClient = new RecipeClient(notifier);
  useEffect(() => 
  {
      recipeClient.getRecipes(setRecipes)  
    // eslint-disable-next-line
    }, [shouldReload]);


  return (
    <div className='App'>
    <Router>
      <StyledNavBar>
          <NavLink exact to='/'>Recipe list</NavLink>
          <NavLink exact to='/create'>Add new recipe</NavLink>
      </StyledNavBar>
        <Switch>
          <Route exact path='/' >
            <StyledRecipeFormContainer>
                {recipes.map(
                  recipe => (
                      <Recipe key={recipe.id} recipe={recipe} recipeClient={recipeClient}/>
                  )
              )}
            </StyledRecipeFormContainer>
          </Route>
          <Route exact path='/create'>
            <StyledRecipeFormContainer>
              <CreateRecipe recipeClient={recipeClient} />
            </StyledRecipeFormContainer>
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
