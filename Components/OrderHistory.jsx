import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';


const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Récupération du token
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('Pas de token trouvé');
                }

                // Décodage du token
                const tokenParts = token.split('.');
                const decodedToken = JSON.parse(atob(tokenParts[1]));

                // Utiliser 'id' au lieu de 'id_user'
                const userId = decodedToken.id;

                if (!userId) {
                    throw new Error('ID utilisateur non trouvé dans le token');
                }

                const response = await axios.get(`http://localhost:3000/pizzalacarte/getUserOrders/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Réponse API:', response.data);
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur détaillée:", {
                    message: err.message,
                    response: err.response?.data
                });
                setError("Erreur lors du chargement des commandes : " + err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="p-4 text-center">Chargement de votre historique...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
    if (orders.length === 0) return <div className="p-4 text-center">Aucune commande trouvée</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Historique des commandes</h2>
            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id_order} className="p-4">
                        <div className="flex justify-between items-start border-b pb-2 mb-3">
                            <div>
                                <p className="font-semibold">Commande #{order.id_order}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                                order.status === 'En cours' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-green-100 text-green-800'
                            }`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {order.items.map((item) => (
                                <div key={item.id_order_item} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={`http://localhost:3000/images/${item.image_url}`}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-600">
                                                Quantité: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-medium">
                                        {(item.price * item.quantity).toFixed(2)}€
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 pt-2 border-t flex justify-between items-center">
                            <span className="font-medium">Total</span>
                            <span className="font-bold">{order.total_price}€</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;