import axiosWithAuth from '../utils/axiosWithAuth';
import React, {useState, useEffect} from "react";
import * as yup from "yup";
import styled from 'styled-components';
import companylogogreen from '../../src/company-logo-green.png';

const MainContainer = styled.div`
width: 80%;
margin: 0 auto;
.form {
  background: #fff;
  padding: 4em 4em 6em;
  max-width: 400px;
  margin: 130px auto 0;  
  box-shadow: 0 0 1em #222;
  border-radius: 2px;
  
}
img{
  width: 80%;
  margin-bottom: 30px;
}
h2{
    margin:0 0 50px 0;
    padding:10px;
    text-align:center;
    font-size:30px;
    color: darkgray;
    
}
input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    margin:0;
  }
input[type="text"] {
    background: #fff;
    border: 1px solid #dbdbdb;
    font-size: 1.6em;
    padding: .8em .5em;
    border-radius: 2px;
  }
textarea{
    display: block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    margin:0;
}
textarea[type="text"] {
background: #fff;
border: 1px solid #dbdbdb;
font-size: 1.6em;
padding: .8em .5em;
border-radius: 2px;
}
.btn{
    width: 100%;    
    font-size: 20px;
    font-size: 1.6em;
    margin-top: 30px;
    padding: .8em .5em;    
    border: 2px solid #3a7669;
        
}
p{
    color:red;
}
  
`



const formSchema = yup.object().shape({
    recipe_name: yup.string().required().min(2, "Recipe name should have at least 2 characters!"),
    description: yup.string().required().min(6, "Description must have at least 6 caharacters!"),
    prep_time: yup.string().required().min(2, "Prep Time must have at least 2 characters!"),    
    cook_time: yup.string().required().min(2, "Cook Time must have at least 2 characters!"),
    serving_size: yup.string().required().min(2, "Serving Amount must have at least 2 characters!"),
  });




  export default function AddRecipe() {

    const test = {
      "recipe_name": "Kale Chips", 
      "description":"aw kaaale no", 
      "prep_time": "10 minutes", 
      "cook_time": "40 minutes",
      "serving_size": "serves 2",
      "image_url": "https://images-gmi-pmc.edge-generalmills.com/1e7f0070-f782-42f0-a6e6-f6da2eb218c6.jpg"
      
      }
    


    const [formState, setFormState] = useState({
      user_id: parseInt(localStorage.getItem('user_id')),
      recipe_name: "",
      description: "",
      prep_time: "",
      cook_time: "",
      serving_size: "",
    });

    const [errors, setErrors] = useState({
        recipe_name: "",
        description: "",
        prep_time: "",
        cook_time: "",
        serving_size: "",
    })

    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [post, setPost] = useState([]);
    useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setSubmitDisabled(!valid);
        });
     }, [formState]);


    const validateChange = e => {
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.errors
            });
          });
      };
      //axios post request
      const formSubmit = e => {
        e.preventDefault();
        console.log('formState', formState)
        axiosWithAuth()
          .post("/recipes/add_recipe", formState) 
          .then(res => {
            console.log(res)
            setPost([...post, res.data]);


            setFormState({
              recipe_name: "",
              description: "",
              prep_time: "",
              cook_time: "",
              serving_size: "",
            });
          })
          .catch(err => {
            console.log(err.res);
          });
      };

      const inputChange = (event) => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
              event.target.name === "checkbox" ? event.target.checked : event.target.value
          };
            validateChange(event);
            setFormState(newFormData);
    }

    return(
        <MainContainer>

            <form className="form" onSubmit={formSubmit}>
            <img src = {companylogogreen} className = "company-logo" alt="company-logo"/>

                    <input
                    className="form__input"
                    id="recipe_name"
                    type="text"
                    name="recipe_name"
                    placeholder="recipe name" 
                    value={formState.recipe_name}
                    onChange={inputChange}
                    />
                    {errors.recipe_name.length > 0 ? (<p className="error">{errors.recipe_name}</p> ): null}


                    <input
                    className="form__input"
                    id="prep_time"
                    type="text"
                    name="prep_time"
                    placeholder="prep time" 
                    value={formState.prep_time}
                    onChange={inputChange}
                    />
                    {errors.prep_time.length > 0 ? (<p className="error">{errors.prep_time}</p> ): null}

                    <input
                    className="form__input"
                    id="cook_time"
                    type="text"
                    name="cook_time"
                    placeholder="cook time" 
                    value={formState.cook_time}
                    onChange={inputChange}
                    />
                    {errors.cook_time.length > 0 ? (<p className="error">{errors.cook_time}</p> ): null}

                    <input
                    className="form__input"
                    id="serving_size"
                    type="text"
                    name="serving_size"
                    placeholder="serving amount" 
                    value={formState.serving_size}
                    onChange={inputChange}
                    />
                    {errors.serving_size.length > 0 ? (<p className="error">{errors.serving_size}</p> ): null}

                    <textarea
                    className="form__input"
                    id="description"
                    type="text"
                    name="description"
                    placeholder="description" 
                    value={formState.description}
                    onChange={inputChange}
                    />
                    {errors.description.length > 0 ? (<p className="error"> {errors.description}</p>) : null}


                {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
                <button className="btn" >Add Recipe</button>
            </form>
        </MainContainer>
      )
  };