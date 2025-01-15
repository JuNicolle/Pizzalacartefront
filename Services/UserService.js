import axios from 'axios';

function addUser(user) {
    return axios.post('http://localhost:3001/pizzalacarte/AVOIRAVECLEBACKPUTAIN', user);
}

export default {
    addUser
};