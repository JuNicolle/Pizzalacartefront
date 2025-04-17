import axios from "axios";

const BASE_URL = 'http://localhost:3000/pizzalacarte';

function GetAllLocations() {
    return axios.get(`${BASE_URL}/getAllLocations`);
}

function GetLocationById(id) {
    return axios.get(`${BASE_URL}/getLocation/${id}`);
}

function CreateLocation(locationData) {
    return axios.post(`${BASE_URL}/createLocation`, locationData);
}

function UpdateLocation(id, locationData) {
    return axios.put(`${BASE_URL}/updateLocation/${id}`, locationData);
}

function DeleteLocation(id) {
    return axios.delete(`${BASE_URL}/deleteLocation/${id}`);
}

function GetTodayLocations() {
    return axios.get(`${BASE_URL}/getTodayLocations`);
}

export const LocationService = {
    GetAllLocations,
    GetLocationById,
    CreateLocation,
    UpdateLocation,
    DeleteLocation,
    GetTodayLocations
}

export default LocationService;