import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';

const GetRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        axiosWithAuth()
        .get('/recipes')
        .then(res => {
            console.log(res)
            setRecipes(res.data.recipe);
        })
        .catch(err => console.log({err}))
    }, []);
 
const deleteRecipe = (e, recipe) => {
    e.preventDefault();
    axiosWithAuth()
 
    console.log(e)
    .delete(`/recipes/${recipe.id}`)
    .then(res => {
        setRecipes(res.data.recipe);
    })
    .catch(err => console.log('delete err', err))
};




return(
 <div>
     {recipes.map(recipe => (
         <div className='getRecipes' key={recipe.user_id}>
            <div className='recipeName'> {recipe.recipe_name}</div>
            <div className='recipeText'> Description:{recipe.description}</div>
            <div className='recipeText'> Prep Time:{recipe.prep_time}</div>
            <div className='recipeText'> Cook Time: {recipe.cook_time}</div>
            <div className='recipeText'> Serving Size: {recipe.serving_size}</div>
            
                {/* <div className='edit-button' onClick={editRecipe}>
                     Edit
                </div> */}

                <div className='delete-button' onClick={deleteRecipe}>
                    Delete
                </div>
        </div>
     ))}
     
      
 </div>
)
};

export default GetRecipes;