import React, { useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useCart } from '../Context/CartContext';
import axios from "axios";
import { toast } from "react-toastify";

const ProductModal = ({ show, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { addToCart } = useCart();

  const createNewCart = async () => {
    try {
      const response = await axios.post('http://localhost:3000/pizzalacarte/createOrder', {
        location_id: 1
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data.orderId;
    } catch (error) {
      console.error("Erreur création panier:", error);
      throw error;
    }
  };

  const handleAddToCart = async () => {
    try {
      let orderId = localStorage.getItem('orderId');
      toast.success('Produit ajouté au panier', {
        autoClose: 900});
      
      if (!orderId) {
        orderId = await createNewCart();
        localStorage.setItem('orderId', orderId);
        
      }

      await addToCart(
        orderId,
        product.id_product,
        quantity,
        specialInstructions
      );

      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      if (error.response?.status === 404) {
        localStorage.removeItem('orderId');
        handleAddToCart();
        
      }
    }
  };

  const handleBackgroundClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!show) return null;

  return (
    <div 
      onClick={handleBackgroundClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto"
        }}
      >
        <h2>{product.name}</h2>
        <img 
          src={`http://localhost:3000/images/${product.image_url}`} 
          alt={product.name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <p>{product.description}</p>
        <p>Allergènes : {product.allergens}</p>
        <p>Prix : {product.price} €</p>
        
        <div className="mb-3">
          <label>Quantité:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Commentaires :</label>
          <input
            type="text"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-between mt-3">
          <Button 
            variant="success" 
            onClick={handleAddToCart}
          >
            Ajouter au panier
          </Button>
          <Button 
            variant="danger" 
            onClick={onClose}
          >
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;