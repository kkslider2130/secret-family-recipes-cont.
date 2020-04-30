import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const GetRecipes = () => {
    const { push } = useHistory();
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        axiosWithAuth()
        .get('/recipes')
        .then(res => {
            setRecipes(res.data.recipe);
        })
        .catch(err => console.log({err}))
    }, []);
 
const deleteRecipe = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
    .delete(`/recipes/${id}`)
    .then(res => {
        console.log('delete res', res)
        setRecipes(recipes.filter(r => r.id !== id));
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
           
                <div className='edit-button' onClick={() => push(`/recipes/${recipe.id}`)}>
                     Edit
                </div>

                <div className='delete-button' onClick={e => deleteRecipe(e, recipe.id)
            }>
                    Delete
                </div>
        </div>
     ))}
     
      
 </div>
)
};

export default GetRecipes;