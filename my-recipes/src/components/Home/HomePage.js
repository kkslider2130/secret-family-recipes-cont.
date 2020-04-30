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
  const initialRecipe = {
    id: 0,
    user_id: parseInt(localStorage.getItem("user_id")),
    recipe_name: "",
    prep_time: "",
    cook_time: "",
    serving_size: "",
    description: "",
  };
  const [updateRecipes, setUpdateRecipes] = useState(initialRecipe);
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axiosWithAuth()
      .get("/recipes")
      .then((res) => {
        setRecipes(res.data.recipe);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const afterOpenModal = () => {};

  const deleteRecipe = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/recipes/${id}`)
      .then((res) => {
        console.log("delete res", res);
        setRecipes(recipes.filter((r) => r.id !== id));
      })
      .catch((err) => console.log("delete err", err));
  };

  const handleChange = (e) => {
    setUpdateRecipes({
      ...updateRecipes,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/recipes/${id}`, updateRecipes)
      .then((res) => {
        console.log("put res", res);
        axiosWithAuth()
          .get("/recipes")
          .then((res) => {
            setRecipes(res.data.recipe);
          })
          .catch((err) => console.log({ err }));
        push("/home");
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      {recipes.map((recipe) => (
        <>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
          >
            {" "}
            <form onSubmit={handleSubmit}>
              <input
                className="form__input"
                id="recipe_name"
                type="text"
                name="recipe_name"
                placeholder="Recipe Name"
                value={updateRecipes.recipe_name}
                onChange={handleChange}
              />
              <input
                className="form__input"
                id="prep_time"
                type="text"
                name="prep_time"
                placeholder="Prep Time"
                value={updateRecipes.prep_time}
                onChange={handleChange}
              />
              <input
                className="form__input"
                id="cook_time"
                type="text"
                name="cook_time"
                placeholder="Cook Time"
                value={updateRecipes.cook_time}
                onChange={handleChange}
              />
              <input
                className="form__input"
                id="serving_size"
                type="text"
                name="serving_size"
                placeholder="Serving Size"
                value={updateRecipes.serving_size}
                onChange={handleChange}
              />
              <textarea
                className="form__input"
                id="description"
                type="text"
                name="description"
                placeholder="description"
                value={updateRecipes.description}
                onChange={handleChange}
              />
              <button
                className="btn"
                onClick={(e) => {
                  handleSubmit(e, recipe.id);
                  closeModal();
                }}
              >
                Update Recipe
              </button>
            </form>
          </Modal>
          <div className="getRecipes" key={recipe.user_id}>
            <div className="recipeName"> {recipe.recipe_name}</div>
            <div className="recipeText"> Description:{recipe.description}</div>
            <div className="recipeText"> Prep Time:{recipe.prep_time}</div>
            <div className="recipeText"> Cook Time: {recipe.cook_time}</div>
            <div className="recipeText">
              {" "}
              Serving Size: {recipe.serving_size}
            </div>

            <div
              className="edit-button"
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              Edit
            </div>

            <div
              className="delete-button"
              onClick={(e) => deleteRecipe(e, recipe.id)}
            >
              Delete
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default GetRecipes;
