// ProductService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/pizzalacarte';

class ProductService {
    async getAllProducts() {
        try {
            const response = await axios.get(`${API_URL}/readProducts`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getProductsByCategory(categoryId) {
        try {
            const response = await axios.get(`${API_URL}/readProductsByCategory/${categoryId}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductService();