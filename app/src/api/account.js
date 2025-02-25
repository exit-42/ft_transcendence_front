import { useFetch } from './useFetch.js';

const baseUrl = 'account/';
export async function postLogout() {
    const response = await useFetch(baseUrl + 'logout/', { method: 'POST' });

    return response;
}

export async function postLogin() {
    const response = await useFetch(baseUrl + 'login/', { method: 'POST' });

    return response;
}

export async function checkToken() {
    const response = await postLogin();
    if (response.ok) window.location.hash = '/home';
}
