import { useFetch } from './useFetch.js';

const baseUrl = 'account/';

// 동작 미확인
export async function postImage(body) {
    const response = await useFetch(baseUrl + 'image/', {
        method: 'POST',
        body: body,
    });

    return response;
}

export async function postLogin() {
    const response = await useFetch(baseUrl + 'login/', {
        method: 'POST',
    });

    return response;
}

export async function postLogout() {
    const response = await useFetch(baseUrl + 'logout/', {
        method: 'POST',
    });

    return response;
}

// 동작 미확인
export async function patchNickname(body) {
    const response = await useFetch(baseUrl + 'nickname/', {
        method: 'PATCH',
        body: JSON.stringify(body),
    });

    return response;
}
