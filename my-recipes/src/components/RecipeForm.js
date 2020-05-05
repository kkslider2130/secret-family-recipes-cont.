import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import styled from "styled-components";
import companylogogreen from "../../src/company-logo-green.png";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const MainContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 4em 4em 6em;
    max-width: 400px;
    margin: 10vh auto;
    box-shadow: 5px 8px 32px 10px rgba(150, 148, 150, 1);
    border-radius: 2px;
  }
  .logo-div {
    display: flex;
    justify-content: center;
  }
  img {
    width: 70%;
    margin-bottom: 30px;
  }
  h2 {
    margin: 0 0 50px 0;
    padding: 10px;
    text-align: center;
    font-size: 30px;
    color: darkgray;
  }

  h3 {
    margin-top: 0;
    color: rgb(94, 93, 93);
    font-size: 20px;
  }
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    margin: 0;
    margin-bottom: 0.5rem;
  }
  input[type="text"] {
    background: #fff;
    border: 1px solid #dbdbdb;
    font-size: 1em;
    padding: 0.8em 0.5em;
    border-radius: 2px;
  }
  textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    margin: 0;
  }
  textarea[type="text"] {
    background: #fff;
    border: 1px solid #dbdbdb;
    font-size: 1em;
    height: 15vh;
    padding: 0.8em 0.5em;
    border-radius: 2px;
  }
  .btn {
    width: 45%;
    border-radius: 7px;
    font-size: 1rem;
    margin-top: 30px;
    padding: 0.8em 0.5em;
    background: #3a7669;
    color: white;
    cursor: pointer;
    :hover {
      background: #6dc0ae;
    }
  }

  .upload-btn {
    padding: 0.5rem;
  }
  .back-btn {
    width: 45%;
    border-radius: 7px;
    font-size: 1rem;
    margin-top: 30px;
    padding: 0.8em 0.5em;
    background: #96184c;
    color: white;
    cursor: pointer;
    :hover {
      background: #db4b87;
    }
  }
  .ing-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      margin-bottom: 1rem;
      height: 4vh;
    }
    p {
      font-weight: bold;
      margin-left: 0.5rem;
      color: #96184c;
      cursor: pointer;
      :hover {
        color: #db4b87;
      }
    }
  }
  .ing-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 58%;
    background: rgb(221, 221, 221);
    padding: 0.5rem 2rem;
    input {
      width: 48%;
    }
  }

  .ing-name {
    color: black;
    font-weight: bold;
    font-size: 0.8rem;
  }
  .ing-quan {
    font-size: 0.8rem;
    color: black;
  }

  .ing-btn {
    background: #3a7669;
    color: white;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    margin-bottom: 1.2rem;
    :hover {
      background: #6dc0ae;
    }
  }
  p {
    color: red;
  }
