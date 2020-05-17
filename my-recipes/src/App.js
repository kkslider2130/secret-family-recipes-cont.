import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import "./App.scss";
import Nav from "./components/Navigation/Nav";
import AddRecipe from "./components/RecipeForm";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import Home from "./components/Home/HomePage";
import HomeNav from "./components/Home/HomeNav";
import UpdateRecipes from "./components/Recipes/UpdateRecipes";
import UserPage from "./components/UserPage";
import RecipePage from "./components/Recipes/RecipePage";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const [toast, setToast] = useState(false);
  return (
    <Router>
      <div className="App">
        <Route exact path="/register">
          <Nav />
          <ToastProvider>
            <RegisterForm setToast={setToast} />
          </ToastProvider>
        </Route>

        <Route exact path="/">
          <Nav />
          <ToastProvider>
            <LoginForm toast={toast} setToast={setToast} />
          </ToastProvider>
        </Route>

        <Switch>
          <ProtectedRoute exact path="/home">
            <HomeNav />
            <Home />
          </ProtectedRoute>

          <ProtectedRoute exact path="/user_recipes">
            <HomeNav />
            <ToastProvider>
              <UserPage toast={toast} setToast={setToast} />
            </ToastProvider>
          </ProtectedRoute>

          <ProtectedRoute exact path="/newRecipe">
            <HomeNav />
            <ToastProvider>
              <AddRecipe setToast={setToast} />
            </ToastProvider>
          </ProtectedRoute>

          <ProtectedRoute exact path="/user_recipes/:id">
            <HomeNav />
            <RecipePage />
          </ProtectedRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
