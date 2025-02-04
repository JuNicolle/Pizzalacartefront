import axios from 'axios';

axios.defaults.headers.post['Content-Type']="application/json"

function addUser(user) {
    return axios.post('http://localhost:3000/pizzalacarte/createUser', user);
}

async function loginUser(user){
    const response = await axios.post('http://localhost:3000/pizzalacarte/loginUser', user);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Créer immédiatement un nouveau panier après le login
        try {
            const cartResponse = await axios.post('http://localhost:3000/pizzalacarte/createOrder', 
                { location_id: 1 },  // Ajustez selon votre configuration
                { headers: { 'Authorization': `Bearer ${response.data.token}` }}
            );
            localStorage.setItem('orderId', cartResponse.data.orderId);
        } catch (error) {
            console.error('Erreur lors de la création du panier:', error);
        }
    }
    return response;
}

function getUser(){
    return axios.get('http://localhost:3000/pizzalacarte/me');
}

function updateUser(id, user){
    const userId = localStorage.getItem('userId'); 
    return axios.post(`http://localhost:3000/pizzalacarte/updateUser/`+ id, user);
}

// Ajouter une fonction de logout qui nettoie le localStorage
function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('orderId');
}

function SendCode(data){
    return axios.post('http://localhost:3000/pizzalacarte/sendCode/',data)
}

function ResetPassword(data){
    return axios.post('http://localhost:3000/pizzalacarte/resetPassword/',data)
}

export default {
    addUser,
    loginUser,
    getUser,
    updateUser,
    logoutUser,
    SendCode,
    ResetPassword
};