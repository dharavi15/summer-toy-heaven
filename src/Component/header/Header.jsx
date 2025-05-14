import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/image.png";
import { useOpenMenuStore } from "../../data/openMenuStore";
import { Link } from "react-router-dom";



const Header = () => {
  const isOpen = useOpenMenuStore((state) => state.isOpen);
  const toggleMenu = useOpenMenuStore((state) => state.toggleMenu);
  

  return (
    <header className="header-container">
      <div className="logo-container"> 
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <FontAwesomeIcon 
        icon={isOpen ? faXmark : faBars} 
        className="menu-icon" 
        onClick={toggleMenu} 
        style={{ color: isOpen ? "black" : "black", transition: "color 0.3s ease" }}/>
    </header>
  );
};

export default Header;
