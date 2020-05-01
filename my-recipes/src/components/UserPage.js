import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
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

const UserPage = () => {
  const { push } = useHistory();
  const [recipes, setRecipes] = useState([]);
  const currentUserId = parseInt(localStorage.getItem("user_id"));
  const initialRecipe = {
    user_id: currentUserId,
    recipe_name: "",
    prep_time: "",
    cook_time: "",
    serving_size: "",
    description: "",
  };
  const [updateRecipes, setUpdateRecipes] = useState(initialRecipe);
  const [modalIsOpen, setIsOpen] = useState({});
  let subtitle;

  useEffect(() => {
    axiosWithAuth()
      .get(`/recipes/${currentUserId}/user_recipes`)
      .then((res) => {
        console.log(res.data);
        setRecipes(res.data);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const openModal = (item) => {
    setIsOpen({ ...modalIsOpen, [item]: true });
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const afterOpenModal = () => {
    subtitle.style.color = "white";
  };

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
          .get(`/recipes/${currentUserId}/user_recipes`)
          .then((res) => {
            setRecipes(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log({ err }));
      })
      .catch((err) => console.log({ err }));
    setUpdateRecipes(initialRecipe);
  };

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

            <Link to={`/user_recipe/${recipe.id}`}>show recipe</Link>

            <div
              className="edit-button"
              onClick={(e) => {
                e.preventDefault();
                openModal(recipe.recipe_name);
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
          <Modal
            isOpen={modalIsOpen[recipe.recipe_name]}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
          >
            <div className="modal-header">
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                Edit recipe {recipe.id}
              </h2>
              <button onClick={closeModal}>
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div className="contact-inputs">
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
                    console.log(recipe);

                    closeModal();
                  }}
                >
                  Update Recipe
                </button>
              </form>
            </div>
          </Modal>
        </>
      ))}
    </div>
  );
};

export default UserPage;
