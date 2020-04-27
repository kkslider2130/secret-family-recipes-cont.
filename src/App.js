import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css';
=======
import { Link, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
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

>>>>>>> aaf1ee7d95f5bab84d46052c9e2c06f513fde0a6


function App() {
  return (
<<<<<<< HEAD
    <Router>
    <div className="App">
     
    </div>
    </Router>
=======
    <div className="App">

      
        <NavBarContainer>
        
          <nav className="navigation">          
          <img src = {companylogo} className = "company-logo" alt="company-logo"/>          
              <Link to='/'>Sign Up</Link>
              <Link to='/Order' >Log in</Link>       
          </nav>
        
          </NavBarContainer>
        
      <Route exact path="/">
          <RegisterForm />
        </Route>    
        <Route path="/Order">
          <LoginForm />
        </Route>
      

      
    </div>
>>>>>>> aaf1ee7d95f5bab84d46052c9e2c06f513fde0a6
  );
}

export default App;
