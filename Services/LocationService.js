import axios from "axios";

function GetAllLocations() {
    return axios.get('http://localhost:3000/pizzalacarte/getAllLocations');
}

function GetLocationById(id) {
    return axios.get(`http://localhost:3000/pizzalacarte/getLocation/` + id);
}

export default {
    GetAllLocations,
    GetLocationById
}