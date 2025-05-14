import React from "react";
import sideMenuImg from "../../assets/Sun (1).png";
import { HashLink } from "react-router-hash-link";

function SideMenu() {
  const sideMenu = ["Water toys", "Beach toys", "Pool fun", "Garden play"];

  return (
    <div className="side-menu">
      {sideMenu.map((category) => {
        return (
          <div className="side-menu-option" key={category}>
            <HashLink className="side-menu-flex" smooth to={`#${category}`}>
              <img src={sideMenuImg} alt="Sun(1)" />
              {category}
            </HashLink>
          </div>
        );
      })}
    </div>
  );
}

export default SideMenu;
