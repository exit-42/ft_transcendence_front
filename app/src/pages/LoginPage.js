
import Component from '../core/Component.js';

export default class LoginPage extends Component {
    template() {
        return `
            <div style="width: 100vw; height: 100vh; position: relative;">
                <img class="" style="width: 100%; height: 100%; object-fit: cover;" src="src/imgs/pingpong.png">
                <button class="py-4 px-5 fs-1 border-0 text-white fw-bold rounded-pill custom-button" style="position: absolute; top: 85%; left: 50%; transform: translate(-50%, -50%);" id="login-button">
                    Login with 42
                </button>
            </div>
        `;
    }
    setEvent() {
        // 로그인 버튼 클릭 시 페이지 해시 변경
        this.addEvent('click', '#login-button', () => {
            window.location.hash = '/home'; // 해시 값 변경
        });
    }
}
