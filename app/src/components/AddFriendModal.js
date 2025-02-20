import Component from '../core/Component.js';

const mockData = ['heelee', 'heokee', 'heoheo', 'hohoho'];

const renderFriendList = (data, selector) => {
	const $addModal = document.querySelector(selector);
	const buttonType = selector.slice(1);
	const $users = $addModal.querySelector('.cus-users');
	data.forEach((name) => {
		const $user = document.createElement('div');
		$user.className = 'cus-user';
		$user.innerHTML = `
			<div class="cus-user-info">
				${name}
			</div>
			<button class="cus-user-${buttonType}">${buttonType}</button>
		`;
		// cus-user-add에 이벤트 추가
		if (buttonType === 'add') {
			$user.querySelector('.cus-user-add').addEventListener('click', () => {
				console.log('add friend : ', name);
			});
		}
		// cus-user-delete에 이벤트 추가
		if (buttonType === 'delete') {
			$user.querySelector('.cus-user-delete').addEventListener('click', () => {
				console.log('delete friend : ', name);
			});
		}

		$users.appendChild($user);
	});
};

export default class AddFriendModal extends Component {
	template() {

		return `
			<div class="cus-modal-container hidden" id="add-modal">
				<div class="cus-user-modal-content" id="add">
					<div>
						<input type="text" placeholder="username">
						<button class="cus-button" id="user-search">
							search
						</button>
					</div>
					<div class="divider"></div>
					<div class="cus-users"></div>
					<div class="cus-modal-close">
						X
					</div>					
				</div>
			</div>
		`;
	}

	mounted() {
			renderFriendList(mockData, '#add');
		}

	setEvent() {
		this.addEvent('click', '.cus-modal-close', () => {
			const $modal = this.$target.querySelector('.cus-modal-container.current');
			$modal.classList.add('hidden');
			$modal.classList.remove('current');
		});

		// 서버에 유저 검색 요청
		this.addEvent('click', '#user-search', () => {
			const $modal = this.$target.querySelector('#add');
			const $input = $modal.querySelector('input');
			console.log("이름 검색할게 : ", $input.value);
		});
	}
}
