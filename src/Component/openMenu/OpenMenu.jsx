import React from "react";
import { NavLink } from "react-router";
import "./OpenMenu.css";
import { useOpenMenuStore } from "../../data/openMenuStore";


const OpenMenu = () => {
  const isOpen = useOpenMenuStore((state) => state.isOpen);
  const closeMenu = useOpenMenuStore((state) => state.closeMenu);

  if (!isOpen) return null;
  

  return (
    <div className="nav-links" onClick={closeMenu}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/menu">Products</NavLink>
      <NavLink to="/contact">Contact Us</NavLink>
    </div>
  );
};

export default OpenMenu;
