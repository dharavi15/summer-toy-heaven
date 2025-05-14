import Menu from "../../Component/Menu/Menu.jsx";
import SideMenu from "../../Component/Menu/SideMenu.jsx";
import "./Menu.css";
import heroImg from "../../assets/product page.jpg";
import Order from "../../Component/order/Order.jsx";
import { useEffect } from "react";
//import { getMenuFromAPI,  saveProductDataToAPI } from "../../data/jsonStorage.js";


function MenuPage() {
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await getMenuFromAPI();
  //       console.log(result);
  //     };

  //     fetchData();
  //   }, []);

  return (
    
    <div className="menu-page">
      <img className="menu-hero-img" src={heroImg} alt="" />
      <div className="menu-grid">
        <SideMenu />
        <Menu />
      </div>
      <Order />
    </div>
  );
}

export default MenuPage;
