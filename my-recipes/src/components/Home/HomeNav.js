import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import styled from 'styled-components';
import companylogo from '../../company-logo.png';


const HomeNavBarContainer = styled.div`
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
function HomeNav() {
    return (
<div className="App">

<HomeNavBarContainer>
  <nav className="navigation">          
  <img src = {companylogo} className = "company-logo" alt="company-logo"/>          
      <Link to='/newRecipe'>+ New Recipe</Link>
      <Link to='/myRecipes' >+ My Recipes</Link>  
      <Link to='/favorites' >+ Favorites</Link>        
  </nav>
</HomeNavBarContainer>

</div>
    )};
export default HomeNav;

