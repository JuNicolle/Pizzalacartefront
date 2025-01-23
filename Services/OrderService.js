import axios from 'axios';


class OrderService {
    // Récupérer tous les produits
    async getProducts() {
        try {
            const response = await axios.get(`http://localhost:3000/pizzalacarte/readProducts`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Récupérer les produits par catégorie
    async getProductsByCategory(categoryId) {
        try {
            const response = await axios.get(`http://localhost:3000/pizzalacarte/readProductsByCategory/${categoryId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Créer une nouvelle commande
    async createOrder(userId, locationId) {
        try {
            const response = await axios.post(`http://localhost:3000/pizzalacarte/orders`, {
                user_id: userId,
                location_id: locationId,
                status: 'pending',
                total_price: 0
            }, {
                headers: { 
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Ajouter un produit à une commande
    async addToOrder(orderId, productId, quantity, specialInstructions = '') {
        try {
            const response = await axios.post(`http://localhost:3000/pizzalacarte/addToOrder`, {
                order_id: orderId,
                product_id: productId,
                quantity,
                special_instructions: specialInstructions
            }, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Mettre à jour la quantité d'un produit dans la commande
    async updateQuantity(orderId, productId, quantity) {
        try {
            const response = await axios.put(`http://localhost:3000/pizzalacarte/updateQuantity`, {
                order_id: orderId,
                product_id: productId,
                quantity
            }, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Récupérer les produits d'une commande
    async getOrderItems(orderId) {
        try {
            const response = await axios.get(`http://localhost:3000/pizzalacarte/orderItems/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Utility function to get token from localStorage
    getToken() {
        return localStorage.getItem('token');
    }

    // Utility function to handle errors
    handleError(error) {
        if (error.response) {
            // Request made but server responded with error
            return {
                status: error.response.status,
                message: error.response.data.error || 'Une erreur est survenue'
            };
        } else if (error.request) {
            // Request made but no response
            return {
                status: 503,
                message: 'Le serveur ne répond pas'
            };
        } else {
            // Error setting up request
            return {
                status: 500,
                message: 'Erreur de configuration de la requête'
            };
        }
    }
}

export default new OrderService();