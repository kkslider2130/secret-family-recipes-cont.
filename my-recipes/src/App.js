import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import CreateRecipe from './components/Recipes/CreateRecipe';
import './App.css';
import Nav from './components/Navigation/Nav';

function App() {
  return (

   <Router>
    <div className="App">
    <Switch>
     <Nav />
    
     <ProtectedRoute exact path='/recipes' component={CreateRecipe}  />
     </Switch>
    </div>
    </Router>
     );
}


export default App;
