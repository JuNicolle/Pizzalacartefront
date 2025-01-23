import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ProductCard}) => {



  const navigate=useNavigate();
  const navigateTo = (id) => {
      navigate('/pizzalacarte/'+id);
  }

 
  
    return <>
    
    
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={`http://localhost:3000/images/${ProductCard.image_url}`} />
      <Card.Body>
        <Card.Title>{ProductCard.name}</Card.Title>
        <Card.Text>
          {ProductCard.description}
          <br />
          {ProductCard.price} €
        </Card.Text>

        <Button variant="success">Ajouter au panier</Button>
      </Card.Body>
    </Card>
   

   
 
    </>
}
 
export default ProductCard;