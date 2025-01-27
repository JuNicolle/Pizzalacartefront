import { useState } from "react";
import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";
import { useCart } from "../Context/CartContext";

const OrderRecapPage = () => {

    const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await OrderSer;
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

    
  return (
    <>
      <div className="locationPage">
        <div className="leftPart">
          <NavBar />
            


          <FooterPizz/>
        </div>
      </div>
      <div className="rightPart">
        <h2>Votre panier</h2>
      </div>
    </>
  );
};

export default OrderRecapPage;
