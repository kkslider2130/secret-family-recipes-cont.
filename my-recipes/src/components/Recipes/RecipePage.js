import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { useParams } from "react-router-dom";

export default function RecipePage() {
  const initialRecipe = {
    id: 0,
    user_id: 0,
    recipe_name: "",
    description: "",
    prep_time: "",
    cook_time: "20",
    serving_size: "",
    image_url: "",
  };
  const [recipe, setRecipe] = useState(initialRecipe);
  const [ingrediants, setIngrediants] = useState([]);
  const [steps, setSteps] = useState([]);
  const postId = useParams().id;
  console.log(postId);

  useEffect(() => {
    axiosWithAuth()
      .get(`/recipes/${postId}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .then(
        axiosWithAuth()
          .get(`/recipes/${postId}/ingrediants`)
          .then((res) => {
            console.log(res.data);
            setIngrediants(res.data);
          })
          .then(
            axiosWithAuth()
              .get(`/recipes/${postId}/steps`)
              .then((res) => {
                console.log(res.data);

                setSteps(res.data);
              })
          )
      )
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <div className="recipe-page">
      <div className="recipe-card">
        <h1>{recipe.recipe_name}</h1>
        <img src={recipe.image_url} alt="recipe-photo" />
        <h3>{recipe.description}</h3>
        <p>{recipe.prep_time}</p>
        <p>{recipe.cook_time}</p>
        <p>{recipe.serving_size}</p>
      </div>
      <div className="ingrediant-card">
        <h3>Ingrediants</h3>
        {ingrediants.map((i) => {
          return (
            <div className="ing-container">
              <p className="ing-name">{i.ingrediant_name}</p>
              <p className="ing-quan">{i.quantity}</p>
            </div>
          );
        })}
      </div>
      <div className="steps-card">
        <h3>Directions</h3>
        {steps.map((i) => {
          return (
            <div className="steps-container">
              <p className="step-name">{i.instructions}</p>
              <p className="step-num">{i.step_number}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
