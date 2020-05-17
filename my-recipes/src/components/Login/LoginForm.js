import axiosWithAuth from "../../utils/axiosWithAuth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useHistory } from "react-router";
import * as yup from "yup";
import styled from "styled-components";
import companylogogreen from "../../company-logo-green.png";
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
    .reg-link {
      margin-top: 2rem;
      a {
        color: #3a7669;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
  .logo-div {
    display: flex;
    justify-content: center;
  }

  img {
    width: 70%;
    margin-bottom: 30px;
  }

  input {
    display: block;
    box-sizing: border-box;
    width: 90%;
    outline: none;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  input[type="password"] {
    background: #fff;
    border: 1px solid #dbdbdb;
    font-size: 1em;
    padding: 0.8em 0.5em;
    border-radius: 2px;
  }

  .btn {
    border-radius: 7px;
    font-size: 1rem;
    margin-top: 30px;
    padding: 0.8em 1.2em;
    background: #3a7669;
    color: white;
    cursor: pointer;
    :hover {
      background: #6dc0ae;
    }
  }

  p {
    color: red;
  }
`;

const formSchema = yup.object().shape({
  username: yup.string().required("*please enter username"),
  password: yup.string().required("*please enter password"),
});

export default function LoginForm(props) {
  const history = useHistory();
  const { addToast } = useToasts();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [post, setPost] = useState([]);
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setSubmitDisabled(!valid);
    });
  }, [formState]);
  useEffect(() => {
    if (props.toast === true) {
      addToast("Successfully Registered!", {
        appearance: "success",
        autoDismiss: true,
      });
      props.setToast(false);
    }
  }, [props.toast]);

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
    axiosWithAuth()
      .post("/auth/login", formState)
      .then((res) => {
        console.log("form res", res);
        console.log("res data token", res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", JSON.stringify(res.data.id));
        setPost([...post, res.data]);

        setFormState({
          username: "",
          password: "",
        });
        history.push("/home");
      })
      .catch((err) => {
        console.log(err.res);
        addToast("invalid login", {
          appearance: "error",
          autoDismiss: true,
        });
      });
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
        <h2>Welcome</h2>

        <input
          className="form__input"
          id="username"
          type="text"
          name="username"
          placeholder="username"
          value={formState.username}
          onChange={inputChange}
        />
        {errors.username.length > 0 ? (
          <p className="error">{errors.username}</p>
        ) : null}

        <input
          className="form__input"
          id="password"
          type="password"
          name="password"
          placeholder="password"
          value={formState.password}
          onChange={inputChange}
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}

        <button className="btn" disabled={submitDisabled} push="/recipes">
          Login
        </button>
        <div className="reg-link">
          Don't have an account? <Link to="register">Sign Up</Link>
        </div>
      </form>
    </MainContainer>
  );
}