`;

const formSchema = yup.object().shape({
  recipe_name: yup
    .string()
    .required()
    .min(2, "Recipe name should have at least 2 characters!"),
  description: yup
    .string()
    .required()
    .min(6, "Description must have at least 6 caharacters!"),
  prep_time: yup
    .string()
    .required()
    .min(2, "Prep Time must have at least 2 characters!"),
  cook_time: yup
    .string()
    .required()
    .min(2, "Cook Time must have at least 2 characters!"),
  serving_size: yup
    .string()
    .required()
    .min(2, "Serving Amount must have at least 2 characters!"),
});

//component start//

export default function AddRecipe(props) {
  const { push } = useHistory();
  const { addToast } = useToasts();

  const [formState, setFormState] = useState({
    user_id: parseInt(localStorage.getItem("user_id")),
    recipe_name: "",
    description: "",
    prep_time: "",
    cook_time: "",
    serving_size: "",
  });

  const [ingForm, setIngForm] = useState({
    recipe_id: 0,
    ingrediant_name: "",
    quantity: "",
  });
  const [stepForm, setStepForm] = useState({
    recipe_id: 0,
    instructions: "",
    step_number: 1,
  });

  const [errors, setErrors] = useState({
    recipe_name: "",
    description: "",
    prep_time: "",
    cook_time: "",
    serving_size: "",
  });
  let [formStep, setFormStep] = useState(1);
  const [recipeId, setRecipeId] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [file, setFile] = useState("");
  const [ingrediants, setIngrediants] = useState([]);
  const [recipeSteps, setRecipeSteps] = useState([]);

  const [fileName, setFileName] = useState("Choose File");

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setSubmitDisabled(!valid);
    });
  }, [formState]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors,
        });
      });
  };
  //axios post request
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    console.log("formState", formState);
    axiosWithAuth()
      .post("/recipes/add_recipe", formState)
      .then((res) => {
        console.log(res.data);

        setFormState({
          recipe_name: "",
          description: "",
          prep_time: "",
          cook_time: "",
          serving_size: "",
        });
        setIngForm({
          ...ingForm,
          recipe_id: res.data.id,
        });

        setStepForm({
          ...stepForm,
          recipe_id: res.data.id,
        });
        axiosWithAuth()
          .put(`/recipes/${res.data.id}/img-upload`, formData)
          .then((res) => {
            console.log("photo", res.data);
            /*             push("/user_recipes");
            props.setToast(true);
            
 */
          });
      })

      .catch((err) => {
        console.log(err.res);
        addToast("unexpected error, please try again", {
          appearance: "error",
          autoDismiss: true,
        });
      });
    setFormStep(formStep + 1);
  };

  const inputChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.name === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    validateChange(event);
    setFormState(newFormData);
  };

  const addIngrediant = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post("/recipes/add_ingrediant", ingForm)
      .then((res) => {
        axiosWithAuth()
          .get(`/recipes/${res.data.recipe_id}/ingrediants`)
          .then((res) => {
            console.log(res.data);
            setIngrediants(res.data);
          });
        setIngForm({
          ...ingForm,
          ingrediant_name: "",
          quantity: "",
        });
      })
      .catch((err) => {
        console.log(err);
        addToast("unexpected error, please try again", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const addStep = (event) => {
    event.preventDefault();

    axiosWithAuth()
      .post("/recipes/add_steps", stepForm)
      .then((res) => {
        axiosWithAuth()
          .get(`/recipes/${res.data.recipe_id}/steps`)
          .then((res) => {
            console.log(res.data);
            setRecipeSteps(res.data);
          });
        setStepForm({
          ...stepForm,
          instructions: "",
          step_number: stepForm.step_number + 1,
        });
      })
      .catch((err) => {
        console.log(err);
        addToast("unexpected error, please try again", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const ingChange = (event) => {
    event.persist();
    const newIngData = {
      ...ingForm,
      [event.target.name]:
        event.target.name === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    console.log(ingForm);
    setIngForm(newIngData);
  };

  const stepsChange = (event) => {
    event.persist();
    const newStep = {
      ...stepForm,
      [event.target.name]:
        event.target.name === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    console.log(stepForm);
    setStepForm(newStep);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setFormStep(formStep + 1);
  };

  /*  const handlePrevStep = (e) => {
    e.preventDefault();
    setFormStep(formStep - 1);
  };
 */
  const handleFinal = (e) => {
    e.preventDefault();
    setStepForm({
      ...stepForm,
      recipe_id: null,
      instructions: "",
      step_number: 1,
    });
    push("/user_recipes");
    props.setToast(true);
  };

  return (
    <MainContainer>
      <form className="form" onSubmit={formSubmit}>
        <div className="logo-div">
          <img
            src={companylogogreen}
            className="company-logo"
            alt="company-logo"
          />
        </div>
        {formStep === 1 && (
          <>
            <h3 className="form-title">Add a Recipe</h3>
            <input
              className="form__input"
              id="recipe_name"
              type="text"
              name="recipe_name"
              placeholder="recipe name"
              value={formState.recipe_name}
              onChange={inputChange}
            />
            {errors.recipe_name.length > 0 ? (
              <p className="error">{errors.recipe_name}</p>
            ) : null}

            <input
              className="form__input"
              id="prep_time"
              type="text"
              name="prep_time"
              placeholder="prep time"
              value={formState.prep_time}
              onChange={inputChange}
            />
            {errors.prep_time.length > 0 ? (
              <p className="error">{errors.prep_time}</p>
            ) : null}

            <input
              className="form__input"
              id="cook_time"
              type="text"
              name="cook_time"
              placeholder="cook time"
              value={formState.cook_time}
              onChange={inputChange}
            />
            {errors.cook_time.length > 0 ? (
              <p className="error">{errors.cook_time}</p>
            ) : null}

            <input
              className="form__input"
              id="serving_size"
              type="text"
              name="serving_size"
              placeholder="serving amount"
              value={formState.serving_size}
              onChange={inputChange}
            />
            {errors.serving_size.length > 0 ? (
              <p className="error">{errors.serving_size}</p>
            ) : null}

            <textarea
              className="form__input"
              id="description"
              type="text"
              name="description"
              placeholder="description"
              value={formState.description}
              onChange={inputChange}
            />
            {errors.description.length > 0 ? (
              <p className="error"> {errors.description}</p>
            ) : null}

            <input
              className="upload-btn"
              type="file"
              id="customfile"
              onChange={onFileChange}
            />
            <button className="btn" onClick={formSubmit}>
              Next
            </button>
          </>
        )}
        {formStep === 2 && (
          <>
            <h3 className="form-title">Add Ingrediants</h3>

            <div className="ing-input">
              <input
                placeholder="item"
                className="ing_name"
                type="text"
                name="ingrediant_name"
                value={ingForm.ingrediant_name}
                onChange={ingChange}
              />
              <input
                placeholder="amount"
                className="ing_quantity"
                type="text"
                name="quantity"
                value={ingForm.quantity}
                onChange={ingChange}
              />
            </div>

            <button className="ing-btn" onClick={addIngrediant}>
              Add
            </button>
            {ingrediants.map((i) => {
              return (
                <div className="ing-container">
                  <p className="ing-name">{i.ingrediant_name}</p>
                  <p className="ing-quan">{i.quantity}</p>
                </div>
              );
            })}
            <button className="btn" onClick={(e) => handleNextStep(e)}>
              Next
            </button>
          </>
        )}
        {formStep === 3 && (
          <>
            <h3 className="form-title">Add Steps</h3>

            <div className="step-input">
              <input
                placeholder="instruction"
                className="ing_name"
                type="text"
                name="instructions"
                value={stepForm.instructions}
                onChange={stepsChange}
              />
              <button className="ing-btn" onClick={addStep}>
                Add
              </button>
            </div>

            {recipeSteps.map((i) => {
              return (
                <div className="ing-container">
                  <p className="ing-name">{i.step_number}</p>
                  <p className="ing-quan">{i.instructions}</p>
                </div>
              );
            })}
            <button className="btn" onClick={(e) => handleFinal(e)}>
              Submit
            </button>
          </>
        )}
      </form>
    </MainContainer>
  );
}
