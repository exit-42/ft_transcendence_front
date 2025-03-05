import Component from '../core/Component.js';
import { postSignin, postToken } from '../api/localAuth.js';

export default class SignupModal extends Component {
    template() {
        return `
			<div class="cus-modal-container hidden" id="login-modal">
				<div class="cus-login-modal-content" id="login">
					<input class="id cus-login-modal-input" type="text" placeholder="ID">
					<input class="password cus-login-modal-input" type="text" placeholder="password">
					<div class="cus-buttons">
						<button class="cus-button cus-login-modal-button" id="login-modal-insert">
							log in
						</button>
						<button class="cus-button cus-login-modal-button cus-modal-close-button">
							close
						</button>
					</div>
					<div class="cus-modal-check hidden">
						<input class="code cus-signup-up-input" type="text" placeholder="인증 코드를 입력하세요">
						<button class="cus-signupcheck-button cus-button" id="signup-modal-email-check">
							check
						</button>
					</div>
				</div>
			</div>
		`;
    }

    setEvent() {
        // 모달 닫기 이벤트
        this.addEvent('click', '.cus-modal-close-button', () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            const $Input = this.$target.querySelector('.cus-modal-check');

            $Modal.classList.add('hidden');
            $Modal.classList.remove('current');
            $Input.classList.remove('current');
            $Input.classList.add('hidden');
        });

        // 로그인 요청 이벤트
        this.addEvent('click', '#login-modal-insert', async () => {
            const $Modal = this.$target.querySelector('.cus-modal-container');
            const id = $Modal.querySelector('.id').value;
            const password = $Modal.querySelector('.password').value;

            if (!id || !password) {
                alert('아이디를 입력 하세요');
                return;
            }

            const idPattern = /^[a-zA-Z0-9_]+$/;
            if (!idPattern.test(id)) {
                alert('잘못된 아이디 입니다');
                return;
            }

            if (!idPattern.test(password)) {
                alert('잘못된 비밀번호 입니다');
                return;
            }

            const data = { id, password };
            const response = await postSignin(data);
            if (response.ok) {
                const $Input = this.$target.querySelector('.cus-modal-check');
                $Input.classList.remove('hidden');
                $Input.classList.add('current');
            } else {
                // 에러 처리
                if (response.status == 400) {
                    alert('값을 입력 하세요');
                } else if (response.status == 401) {
                    alert('비밀번호가 틀렸습니다');
                } else if (response.status == 404) {
                    alert('아이디가 존재하지 않습니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });

        this.addEvent('click', '#signup-modal-email-check', async () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            const code = $Modal.querySelector('.code').value;

            const response = await postToken({ code });

            if (response.ok) {
                window.location.hash = '/home';
            } else {
                if (response.status == 400) {
                    alert('코드가 틀렸습니다');
                } else if (response.status == 401) {
                    alert('존재하지 않는 유저 입니다');
                } else if (response.status == 452) {
                    alert('세션이 만료 되었습니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });
    }
}
