import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import CreateRecipe from './components/Recipes/CreateRecipe';
import './App.css';
import Nav from './components/Navigation/Nav';
import AddRecipe from './components/RecipeForm';
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Register/RegisterForm';

function App() {
  return (

   <Router>
    <div className="App">
    <Switch>
     <Nav />
      
     <Route exact path="/register"> 
          <RegisterForm />
     </Route>
      <Route exact path="/login"> 
          <LoginForm /> 
     </Route>
  
     
    
     <ProtectedRoute exact path='/recipes' component={CreateRecipe}
      />
     </Switch>
    </div>
    </Router>
     );
}


export default App;
