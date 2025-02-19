import Component from '../core/Component.js';

export default class SignupModal extends Component {
	template() {

		return `
			<div class="cus-modal-container hidden" id="login-modal">
				<div class="cus-login-modal-content" id="login">
					<input class="id" type="text" placeholder="ID">
					<input class="password" type="text" placeholder="password">
					<div class="cus-buttons">
						<button class="cus-button" id="login-modal-insert">
							log in
						</button>
						<button class="cus-button cus-modal-close-button">
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

		// 로그인 요청 이벤트
		this.addEvent('click', '#login-modal-insert', () => {
			const $Modal = this.$target.querySelector('.cus-modal-container');
			const id = $Modal.querySelector('.id');
			const password = $Modal.querySelector('.password');
			console.log(id.value, password.value, "로그인 할게");
			id.value = '';
			password.value = '';

			$Modal.classList.remove('current');
			$Modal.classList.add('hidden');
		});
	}
}
