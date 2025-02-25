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

export async function patchNickname(body) {
    const response = await useFetch(baseUrl + 'nickname/', {
        method: 'PATCH',
        body: JSON.stringify(body),
    });

    return response;
}

export async function postImage(data) {
    const response = await useFetch(baseUrl + 'image/', {
        method: 'POST',
        body: data,
    });

    return response;
}
