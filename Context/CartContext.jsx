import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Charger le panier
    const loadCart = async (orderId) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/getCart/${orderId}`);
            setCart(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors du chargement du panier');
        } finally {
            setLoading(false);
        }
    };

    // Ajouter un produit
    const addToCart = async (orderId, productId, quantity, special_instructions) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/addOrderItem', {
                order_id: orderId,
                product_id: productId,
                quantity,
                special_instructions
            });
            setCart(response.data.cart);
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors de l\'ajout au panier');
        } finally {
            setLoading(false);
        }
    };

    // Mettre à jour la quantité
    const updateQuantity = async (orderId, itemId, quantity) => {
        try {
            setLoading(true);
            const response = await axios.put(`/api/updateQuantity/${orderId}/${itemId}`, {
                quantity
            });
            setCart(response.data.cart);
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors de la mise à jour de la quantité');
        } finally {
            setLoading(false);
        }
    };

    // Supprimer un produit
    const removeItem = async (orderId, itemId) => {
        try {
            setLoading(true);
            const response = await axios.delete(`/api/removeItem/${orderId}/${itemId}`);
            setCart(response.data.cart);
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors de la suppression');
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
        updateQuantity,
        removeItem
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

// Composant d'affichage du panier
export function Cart({ orderId }) {
    const { cart, loading, error, loadCart, updateQuantity, removeItem } = useCart();

    useEffect(() => {
        loadCart(orderId);
    }, [orderId]);

    if (loading) return <div className="flex justify-center p-4">Chargement...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;
    if (!cart) return null;

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Votre Panier</h2>
            
            {cart.items?.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                <>
                    {cart.items?.map((item) => (
                        <div key={item.id_order_item} className="flex items-center justify-between border-b py-4">
                            <div className="flex items-center space-x-4">
                                {item.image_url && (
                                    <img 
                                        src={item.image_url} 
                                        alt={item.name} 
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                )}
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">{item.price}€</p>
                                    {item.special_instructions && (
                                        <p className="text-sm text-gray-500">
                                            Note: {item.special_instructions}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(cart.orderId, item.id_order_item, item.quantity - 1)}
                                        className="bg-gray-200 px-2 py-1 rounded"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(cart.orderId, item.id_order_item, item.quantity + 1)}
                                        className="bg-gray-200 px-2 py-1 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <button
                                    onClick={() => removeItem(cart.orderId, item.id_order_item)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="mt-6">
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>{cart.totalPrice}€</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// Composant bouton d'ajout au panier
export function AddToCartButton({ orderId, productId, className }) {
    const { addToCart, loading } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [instructions, setInstructions] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleAddToCart = async () => {
        await addToCart(orderId, productId, quantity, instructions);
        setShowModal(false);
        setQuantity(1);
        setInstructions('');
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className}`}
                disabled={loading}
            >
                Ajouter au panier
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Ajouter au panier</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Quantité
                                </label>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="bg-gray-200 px-2 py-1 rounded"
                                    >
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="bg-gray-200 px-2 py-1 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Instructions spéciales
                                </label>
                                <textarea
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Ajout...' : 'Ajouter'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}