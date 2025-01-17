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

export default {
    addUser,
    loginUser,
    getUser
};