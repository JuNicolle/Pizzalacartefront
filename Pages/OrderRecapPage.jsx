import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import FooterPizz from "../Components/FooterPizz";
import NavBar from "../Components/NavBar";
import { useCart } from "../Context/CartContext";
import OrderRecap from "../Components/OrderRecap";

const OrderRecapPage = () => {
  const { cart, removeItem } = useCart();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isRemoving, setIsRemoving] = useState(false);
  const [orderId, setOrderId] = useState(localStorage.getItem('orderId'));
  const navigate = useNavigate();

  // Détecte si l'appareil est mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRemoveFromCart = async (id_order_item) => {
    if (isRemoving) return;
    
    try {
      setIsRemoving(true);
      
      // Récupérer l'orderId le plus récent
      const currentOrderId = localStorage.getItem('orderId');
      
      if (!currentOrderId) {
        console.error("Pas d'orderId trouvé");
        toast.error('Erreur: impossible de supprimer le produit');
        return;
      }

      if (!id_order_item) {
        console.error("id_order_item invalide:", id_order_item);
        toast.error('Erreur: produit invalide');
        return;
      }

      await removeItem(currentOrderId, id_order_item);
      toast.error('Produit retiré du panier', {
        autoClose: 800,
      });
      
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error('Erreur lors de la suppression du produit');
    } finally {
      setIsRemoving(false);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      // Récupérer l'orderId le plus récent
      const currentOrderId = localStorage.getItem('orderId');
      
      // Mise à jour du statut
      const response = await axios.put(`http://localhost:3000/pizzalacarte/updateOrderStatus/${currentOrderId}`, 
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

  // Modification d'OrderRecap pour inclure des boutons de suppression en mobile
  const ModifiedOrderRecap = () => {
    return (
      <div className="order-recap-container">
        <h1 className="order-recap-title">Récapitulatif de commande</h1>
        
        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="empty-message">
            Votre panier est vide
          </div>
        ) : (
          <div className="order-card">
            <h2 className="order-section-title">Articles</h2>
            
            {cart.items.map((item) => (
              <div key={item.id_order_item} className="order-item">
                <div className="item-content">
                  {item.image_path && (
                    <img 
                      src={`http://localhost:3000/images/${item.image_path}`} 
                      alt={item.name} 
                      className="item-image" 
                    />
                  )}
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-quantity">Quantité: {item.quantity}</div>
                    {item.special_instructions && (
                      <div className="item-instructions">
                        Instructions: {item.special_instructions}
                      </div>
                    )}
                  </div>
                </div>
                <div className="item-price-actions">
                  <div className="item-price">{(item.price * item.quantity).toFixed(2)}€</div>
                  
                  {/* Bouton de suppression en mobile */}
                  {isMobile && (
                    <Button 
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveFromCart(item.id_order_item)}
                      className="mt-2"
                      disabled={isRemoving}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            <div className="order-total">
              <span>Total</span>
              <span>{cart.totalPrice}€</span>
            </div>
            
            <div className="buttons-container">
              <Button 
                variant="secondary" 
                onClick={() => navigate(-1)}
              >
                Retour
              </Button>
              <Button 
                variant="success" 
                onClick={handleConfirmOrder}
              >
                Confirmer la commande
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };
    
  return (
    <>
      <div className="locationPage">
        <div className="leftPart">
          <NavBar />
            
          {/* Utiliser notre version modifiée d'OrderRecap au lieu du composant importé */}
          <ModifiedOrderRecap />

          <FooterPizz />
        </div>
        {!isMobile && (
          <div className="rightPart">
            <h2>Votre panier</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderRecapPage;