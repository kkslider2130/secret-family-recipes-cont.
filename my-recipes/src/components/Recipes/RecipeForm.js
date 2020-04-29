import axios from "axios";
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
    title: yup.string().required().min(2, "Recipe name should have at least 2 characters!"),
    description: yup.string().required().min(6, "Description must have at least 6 caharacters!"),
    prepTime: yup.string().required().min(2, "Prep Time must have at least 2 characters!"),    
    cookTime: yup.string().required().min(2, "Cook Time must have at least 2 characters!"),
    servingAmount: yup.string().required().min(2, "Serving Amount must have at least 2 characters!"),
  });




  export default function AddRecipe() {

    const [formState, setFormState] = useState({
      title: "",
      description: "",
      prepTime: "",
      cookTime: "",
      servingAmount: "",
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        prepTime: "",
        cookTime: "",
        servingAmount: "",
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
        axios
          .post("https://reqres.in/api/users", formState) 
          .then(res => {
            setPost([...post, res.data]);

            setFormState({
              title: "",
              description: "",
              prepTime: "",
              cookTime: "",
              servingAmount: "",
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
                    id="title"
                    type="text"
                    name="title"
                    placeholder="recipe name" 
                    value={formState.title}
                    onChange={inputChange}
                    />
                    {errors.title.length > 0 ? (<p className="error">{errors.title}</p> ): null}
                
                
                    <input
                    className="form__input"
                    id="prepTime"
                    type="text"
                    name="prepTime"
                    placeholder="prep time" 
                    value={formState.prepTime}
                    onChange={inputChange}
                    />
                    {errors.prepTime.length > 0 ? (<p className="error">{errors.prepTime}</p> ): null}

                    <input
                    className="form__input"
                    id="cookTime"
                    type="text"
                    name="cookTime"
                    placeholder="cook time" 
                    value={formState.cookTime}
                    onChange={inputChange}
                    />
                    {errors.cookTime.length > 0 ? (<p className="error">{errors.cookTime}</p> ): null}

                    <input
                    className="form__input"
                    id="servingAmount"
                    type="text"
                    name="servingAmount"
                    placeholder="serving amount" 
                    value={formState.servingAmount}
                    onChange={inputChange}
                    />
                    {errors.servingAmount.length > 0 ? (<p className="error">{errors.servingAmount}</p> ): null}

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
                    
                
                <pre>{JSON.stringify(post, null, 2)}</pre>
                <button className="btn" disabled={submitDisabled}>Add Recipe</button>
            </form>
        </MainContainer>
      )
  };
