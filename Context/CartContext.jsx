import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();
const API_URL = 'http://localhost:3000/pizzalacarte';

export function CartProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Helper pour obtenir les headers avec le token
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    };

    // Charger le panier au montage du contexte et quand orderId change
    useEffect(() => {
        const orderId = localStorage.getItem('orderId');
        if (orderId) {
            loadCart(orderId);
        }
    }, []);  // Au montage uniquement

    // Charger le panier
    const loadCart = async (orderId) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_URL}/getCart/${orderId}`,
                getAuthHeaders()
            );
            setCart(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors du chargement du panier');
            // Si le panier n'existe plus, on nettoie le localStorage
            if (error.response?.status === 404) {
                localStorage.removeItem('orderId');
                setCart(null);
            }
        } finally {
            setLoading(false);
        }
    };

    // Ajouter un produit au panier
        const addToCart = async (orderId, productId, quantity, special_instructions) => {
            try {
                setLoading(true);
                const response = await axios.post(
                    `${API_URL}/addOrderItem`,
                    {
                        order_id: orderId,
                        product_id: productId,
                        quantity,
                        special_instructions
                    },
                    getAuthHeaders()
                );
                console.log("Items dans la réponse:", response.data.cart.items);
    
                if (response.data.cart && response.data.cart.items) {
                    // Vérifions que chaque item a un id_order_item
                    const itemsWithIds = response.data.cart.items.map(item => {
                        console.log("Item dans le panier:", item);
                        if (!item.id_order_item) {
                            console.warn("Item sans id_order_item:", item);
                        }
                        return item;
                    });
    
                setCart({
                    ...response.data.cart,
                    items: itemsWithIds
                });
            }
                return response.data;
            } catch (error) {
                setError(error.response?.data?.message || 'Erreur lors de l\'ajout au panier');
                if (error.response?.status === 404) {
                    localStorage.removeItem('orderId');
                    setCart(null);
                }
                throw error;
            } finally {
                setLoading(false);
            }
        };

    // Supprimer un article du panier
    const removeItem = async (orderId, itemId) => {
        try {
            setLoading(true);
            const response = await axios.delete(
                `${API_URL}/removeItem/${orderId}/${itemId}`,
                getAuthHeaders()
            );
            setCart(response.data.cart);
            await loadCart(orderId); // Recharger le panier après la suppression
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors de la suppression');
            if (error.response?.status === 404) {
                localStorage.removeItem('orderId');
                setCart(null);
            }
        } finally {
            setLoading(false);
        }
    };

    // Créer un nouveau panier
    const createCart = async (locationId) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${API_URL}/createOrder`,
                { location_id: locationId },
                getAuthHeaders()
            );
            localStorage.setItem('orderId', response.data.orderId);
            setCart(response.data);
            return response.data.orderId;
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors de la création du panier');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        cart,
        loading,
        error,
        loadCart,
        addToCart,
        removeItem,
        createCart,
        setError
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// Hook personnalisé pour utiliser le panier
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};