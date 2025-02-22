export async function useFetch(url, options = {}) {
    const baseUrl = 'https://localhost/api/';
    try {
        const response = await fetch(baseUrl + url, options);

        if (response.ok) {
            return await response.json(); // 성공적인 응답을 반환
        } else {
            const errorData = await response.json();
            handleError(response.status, errorData);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('알 수 없는 에러');
    }
}

function handleError(status, errorData) {
    console.log('errorData', errorData);
    switch (status) {
        case 400:
            alert('잘못된 요청입니다');
            break;
        case 401:
            alert('인증이 필요합니다');
            break;
        case 403:
            alert('접근이 거부되었습니다');
            break;
        case 404:
            alert('페이지를 찾을 수 없습니다');
            break;
        case 409:
            alert('이미 존재하는 데이터입니다');
            break;
        case 500:
            alert('서버 에러');
            break;
        default:
            alert('알 수 없는 에러');
    }
}
