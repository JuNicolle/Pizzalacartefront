import { Link } from "react-router-dom";
import Cart from "../Components/Cart";
import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";

const AdminPage = () => {
  return (
    <>
      <div>
        <div className="leftPart">
          <NavBar />
          <div>
            <h2>Panneau Admin</h2>
          </div>
          <div className="adminPanel">
            <Link to={"/AdminPizzaPage"}>
              <div className="adminCard">
                <h3>Pizzas</h3>
                <img src="src/assets/ptifoodtruck.jpg" alt="" />
              </div>
            </Link>
            <Link to={"/AdminLocationPage"}>
              <div className="adminCard">
                <h3>Emplacements</h3>
                <img src="src/assets/pizzmap.png" alt="" />
              </div>
            </Link>
            <Link to={"/AdminUserPage"}>
              <div className="adminCard">
                <h3>Utilisateurs</h3>
                <img src="src/assets/userimg.jpg" alt="" />
              </div>
            </Link>
            <Link to={"/AdminOrderPage"}>
              <div className="adminCard">
                <h3>Commandes en cours</h3>
                <img src="src/assets/10219.jpg" alt="" />
              </div>
            </Link>
          </div>
        </div>
        
        <FooterPizz />
        
      </div>
      <div className="rightPart">
        <h2>Votre panisser</h2>
        <Cart />
      </div>
    </>
  );
};

export default AdminPage;
