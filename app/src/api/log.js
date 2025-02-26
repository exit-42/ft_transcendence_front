import { useFetch } from './useFetch.js';

const baseUrl = 'log/';
export async function getLog(type, cursor) {
    const response = await useFetch(baseUrl + `?game_type=${type}&cursor=${cursor}`, { method: 'GET' });

    return response;
}
