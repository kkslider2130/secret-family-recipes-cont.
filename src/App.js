import React from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import RecipeForm from "./components/RecipeForm"
import styled from 'styled-components';
import companylogo from './company-logo.png';


const NavBarContainer = styled.div`
background-color: whitesmoke;
display: flex;
width: 100%;

.navigation{
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    background-color: #3a7669;
    align-items: center;
    
    
}

.navigation a{
  text-decoration: none;
  color: white;
  font-weight: bold;
  
}

img{
  width: 130px;
}

`



function App() {
  return (
    <div className="App">

      
        <NavBarContainer>
        
          <nav className="navigation">          
          <img src = {companylogo} className = "company-logo" alt="company-logo"/>          
              <Link to='/SignUp'>Sign Up</Link>
              <Link to='/Login' >Log in</Link>
              <Link to='/AddRecipe' >Add Recipe</Link>       
          </nav>
        
          </NavBarContainer>
        
      <Route exact path="/SignUp">
          <RegisterForm />
        </Route>    
        <Route path="/Login">
          <LoginForm />
        </Route>
        <Route path="/AddRecipe">
          <RecipeForm />
        </Route>
      

      
    </div>
  );
}

export default App;
