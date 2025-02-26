import { useFetch } from './useFetch.js';

const baseUrl = 'follow/';

export async function getFollow(nickname) {
    const response = await useFetch(baseUrl + `?word=${nickname}`, {
        method: 'GET',
    });

    return response;
}

export async function postFollow(body) {
    const response = await useFetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(body),
    });

    return response;
}

export async function deleteFollow(body) {
    const response = await useFetch(baseUrl, {
        method: 'DELETE',
        body: JSON.stringify(body),
    });

    return response;
}

export async function getFolloweList() {
    const response = await useFetch(baseUrl + `list/`, {
        method: 'GET',
    });

    return response;
}
