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
     <Nav />
     <Switch>
     <ProtectedRoute component={CreateRecipe} path='/recipe' />
     </Switch>
    </div>
    </Router>
     )
}


export default App;
