// ProductService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/pizzalacarte';

function getAllProducts(){
    return axios.get(`${API_URL}/readProducts`)
}

function getProductsByCategory(categoryId) {
    return axios.get(`${API_URL}/readProductsByCategory/${categoryId}`);
}

function deleteProduct(id){
    return axios.delete(`${API_URL}/deleteProduct/${id}`)
}

export default {
    getAllProducts,
    getProductsByCategory,
    deleteProduct
};