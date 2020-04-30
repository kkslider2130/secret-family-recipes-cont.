import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useParams, useHistory } from 'react-router-dom';



const UpdateRecipes = () => {

const { push } = useHistory();
const { id } = useParams();


const initialRecipe = {
    id: id,
    user_id: parseInt(localStorage.getItem('user_id')),
    recipe_name: '',
    prep_time: '',
    cook_time: '',
    serving_size: '',
    description: ''
}
 
const [updateRecipes, setUpdateRecipes] = useState(initialRecipe);

const handleChange = e => {
 setUpdateRecipes({
        ...updateRecipes, [e.target.name] : e.target.value
    })
};

const handleSubmit = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/recipes/${id}`, updateRecipes)
    .then(res => {
        console.log('put res', res)
     setUpdateRecipes()
     push('/home')
    })
    .catch(err => console.log({err}))
}



return(
    <div>
        <h2>Update Recipe</h2>
        <form onSubmit={handleSubmit}>
            <input  
                className='form__input'
                id='recipe_name'
                type='text'
                name='recipe_name'
                placeholder='Recipe Name'
                value={updateRecipes.recipe_name}
                onChange={handleChange}
                />
            <input
                className='form__input'
                id='prep_time'
                type='text'
                name='prep_time'
                placeholder='Prep Time'
                value={updateRecipes.prep_time}
                onChange={handleChange}
                />
            <input  
                className='form__input'
                id='cook_time'
                type='text'
                name='cook_time'
                placeholder='Cook Time'
                value={updateRecipes.cook_time}
                onChange={handleChange}
                />
            <input
                className='form__input'
                id='serving_size'
                type='text'
                name='serving_size'
                placeholder='Serving Size'
                value={updateRecipes.serving_size}
                onChange={handleChange}
                />
            <textarea
                className='form__input'
                id='description'
                type='text'
                name='description'
                placeholder='description'
                value={updateRecipes.description}
                onChange={handleChange}
                />
        <button className='btn' onClick={e => handleSubmit(e, id)}>Update Recipe</button>
        </form>
    </div>
)};

export default UpdateRecipes;