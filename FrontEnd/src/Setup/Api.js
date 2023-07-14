import axios from 'axios';

import CONSTANTS from '../Setup/Constants.json';
const { URL } = CONSTANTS;

const handleError = (error) => {
    if (error.response) {
        alert(error.response.data);
    } else if (error.request) {
        alert(error.message);
    } else {
        alert(error.message);
    }
}

async function GET(path, payload) {

    return axios.get(URL.concat(path), payload)
        .then(response => response.data)
        .catch(handleError);
}

async function POST(path, payload) {

    return axios.post(URL.concat(path), payload)
        .then(response => response.data)
        .catch(handleError);
}

async function PUT(path, payload) {

    return axios.put(URL.concat(path), payload)
        .then(response => response.data)
        .catch(handleError);
}

async function DELETE(path, payload) {

    return axios.delete(URL.concat(path), payload)
        .then(response => response.data)
        .catch(handleError);
}

export { GET, POST, PUT, DELETE }