import React, { useEffect, useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    backgroundColor: "rgb(58, 58, 58)",
    borderRadius: "8px",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.37)",
  },
};

const GetRecipes = () => {
  const { push } = useHistory();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/recipes")
      .then((res) => {
        setRecipes(res.data.recipe);
      })
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Latest Recipes</h1>
      {recipes.map((recipe) => (
        <>
          <div className="recipes-container">
            <div className="getRecipes" key={recipe.user_id}>
              <Link to={`/user_recipes/${recipe.id}`}>
                <img
                  className="recipe-img"
                  src={recipe.image_url}
                  alt="recipe-photo"
                />
              </Link>
              <h2 className="recipeName"> {recipe.recipe_name}</h2>
              <p className="recipeText"> Description: {recipe.description}</p>
              <p className="recipeText"> Prep Time: {recipe.prep_time}</p>
              <p className="recipeText"> Cook Time: {recipe.cook_time}</p>
              <p className="recipeText"> Serving Size: {recipe.serving_size}</p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default GetRecipes;
