import Component from '../core/Component.js';
import { UserCard, EditUserModal, AddFriendModal, DeleteFriendModal } from '../components/index.js';

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

export default class HomePage extends Component {
	template() {
		return `
			<div class="cus-home-container d-flex">
				<div class="d-flex flex-column cus-friend-list-container">
					<div class="cus-friend-button-container">
						<button id="add-button" class="my-1 mx-auto border-0 rounded-pill cus-friend-button">add</button>
						<button id="delete-button" class="my-1 mx-auto border-0 rounded-pill cus-friend-button">delete</button>
					</div>
					<ul class="cus-friend-list">
						<li class="cus-friend cus-friend-on"></li>
						<li class="cus-friend"></li>
						<li class="cus-friend"></li>
						<li class="cus-friend"></li>
						<li class="cus-friend"></li>
						<li class="cus-friend"></li>
					<ul>
				</div>

				<div class="d-flex flex-column cus-home-card-container">
					<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="gamelog-button">game log</button>
					<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="lobby-button">lobby</button>
					<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="select-button">make room</button>
					<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="edit-button">edit ID</button>
					<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button cus-delete-button" id="select-button">delete ID</button>
				</div>

				<div class="d-flex cus-home-card-container">
					<div data-component="usercard" class="cus-home-card m-auto">
					</div>
				</div>

				<div data-component="addfriend-modal"></div>

				<div data-component="deletefriend-modal"></div>

				<div data-component="edit-modal"></div>

			</div>
		`;
	}

	mounted() {
		const $usercard = this.$target.querySelector('[data-component="usercard"]');
		new UserCard($usercard);

		const $editmodal = this.$target.querySelector('[data-component="edit-modal"]');
		new EditUserModal($editmodal);

		const $addfriendmodal = this.$target.querySelector('[data-component="addfriend-modal"]');
		new  AddFriendModal($addfriendmodal);

		const $deletefriendmodal = this.$target.querySelector('[data-component="deletefriend-modal"]');
		new  DeleteFriendModal($deletefriendmodal);
	}

	setEvent() {
		// gamelog 버튼 클릭 이벤트
		this.addEvent('click', '#gamelog-button', () => {
			window.location.hash = '/gamelog';
		});

		// lobby 버튼 클릭 이벤트
		this.addEvent('click', '#lobby-button', () => {
			window.location.hash = '/lobby';
		});

		// Select 버튼 클릭 이벤트
		this.addEvent('click', '#select-button', () => {
			window.location.hash = '/select';
		});

		// add 버튼 클릭 이벤트
		this.addEvent('click', '#add-button', () => {
			const $modal = this.$target.querySelector('#add-modal');
			$modal.classList.remove('hidden');
			$modal.classList.add('current');
		});

		// delete 버튼 클릭 이벤트
		this.addEvent('click', '#delete-button', () => {
			const $modal = this.$target.querySelector('#delete-modal');
			$modal.classList.remove('hidden');
			$modal.classList.add('current');
		});

		// edit 버튼 클릭 이벤트
		this.addEvent('click', '#edit-button', () => {
			const $modal = this.$target.querySelector('#edit-modal');
			$modal.classList.remove('hidden');
			$modal.classList.add('current');

			const $dup = this.$target.querySelector('#id-dup');
			if ($dup) {
				$dup.innerHTML = '';
			}
		});
	}
}
