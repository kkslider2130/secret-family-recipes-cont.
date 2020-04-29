import React, { useEffect } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';

const getRecipes = () => {
    const [recipeList, setRecipeList] = useState([]);
    useEffect(() => {
        axiosWithAuth()
        .get('/recipes')
        .then(res => {
            console.log(res)
            setRecipeList(res.data);
        })
        .catch(err => console.log({err}))
    }, [])

return(
 <div>
     
 </div>
)
}