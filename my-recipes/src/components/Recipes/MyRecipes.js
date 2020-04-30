import React from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';

const UpdateRecipes = () => {
const [myRecipes, setMyRecipes] = useState([]);
    useEffect(() => {
        axiosWithAuth()
        .get('/recipes')
        .then(res => {
            console.log(res)
            setRecipes(res.data.recipe);
        })
        .catch(err => console.log({err}))
    }, []); 

const handleChange = e => {
    setMyRecipes({
        ...myRecipes, [e.target.name] : e.target.value
    })
};

const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`recipes/${id}`, myRecipes)
    .then(res => {
        setMyRecipes(res.data.recipe)
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
                value={myRecipe.recipe_name}
                onChange={handleChange}
                />
            <input
                className='form__input'
                id='prep_time'
                type='text'
                name='prep_time'
                placeholder='Prep Time'
                value={myRecipe.prep_time}
                onChange={handleChange}
                />
            <input  
                className='form__input'
                id='cook_time'
                type='text'
                name='cook_time'
                placeholder='Cook Time'
                value={myRecipe.cook_time}
                onChange={handleChange}
                />
            <input
                className='form__input'
                id='serving_size'
                type='text'
                name='serving_size'
                placeholder='Serving Size'
                value={myRecipe.serving_size}
                onChange={handleChange}
                />
            <textarea
                className='form__input'
                id='description'
                type='text'
                name='description'
                placeholder='description'
                value={myRecipe.description}
                onChange={handleChange}
                />
        <button className='btn' onClick={handleSubmit}>Update Recipe</button>
        </form>
    </div>
)};

export default UpdateRecipes;