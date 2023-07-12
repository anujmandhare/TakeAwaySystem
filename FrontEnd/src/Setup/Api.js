import { axios as AXIOS } from 'axios';

import CONSTANTS from './Constants';
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

    return AXIOS.get(URL.concat(path), payload)
        .then(response => response.data)
        .catch(handleError);
}

async function POST(path, payload) {

    return AXIOS.post(URL.concat(path), payload)
        .then(response => response.data)
        .catch(handleError);
}

async function PUT(path, payload) {

    return AXIOS.put(URL.concat(path), payload)
        .then(response => response.data)
        .catch(handleError);
}

async function DELETE(path, payload) {

    return AXIOS.delete(URL.concat(path), payload)
        .then(response => response.data)
        .catch(handleError);
}

export { GET, POST, PUT, DELETE }