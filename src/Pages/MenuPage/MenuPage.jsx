import Menu from "../../Component/Menu/Menu.jsx";

import "./Menu.css";
import heroImg from "../../assets/product page.jpg";
import Order from "../../Component/order/Order.jsx";
import { useEffect } from "react";



function MenuPage() {
  

  return (
    
    <div className="menu-page">
      <img className="menu-hero-img" src={heroImg} alt="" />
      <div className="menu-grid">
       {/*-- <SideMenu /> */}
        <Menu />
      </div>
      <Order />
    </div>
  );
}

export default MenuPage;
