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
    color: lightgray;
    
}

input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    margin:0;
  }

input[type="text"],
input[type="password"]
{

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
    username: yup.string().required('*please enter username'),
    password: yup.string().required('*please enter password'),    
  });




  export default function LoginForm() {

    const [formState, setFormState] = useState({
      username: "",
      password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
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
              username: "",
              password: "",
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
                    id="username"
                    type="text"
                    name="username"
                    placeholder="username" 
                    value={formState.username}
                    onChange={inputChange}
                    />
                    {errors.username.length > 0 ? (<p className="error">{errors.username}</p> ): null}                    
                
                    <input
                    className="form__input"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password" 
                    value={formState.password}
                    onChange={inputChange}
                    />
                    {errors.password.length > 0 ? (<p className="error">{errors.password}</p> ): null}
                 
                    
                
                <pre>{JSON.stringify(post, null, 2)}</pre>
                <button className="btn" disabled={submitDisabled}>Login</button>
            </form>
        </MainContainer>
      )
  };
