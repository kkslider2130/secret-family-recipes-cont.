import React, { useEffect, useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

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
    <div>
      {recipes.map((recipe) => (
        <>
          <div className="getRecipes" key={recipe.user_id}>
            <div className="recipeName"> {recipe.recipe_name}</div>
            <div className="recipeText"> Description:{recipe.description}</div>
            <div className="recipeText"> Prep Time:{recipe.prep_time}</div>
            <div className="recipeText"> Cook Time: {recipe.cook_time}</div>
            <div className="recipeText">
              {" "}
              Serving Size: {recipe.serving_size}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default GetRecipes;
