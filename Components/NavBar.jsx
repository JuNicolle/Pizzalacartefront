import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";

const NavBar = () => {
  const { isAuthentified, setIsAuthentified } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthentified(false);
    AuthService.logout();
  };

  return (
    <>
    
    <div className="navBarBody">
      <Nav>
        <div className="navBarHeader">
          <div className="logoTitle">
            <img src="src/assets/pizza.png"></img>
            <h2 id="titlePizz">Pizz'a La Carte</h2>
          </div>
          <div>
            <div>
              <Button id="loginButton">
                <Link to={"/LoginPage"}>Se connecter / S'inscrire</Link>
              </Button>
            </div>
            <div></div>
          </div>
        </div>
      </Nav>

      <Nav>
        <div className="navLinkGrey">
          <Link to={"/"} className="navBarButton">
            Nos Pizzas
          </Link>
        </div>
        <div className="navLinkWhite">
          <Link to={"/LocationPage"} className="navBarButton">
            Nos emplacements
          </Link>
        </div>
        <div className="navLinkGrey">
          <Link to={"/LocationPage"} className="navBarButton">
            Appelez nous
          </Link>
        </div>

        {/* {isAuthentified == false ? <>
        
        <div className="navLinkGrey">
        <Link to={"/LoginPage"} className="navBarButton">Se connecter</Link>
        </div >
        </> : <>
        <Link to={"/AccountPage"}>Mon Compte</Link>
        <Button onClick={handleLogout}>Se déconnecter</Button>
        </>} */}
      </Nav>
    </div>
    


    </>
  );
};

export default NavBar;
