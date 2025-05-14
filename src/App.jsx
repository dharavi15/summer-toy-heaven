import { Outlet } from "react-router";
import "./App.css";
import Footer from "./Component/footer/Footer.jsx";
import Header from "./Component/header/Header.jsx";
import OpenMenu from "./Component/openMenu/OpenMenu.jsx";


// This is the main layout component for the entire app.
function App() {
  return (
    <>
        <header>
        <OpenMenu />
        <Header />
      </header>
      <main>
        <Outlet /> {/* This is where Home, Contact, Menu, etc. will be rendered */}
      </main>
      <Footer />
    </>
  );
}

export default App;
