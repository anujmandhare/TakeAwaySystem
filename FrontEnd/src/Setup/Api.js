import axios from 'axios';

import CONSTANTS from '../Setup/Constants.json';
const { URL } = CONSTANTS;

const getToken = () => {
    const user = localStorage?.user ? JSON.parse(localStorage.user) : '';
    const token = user.token;
    return { 'Authorization': token };
}

const handleError = (error) => {
    if (error.response) {
        alert(error.response.data);
    } else if (error.request) {
        alert(error.message);
    } else {
        alert(error.message);
    }
}

async function GET(path) {

    const headers = getToken();
    const config = { headers }
    return axios.get(URL.concat(path), config)
        .then(response => response.data)
        .catch(handleError);
}

async function POST(path, payload) {

    const headers = getToken();
    return axios.post(URL.concat(path), payload, { headers })
        .then(response => response.data)
        .catch(handleError);
}

async function PUT(path, payload) {

    const headers = getToken();
    return axios.put(URL.concat(path), payload, { headers })
        .then(response => response.data)
        .catch(handleError);
}

async function DELETE(path, payload) {

    const headers = getToken();
    return axios.delete(URL.concat(path), payload, { headers })
        .then(response => response.data)
        .catch(handleError);
}

export { GET, POST, PUT, DELETE }