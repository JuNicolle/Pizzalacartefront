import axios from 'axios';

function addUser(user) {
    return axios.post('http://localhost:3000/pizzalacarte/createUser', user);
}

function loginUser(user){
    return axios.post('http://localhost:3000/pizzalacarte/loginUser', user);
}

function getUser(){
    return axios.get('http://localhost:3000/pizzalacarte/me');
}

function updateUser(user){
    const userId = localStorage.getItem('userId'); 
    return axios.post(`http://localhost:3000/pizzalacarte/updateUser/${userId}`, user);
}

export default {
    addUser,
    loginUser,
    getUser,
    updateUser
};