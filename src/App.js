import { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {

  const APP_ID = '23a26f23';
  const APP_KEY = 'e5fbe817dd408f74c4b703a28a2319af';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
    console.log(query)
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`);

    const data = await response.json();
    setRecipes(data.hits);
    console.log(data);
  };

  const updateValue = e => {
    setSearch(e.target.value);
  };

  const updateQuery = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  
  return (
    <div className='App'>
      <form className='search-form' onSubmit={updateQuery}>
        <input className='search-bar' type="text" value={search} onChange={updateValue} />
        <button className='search-button' type="submit">Search</button>
      </form>
      <div className='recipes'>
      {recipes.map(eachRecipe => (
        <Recipe key={eachRecipe.recipe.label} title={eachRecipe.recipe.label} ingredients={eachRecipe.recipe.ingredients} calories={Math.round(eachRecipe.recipe.calories)} image={eachRecipe.recipe.image} />))}
      </div>   
    </div>
    )
}

export default App;
