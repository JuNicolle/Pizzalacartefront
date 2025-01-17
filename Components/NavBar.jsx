import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";

const NavBar = () => {

    const {isAuthentified, setIsAuthentified} = useContext(AuthContext);

    const handleLogout = () => {
      setIsAuthentified(false);
      AuthService.logout();
    };

    return (
 <div className="navBarBody">
    <Navbar expand="lg" className="navBar">
        <Navbar.Brand href="#home">Pizz'a La Carte</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse >
          <Nav className="navLink">
            <Link to={"/"}>Home</Link>
            {isAuthentified == false ? <>
            <Link to={"/SignInPage"}>S'inscrire</Link>
            <Link to={"/LoginPage"}>Se connecter</Link>
            </> : <>
            <Link to={"/AccountPage"}>Mon Compte</Link>
            <Button onClick={handleLogout}>Se déconnecter</Button>
            </>}

                <Link href="#link"></Link>
                <Link href="#link"></Link>
                <Link href="#link"></Link>

          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>

    );
}
 
export default NavBar;