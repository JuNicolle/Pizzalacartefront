import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const OrderRecap = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const orderId = localStorage.getItem('orderId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderId) {
          setError("Aucune commande en cours");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:3000/pizzalacarte/getCart/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setOrderDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur:", err);
        setError("Erreur lors du chargement de la commande");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleConfirmOrder = async () => {
    try {
      await axios.put(`http://localhost:3000/pizzalacarte/updateOrderStatus/${orderId}`, 
        { status: 'En cours' },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      localStorage.removeItem('orderId');
      navigate('/confirmation');
    } catch (error) {
      console.error("Erreur lors de la confirmation:", error);
      setError("Erreur lors de la confirmation de la commande");
    }
  };

  if (loading) return <div className="loading-message">Chargement de votre commande...</div>;

  if (error) return <div className="error-message">{error}</div>;

  if (!orderDetails) return <div className="empty-message">Aucune commande trouvée</div>;

  return (
    <div className="order-recap-container">
      <h1 className="order-recap-title">Récapitulatif de votre commande</h1>
      
      <div className="order-card">
        <div>
          <h2 className="order-section-title">Articles commandés</h2>
          {orderDetails.items.map((item) => (
            <div key={item.id_order_item} className="order-item">
              <div className="item-content">
                <img 
                  src={`http://localhost:3000/images/${item.imageUrl}`}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-quantity">Quantité : {item.quantity}</p>
                  {item.specialInstructions && (
                    <p className="item-instructions">Note : {item.specialInstructions}</p>
                  )}
                </div>
              </div>
              <div className="item-price">
                {(item.price * item.quantity).toFixed(2)}€
              </div>
            </div>
          ))}
        </div>

        <div className="order-total">
          <span>Total</span>
          <span>{orderDetails.totalPrice}€</span>
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
    </div>
  );
};

export default OrderRecap;