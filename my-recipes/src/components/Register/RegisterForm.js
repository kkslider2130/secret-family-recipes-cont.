import axiosWithAuth from "../../utils/axiosWithAuth";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";

import * as yup from "yup";
import styled from "styled-components";
import companylogogreen from "../../../src/company-logo-green.png";
import { Link } from "react-router-dom";

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
    box-shadow: 0 0 1em #222;
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
    padding: 0.6em 1.1em;
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
  username: yup
    .string()
    .required()
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required()
    .min(3, "Password must have at least 3 characters"),
});

export default function RegisterUser(props) {
  const { addToast } = useToasts();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [post, setPost] = useState([]);
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setSubmitDisabled(!valid);
    });
  }, [formState]);

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
      .post("/auth/register", formState)
      .then((res) => {
        setPost([...post, res.data]);

        setFormState({
          username: "",
          password: "",
        });
        props.setToast(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.res);
        addToast("unexpected error, please try again", {
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
        <h2>Join</h2>

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

        <button className="btn" disabled={submitDisabled}>
          Sign Up
        </button>
        <div className="reg-link">
          Have have an account? <Link to="/">Sign In</Link>
        </div>
      </form>
    </MainContainer>
  );
}
