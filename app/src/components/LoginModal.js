import Component from '../core/Component.js';

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
			$Modal.classList.add('hidden');
			$Modal.classList.remove('current');
		});

		// 로그인 요청 이벤트
		this.addEvent('click', '#login-modal-insert', () => {
			const $Modal = this.$target.querySelector('.cus-modal-container');
			const id = $Modal.querySelector('.id').value;
			const password = $Modal.querySelector('.password').value;
			console.log(id, password, "로그인 할게");

			const $Input = this.$target.querySelector('.cus-modal-check');

			$Input.classList.remove('hidden');
			$Input.classList.add('current');

			// $Modal.classList.remove('current');
			// $Modal.classList.add('hidden');
		});
	}
}
