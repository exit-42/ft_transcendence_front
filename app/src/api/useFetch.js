export async function useFetch(url, options) {
    const baseUrl = 'https://localhost/api/';
    try {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(baseUrl + url, options);

        return response;
    } catch (error) {
        console.error('Network error:', error);
        alert('알 수 없는 에러');
    }
}
