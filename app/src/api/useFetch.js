export async function useFetch(url, options = {}, retries = 1) {
    const baseUrl = 'https://localhost/api/';

    try {
        const response = await fetch(baseUrl + url, options);

        // Check if the status code is 452 (you can customize retries as needed)
        if (response.status === 452 && retries > 0) {
            return useFetch(url, options, retries - 1); // Retry once with reduced retries
        }

        return response;
    } catch (error) {
        console.error('Network error:', error);
        alert('알 수 없는 에러');
    }
}
