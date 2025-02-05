import Component from '../core/Component.js';

export default class LoginPage extends Component {
    template() {
        return `
            <div style="width: 100vw; height: 100vh; position: relative;">
                <img  style="width: 100%; height: 100%; object-fit: cover;" src="src/imgs/pingpong.png">
                <div>
                    <button class="py-1 fs-3 border-0 text-white rounded-pill cus-button cus-auth-button" id="login-42-button">
                        Login with 42
                    </button>
                    <button class="py-1 fs-3 border-0 text-white rounded-pill cus-button cus-login-button" id="login-button">
                        Log in
                    </button>
                    <button class="py-1 fs-3 border-0 text-white rounded-pill cus-button cus-signup-button" id="signup-button">
                        Sign up
                    </button>
                </div>

                    <div class="cus-modal-container hidden" id="login-modal">
                        <div class="cus-modal-content">
                            로그인 모달
                            <button class="cus-modal-close-button">
                                닫기
                            </button>
                        </div>
                    </div>

                        <div class="cus-modal-container hidden" id="signup-modal">
                        <div class="cus-modal-content">
                            회원가입 모달
                            <button class="cus-modal-close-button">
                                닫기
                            </button>
                        </div>
                    </div>
            </div>
        `;
    }
    setEvent() {
        // 로그인 버튼 클릭 시 페이지 해시 변경
        this.addEvent('click', '#login-42-button', () => {
            window.location.hash = '/home'; // 해시 값 변경
        });

        this.addEvent('click', '#login-button', () => {
            const $modal = this.$target.querySelector('#login-modal');
            $modal.classList.remove('hidden');
            
        });

        this.addEvent('click', '.cus-modal-close-button', () => {
            const $modal = this.$target.querySelector('#login-modal');
            $modal.classList.add('hidden');
        });

        this.addEvent('click', '#signup-button', () => {
            const $modal = this.$target.querySelector('#signup-modal');
            $modal.classList.remove('hidden');
        });

        this.addEvent('click', '.cus-modal-close-button', () => {
            const $modal = this.$target.querySelector('#signup-modal');
            $modal.classList.add('hidden');
        });
    }
}
