import Component from '../core/Component.js';
import { AddFriendModal, DeleteFriendModal } from './index.js';

export default class FriendListBox extends Component {
    template() {
        return `
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
            <div data-component="addfriend-modal"></div>

			<div data-component="deletefriend-modal"></div>
        `;
    }

    mounted() {
        const $addfriendmodal = this.$target.querySelector('[data-component="addfriend-modal"]');
        new AddFriendModal($addfriendmodal);

        const $deletefriendmodal = this.$target.querySelector('[data-component="deletefriend-modal"]');
        new DeleteFriendModal($deletefriendmodal);
    }

    setEvent() {
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
    }
}
