import { useNavigate } from "react-router-dom";
import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";
import OrderConfirmation from "../Components/OrderConfirmation";


const OrderConfirmationPage = () => {

    

    return <>
        <div className="locationPage">
        <div className="leftPart">
          <NavBar />
            <div id="orderConfirmationDiv">
          <OrderConfirmation/>
          </div>
          <FooterPizz/>
        </div>
      </div>
      <div className="rightPart">
        <h2>Votre panier</h2>
      </div>
    </>
}
 
export default OrderConfirmationPage;