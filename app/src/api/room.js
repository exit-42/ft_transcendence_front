import { useFetch } from './useFetch.js';

const baseUrl = 'room/';
export async function getRoom(mode) {
    const response = await useFetch(baseUrl + `?mode=${mode}`, {
        method: 'GET',
    });

    return response;
}

export async function postRoom(mode) {
    const response = await useFetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({ mode: mode }),
    });

    return response;
}

export async function patchRoom(id) {
    const response = await useFetch(baseUrl, {
        method: 'PATCH',
        body: JSON.stringify({ room_id: id }),
    });

    return response;
}
