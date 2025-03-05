import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import UserService from "../Services/UserService";

const NavBar = () => {
  const { isAuthentified, setIsAuthentified } = useContext(AuthContext);
  const user = AuthService.getUser();

  const handleLogout = () => {
    setIsAuthentified(false);
    AuthService.logout();
  };

  // const [user, setUser] = useState({});
  const fetchUser = async () => {
    try {
      const response = await UserService.getUser();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const navigate=useNavigate();

  return (
    <>
    
    <div className="navBarBody">
      <Nav>
        <div className="navBarHeader">
        
          <div className="logoTitle" onClick={() => navigate('/')}>
            <img src="src/assets/pizza.png"></img>
            <h2 id="titlePizz">Pizz'a La Carte</h2>
          </div>

          {user.role=="admin" ? (
<>
            
              <Link to={"/AdminPage"}><Button className="adminButton" size="lg">ADMIN</Button></Link>
              

</>
):(<></>)}


          <div>
            <div>
            {isAuthentified == false ? <>
              <Button id="loginButton" name="loginlink">
                <Link to={"/LoginPage"} >Se connecter / S'inscrire</Link>
              </Button>
              </> : <>
              <div className="buttonOnline">
                <div className="buttonCo">
              <Button variant="success" className="myAccount">
                <Link to={"/AccountPage"} className="myAccount">Mon compte</Link>
              </Button>
              </div>
              <Button variant="danger">
                <Link to={"/"} onClick={handleLogout}>Deconnexion</Link>
              </Button>
              </div>
              </>}
            </div>
            <div></div>
          </div>
        </div>
      </Nav>

      <Nav>
        <div className="navLinkGrey" onClick={() => navigate('/')}>
          <Link to={"/"} className="navBarButton">
            Nos Pizzas
          </Link>
        </div>
        <div className="navLinkWhite" onClick={() => navigate('/locationPage')}>
          <Link to={"/LocationPage"} className="navBarButton">
            Nos emplacements
          </Link>
        </div>
        <div className="navLinkGrey">
          <a href="tel:0612345678" className="navBarButton">
            Appelez nous
         </a>
          
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
