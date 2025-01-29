import { useState } from "react";
import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";
import { useCart } from "../Context/CartContext";
import OrderRecap from "../Components/OrderRecap";

const OrderRecapPage = () => {

  const handleConfirmOrder = async () => {
    try {
      // Mise à jour du statut
      await axios.put(`http://localhost:3000/pizzalacarte/updateOrderStatus/${orderId}`, 
        { status: 'En cours' },  // On passe le nouveau statut
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log('Réponse mise à jour status:', response.data);

      // Si la mise à jour réussit, on vide le localStorage et on redirige
      localStorage.removeItem('orderId');
      navigate('/confirmation');
      
    } catch (error) {
      console.error("Erreur lors de la confirmation:", error);
      toast.error('Erreur lors de la confirmation de la commande');
    }
};

    
  return (
    <>
      <div className="locationPage">
        <div className="leftPart">
          <NavBar />
            
          <OrderRecap/>

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
