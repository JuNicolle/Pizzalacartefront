import React, { useState, useEffect } from 'react';
import orderService from '../services/orderService';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Si on a un orderId, on charge les items du panier
        if (orderId) {
            loadCartItems();
        }
    }, [orderId]);

    const loadCartItems = async () => {
        try {
            setLoading(true);
            const items = await orderService.getOrderItems(orderId);
            setCartItems(items);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        try {
            setLoading(true);
            await orderService.updateQuantity(orderId, productId, newQuantity);
            // Recharger les items du panier pour avoir le prix total mis à jour
            await loadCartItems();
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId, quantity = 1, specialInstructions = '') => {
        try {
            setLoading(true);
            // Si pas de commande en cours, en créer une nouvelle
            if (!orderId) {
                const newOrder = await orderService.createOrder(
                    userId, // À définir selon votre gestion d'authentification
                    locationId // À définir selon votre logique
                );
                setOrderId(newOrder.id);
            }

            await orderService.addToOrder(orderId, productId, quantity, specialInstructions);
            await loadCartItems();
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="cart-container">
            <h2>Votre Panier</h2>
            {cartItems.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.product_id} className="cart-item">
                            <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover" />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p>Prix: {item.price}€</p>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                {item.special_instructions && (
                                    <p>Instructions: {item.special_instructions}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h3>Total: {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}€</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;