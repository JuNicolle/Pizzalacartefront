import axios from "axios";

function getAllProducts() {
    return axios.get('http://localhost:3000/pizzalacarte/readProducts');
  }
  
  function getProductById(id) {
    return axios.get('http://localhost:3000/pizzalacarte/readProductById/' + id);
  }

  export default {
    getAllProducts,
    getProductById
  }