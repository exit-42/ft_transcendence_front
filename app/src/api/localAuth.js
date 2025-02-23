import { useFetch } from './useFetch.js';

const baseUrl = 'authentication/local-auth/';

// EndPoint 끝에 / 왜?

export async function postCode(body) {
    const response = await useFetch(baseUrl + 'code/', {
        method: 'POST',
        body: JSON.stringify(body),
    });

    return response;
}

export async function postEmail(body) {
    const response = await useFetch(baseUrl + 'email/', {
        method: 'POST',
        body: JSON.stringify(body),
    });

    return response;
}

export async function getId(id) {
    const response = await useFetch(baseUrl + `id/?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'fasdfasdfs/json',
        },
    });

    return response;
}

export async function postSignin(body) {
    const response = await useFetch(baseUrl + 'signin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    return response;
}

export async function postSignup(body) {
    const response = await useFetch(baseUrl + 'signup/', {
        method: 'POST',
        body: JSON.stringify(body),
    });

    return response;
}

export async function postToken(body) {
    const response = await useFetch(baseUrl + 'token/', {
        method: 'POST',
        body: JSON.stringify(body),
    });

    return response;
}
