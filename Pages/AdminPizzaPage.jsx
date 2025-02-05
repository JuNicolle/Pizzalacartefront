import Cart from "../Components/Cart";
import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";

const AdminPizzaPage = () => {
    return <>
    
    <div>
      <div className="leftPart">
        <NavBar />
        <div className="mainContent">
        <h2>Gestions des pizzas</h2>

        </div>
        <div className="adminFooter">
        <FooterPizz />
        </div>
      </div>

      <div className="rightPart">
        <h2>Votre Panier</h2>
        <Cart />
      </div>
    </div>
    </>
}
 
export default AdminPizzaPage;



