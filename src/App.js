import React, {useEffect, useState} from 'react';
import Recipe from './Recipe'
import './App.css'

function App() {
  //Autentification keys and id
  const APP_ID = '20dcfc6b';
  const APP_KEY = '00d814946ee932bed9fd267a8c31a32e';
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')
  useEffect(() => {
    getRecipes();
  }, [query]);//this runs anytime query changes 

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };  

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }
  
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type='text' className="search-bar" value={search} onChange={updateSearch}></input>
        <button type='submit' className="search-button">Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
        <Recipe key={Math.random() *100} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
        ))}
      </div>
    </div>
  );
}

export default App;
