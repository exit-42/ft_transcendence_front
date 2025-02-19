import Component from '../core/Component.js';
import { LoginModal, SignupModal } from '../components/index.js';

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
				<div data-component="login-modal"></div>
				<div data-component="signup-modal"></div>
			</div>
		`;
	}

	mounted() {
		const $loginmodal = this.$target.querySelector('[data-component="login-modal"]');
		new LoginModal($loginmodal);
		const $signupmodal = this.$target.querySelector('[data-component="signup-modal"]');
		new SignupModal($signupmodal);
	}

	setEvent() {
		// 42로그인 하는 이벤트
		this.addEvent('click', '#login-42-button', () => {
			window.location.hash = '/home'; 
		});

		// 로그인 모달 나오는 이벤트
		this.addEvent('click', '#login-button', () => {
			const $Modal = this.$target.querySelector('#login-modal');
			$Modal.classList.remove('hidden');
			$Modal.classList.add('current');
		});

		// 회원가입 모달 나오는 이벤트
		this.addEvent('click', '#signup-button', () => {
			const $Modal = this.$target.querySelector('#signup-modal');
			$Modal.classList.remove('hidden');
			$Modal.classList.add('current');
		});
	}
}
