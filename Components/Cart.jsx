import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeItem } = useCart();
    const orderId = localStorage.getItem('orderId');
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemoveFromCart = async (id_order_item) => {
        if (isRemoving) return; // Évite les suppressions multiples simultanées
        
        try {
            setIsRemoving(true);
            
            if (!orderId) {
                console.error("Pas d'orderId trouvé");
                toast.error('Erreur: impossible de supprimer le produit');
                return;
            }

            if (!id_order_item) {
                console.error("id_order_item invalide:", id_order_item);
                toast.error('Erreur: produit invalide');
                return;
            }

            await removeItem(orderId, id_order_item);
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

    return (
        <div className="rightPart">
            <h2 className="text-xl font-bold mb-4">Votre Panier</h2>
            {cart?.items?.length > 0 ? (
                <>
                    {cart.items.map((item) => (
                        <div key={item.id_order_item} className="cart-item p-4 border-b">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h5 className="font-semibold">{item.name}</h5>
                                    <p className="text-gray-600">
                                        {item.quantity} x {item.price}€
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold">
                                        {(item.quantity * item.price).toFixed(2)}€
                                    </span>
                                    <Button 
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveFromCart(item.id_order_item)}
                                        className="ms-2"
                                        disabled={isRemoving}
                                    >
                                        ×
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 p-4 border-t">
                        <div className="flex justify-between items-center">
                            <span className="font-bold">Total </span>
                            <span className="font-bold">{cart.totalPrice}€</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button variant="success" className="w-full">
                            <Link to="/OrderRecapPage" className="text-white no-underline">
                                Voir ma commande
                            </Link>
                        </Button>
                    </div>
                </>
            ) : (
                <p className="p-4 text-center text-gray-500">Votre panier est vide</p>
            )}
        </div>
    );
};

export default Cart;