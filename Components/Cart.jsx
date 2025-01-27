import React from 'react';
import { useCart } from '../Context/CartContext';
import { Button } from 'react-bootstrap';``
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeItem } = useCart();
    const orderId = localStorage.getItem('orderId');

    const handleRemoveFromCart = async (id_order_item) => {
        try {
            if (orderId && id_order_item) {
                await removeItem(orderId, id_order_item);
                toast.error('Produit retiré du panier', {
                    autoClose: 800, 
                  })
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    };

    return (
        <div className="rightPart">
            <h2 className="text-xl font-bold mb-4">Votre Panier</h2>
            {cart?.items?.length > 0 ? (
                <>
                    {cart.items.map((item) => (
                        <div key={item.id_order_item} className="cart-item p-4 border-b">
                            <div>
                                <div>
                                    <h5>{item.name}</h5>
                                    <p>
                                        {item.quantity} x {item.price}€
                                    </p>
                                </div>
                                <div>
                                    <span>{(item.quantity * item.price).toFixed(2)}€</span>
                                    <Button 
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveFromCart(item.id_order_item)}
                                        className="ms-2"
                                    >
                                        ×
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div>
                        <div>
                            <span>Total </span>
                            <span>{cart.totalPrice}€</span>
                        </div>
                    </div>
                    <Button variant="success"><Link to={'/OrderRecapPage'}>Voir ma commande</Link></Button>
                </>
            ) : (
                <p className="p-4 text-center text-gray-500">Votre panier est vide</p>
            )}
        </div>
    );
};

export default Cart;