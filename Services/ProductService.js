// ProductService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/pizzalacarte';

function getAllProducts(){
    return axios.get(`${API_URL}/readProducts`)
}

function getProductsByCategory(categoryId) {
    return axios.get(`${API_URL}/readProductsByCategory/${categoryId}`);
}

function createProduct(productData){

    const formData = new FormData();
    
    Object.keys(productData).forEach(key => {
        if (key === 'image' && productData[key]) {
            formData.append('image', productData[key]);
        } else if (key !== 'image' && productData[key] !== null && productData[key] !== undefined && productData[key] !== '') {
            formData.append(key, productData[key]);
        }
    });

    return axios.post(`${API_URL}/createProduct`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

function deleteProduct(id){
    return axios.delete(`${API_URL}/deleteProduct/${id}`)
}

function updateProduct(id, productData){
    const formData = new FormData();
    
    Object.keys(productData).forEach(key => {
        if (key === 'image' && productData[key]) {
            formData.append('image', productData[key]);
        } else if (key !== 'image' && productData[key] !== null && productData[key] !== undefined) {
            formData.append(key, productData[key]);
        }
    });

    return axios.post(`${API_URL}/updateProduct/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export default {
    getAllProducts,
    getProductsByCategory,
    deleteProduct,
    updateProduct,
    createProduct
}