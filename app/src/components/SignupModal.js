import Component from '../core/Component.js';
import { getId, postEmail, postCode, postSignup } from '../api/localAuth.js';
export default class LoginModal extends Component {
    template() {
        return `
			<div class="cus-modal-container hidden" id="signup-modal">
				<div class="cus-signup-modal-content" id="signup">
					<div class="cus-modal-check mb-5">
						<input class="id cus-signup-up-input" type="text" placeholder="ID">
						<button class="cus-signupcheck-button cus-button" id="signup-modal-id-check">
							check
						</button>
					</div>
					<div class="cus-modal-check mb-5">
						<input class="email cus-signup-up-input" type="email" placeholder="email">
						<button class="cus-signupcheck-button cus-button" id="signup-modal-email-send">
							send
						</button>
					</div>
					<div class="cus-modal-check mb-5">
						<input class="code cus-signup-up-input" type="text" placeholder="인증 코드를 입력하세요">
						<button class="cus-signupcheck-button cus-button" id="signup-modal-email-check">
							check
						</button>
					</div>
					<input class="password cus-signup-down-input mb-5" type="text" placeholder="password">				   
					<div class="cus-buttons">
						<button class="cus-signup-submit-button cus-button" id="signup-modal-insert">
							sign up
						</button>
						<button class="cus-signup-submit-button cus-button cus-modal-close-button">
							close
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
            $Modal.classList.add('hidden');
            $Modal.classList.remove('current');
        });

        // 회원가입 아이디 체크 이벤트
        this.addEvent('click', '#signup-modal-id-check', async () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            const id = $Modal.querySelector('.id').value;

            if (!id) {
                alert('아이디를 입력하세요');
                return;
            }

            const idPattern = /^[a-zA-Z0-9_]+$/;
            if (!idPattern.test(id)) {
                alert('사용할 수 없는 아이디 입니다');
                return;
            }
            const response = await getId(id);

            if (response.ok) {
                alert('사용 가능 합니다');
            } else {
                // 200번대 제외하고 다 여기서 걸림
                console.log(response.status);
                if (response.status == 400) {
                    alert('아이디에 문제가 있습니다');
                } else if (response.status == 409) {
                    alert('이미 존재하는 아이디 입니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });

        // 회원가입 이메일에 코드 보내는 이벤트
        this.addEvent('click', '#signup-modal-email-send', async () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            const email = $Modal.querySelector('.email').value;

            if (!email) {
                alert('이메일을 입력 하세요');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                alert('형식이 틀립니다');
                return;
            }

            const response = await postEmail({ email });
            if (response.ok) {
                alert('코드를 전송 했습니다');
            } else {
                if (response.status == 400) {
                    alert('이메일을 입력 하세요');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });

        // 이메일 체크 이벤트
        this.addEvent('click', '#signup-modal-email-check', async () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            const email = $Modal.querySelector('.email').value;
            const code = $Modal.querySelector('.code').value;

            console.log(email, code);

            if (!code) {
                alert('값을 입력 하세요');
                return;
            }

            const response = await postCode({ email, code });

            if (response.ok) {
                alert('인증 성공');
            } else {
                if (response.status == 400) {
                    alert('인증 실패');
                } else if (response.status == 404) {
                    alert('세션이 만료 되었습니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });

        // 회원가입 이벤트
        this.addEvent('click', '#signup-modal-insert', async () => {
            const $Modal = this.$target.querySelector('.cus-modal-container.current');
            const id = $Modal.querySelector('.id').value;
            const password = $Modal.querySelector('.password').value;
            const email = $Modal.querySelector('.email').value;

            console.log(id, password, email, '이걸로 회원가입할게');

            if (!id || !password || !email) {
                alert('값을 입력 하세요');
                return;
            }

            const data = {
                id: id,
                password: password,
                email: email,
            };

            const response = await postSignup(data);

            if (response.ok) {
                alert('회원가입 되었습니다');
                $Modal.classList.remove('current');
                $Modal.classList.add('hidden');
            } else {
                if (response.status == 400) {
                    alert('값을 입력 하세요');
                } else if (response.status == 403) {
                    alert('이메일 인증 하세요');
                } else if (response.status == 409) {
                    alert('아이디가 이미 사용중 입니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });
    }
}
