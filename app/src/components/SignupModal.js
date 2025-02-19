import Component from '../core/Component.js';

export default class LoginModal extends Component {
	template() {

		return `
			<div class="cus-modal-container hidden" id="signup-modal">
				<div class="cus-signup-modal-content" id="signup">
					<div class="cus-modal-check">
						<input class="id cus-signup-up-input" type="text" placeholder="ID">
						<button class="cus-signupcheck-button cus-button" id="signup-modal-id-check">
							check
						</button>
					</div>
					<div class="mb-4">사용 가능합니다</div>
					<div class="cus-modal-check">
						<input class="email cus-signup-up-input" type="text" placeholder="email">
						<button class="cus-signupcheck-button cus-button" id="signup-modal-email-check">
							send							
						</button>
					</div>
					<div class="mb-4">보냈습니다</div>
					<input class="code cus-signup-down-input mb-5" type="text" placeholder="코드를 입력하세요">
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
		this.addEvent('click', '#signup-modal-id-check', () => {
			const $Modal = this.$target.querySelector('.cus-modal-container.current');
			const id = $Modal.querySelector('.id');
			console.log(id.value, "아이디 체크할게");
			id.value = '';
		});

		// 회원가입 이메일에 코드 보내는 이벤트
		this.addEvent('click', '#signup-modal-email-check', () => {
			const $Modal = this.$target.querySelector('.cus-modal-container.current');
			const email = $Modal.querySelector('.email');
			console.log(email.value, "로 이메일 보낼게");
			email.value = '';
		});

		// 회원가입 요청 이벤트
		this.addEvent('click', '#signup-modal-insert', () => {
			const $Modal = this.$target.querySelector('.cus-modal-container.current');
			const id = $Modal.querySelector('.id');
			const password = $Modal.querySelector('.password');
			const email = $Modal.querySelector('.email');
			const code = $Modal.querySelector('.code');

			console.log(id.value, password.value, email.value, code.value, "이걸로 회원가입할게");

			$Modal.classList.remove('current');
			$Modal.classList.add('hidden');
		});
	}
}
