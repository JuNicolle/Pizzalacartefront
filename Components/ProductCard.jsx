import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useCart } from '../Context/CartContext';
import axios from "axios";
import ProductModal from "./ProductModal";
import { toast } from "react-toastify";

const ProductCard = ({ ProductCard }) => {
  const [showModal, setShowModal] = useState(false);
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

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      let orderId = localStorage.getItem('orderId');
      toast.success('Produit ajouté au panier', {
        autoClose: 900});
      
      if (!orderId) {
        orderId = await createNewCart();
        localStorage.setItem('orderId', orderId);
        toast.success('Produit ajoutée au panier')
      }

      await addToCart(
        orderId,
        ProductCard.id_product,
        1,
        ''
      );

    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      if (error.response?.status === 404) {
        localStorage.removeItem('orderId');
        handleAddToCart(e);
      }
    }
  };

  return (
    <>
      <Card style={{ width: '18rem', cursor: 'pointer' }} onClick={() => setShowModal(true)}>
        <Card.Img 
          variant="top" 
          src={`http://localhost:3000/images/${ProductCard.image_url}`}
          alt={ProductCard.name}
        />
        <Card.Body>
          <Card.Title>{ProductCard.name}</Card.Title>
          <Card.Text>
            {ProductCard.description}
            <br />
            {ProductCard.price} €
          </Card.Text>

          <Button 
            variant="success" 
            onClick={handleAddToCart}
          >
            Ajouter au panier
          </Button>
        </Card.Body>
      </Card>

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={ProductCard}
      />
    </>
  );
}

export default ProductCard;