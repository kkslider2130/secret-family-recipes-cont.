import React from "react";
import styled from "styled-components";
import companylogo from "../../company-logo.png";

const NavBarContainer = styled.div`
  background-color: whitesmoke;
  display: flex;
  width: 100%;

  .navigation {
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    background-color: #3a7669;
    align-items: center;
  }

  .navigation a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }

  img {
    width: 130px;
  }
`;
function Nav() {
  return (
    <div className="App">
      <NavBarContainer>
        <nav className="navigation">
          <img src={companylogo} className="company-logo" alt="company-logo" />
        </nav>
      </NavBarContainer>
    </div>
  );
}
export default Nav;
