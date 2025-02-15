import Component from '../core/Component.js';

// template 내부에서 ${test()}로 사용 가능
// 분리하는 게 의미가 있나?
// const test = () => {
//     return `
//         <div class="cus-modal-content">
//             회원가입 모달
//             <button class="cus-modal-close-button">
//                 닫기
//             </button>
//         </div>
//     `;
// };

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
                        <div class="cus-modal-content" id="login">
                            <input class="id" type="text" placeholder="ID">
                            <input class="password" type="text" placeholder="passward">

                            <div>
                                <button class="cus-button" id="login-modal-insert">
                                    입력
                                </button>
                                <button class="cus-button cus-modal-close-button">
                                    닫기
                                </button>
                            </div>

                        </div>
                    </div>

                    <div class="cus-modal-container hidden" id="signup-modal">
                        <div class="cus-modal-content" id="signup">
                        <div>
                            <input class="id" type="text" placeholder="ID">
                            <button class="cus-button" id="signup-modal-id-check">
                            check
                            </button>

                        </div>
                        <div>
                            <input class="email" type="text" placeholder="email">
                            <button class="cus-button" id="signup-modal-email-check">
                            send
                            </button>
                        </div>
                            <input class="code" type="text" placeholder="코드를 입력하세요">
                            <input class="password" type="text" placeholder="passward">                   
                            <div>
                                <button class="cus-button" id="signup-modal-insert">
                                    입력
                                </button>
                                <button class="cus-button cus-modal-close-button">
                                    닫기
                                </button>
                            </div>

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
            $modal.classList.add('current');
        });

        this.addEvent('click', '#signup-button', () => {
            const $modal = this.$target.querySelector('#signup-modal');
            $modal.classList.remove('hidden');
            $modal.classList.add('current');
        });

        this.addEvent('click', '.cus-modal-close-button', () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            $Modal.classList.add('hidden');
            $Modal.classList.remove('current');
        });

        this.addEvent('click', '#login-modal-insert', () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            const id = $Modal.querySelector('.id');
            const password = $Modal.querySelector('.password');
            console.log(id.value, password.value);
            id.value = '';
            password.value = '';

            $Modal.classList.remove('current');
            $Modal.classList.add('hidden');
        });

        // 회원가입 아이디 체크 이벤트
        this.addEvent('click', '#signup-modal-id-check', () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            const id = $Modal.querySelector('.id');
            console.log(id.value);
            id.value = '';
        });

        // 회원가입 이메일 체크 이벤트
        this.addEvent('click', '#signup-modal-email-check', () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            const email = $Modal.querySelector('.email');
            console.log(email.value);
            email.value = '';
        });

        // 회원가입 이메일 체크 이벤트
        this.addEvent('click', '#signup-modal-insert', () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');

            const id = $Modal.querySelector('.id');
            const password = $Modal.querySelector('.password');
            const email = $Modal.querySelector('.email');
            const code = $Modal.querySelector('.code');

            console.log(id.value, password.value, email.value, code.value);

            $Modal.classList.remove('current');
            $Modal.classList.add('hidden');
        });
    }
}
