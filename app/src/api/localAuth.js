import { useFetch } from './useFetch';

const baseUrl = 'authentication/local-auth/';

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    return response;
}

export async function postToken(body) {
    const response = await useFetch(baseUrl + 'token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    return response;
}

export async function getId(id) {
    const response = await useFetch(baseUrl + `/id/?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    return response;
}

export async function postEmail(body) {
    const response = await useFetch(baseUrl + 'email/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    return response;
}

export async function postCode(body) {
    const response = await useFetch(baseUrl + 'code/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    return response;
}
