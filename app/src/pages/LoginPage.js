import Component from '../core/Component.js';

export default class LoginPage extends Component {
    template() {
        return `
            <div style="width: 100vw; height: 100vh; position: relative;">
                <img  style="width: 100%; height: 100%; object-fit: cover;" src="src/imgs/pingpong.png">
                <div>
                    <button class="py-1 fs-3 border-0 text-white rounded-pill cus-button auth-button" id="login-button">
                        Login with 42
                    </button>
                    <button class="py-1 fs-3 border-0 text-white rounded-pill cus-button login-button" >
                        Log in
                    </button>
                    <button class="py-1 fs-3 border-0 text-white rounded-pill cus-button signup-button" >
                        Sign up
                    </button>
                </div>
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
