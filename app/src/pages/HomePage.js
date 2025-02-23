import Component from '../core/Component.js';
import { FriendListBox, HomeButtonBox, UserCard } from '../components/index.js';

export default class HomePage extends Component {
    template() {
        return `
			<div class="cus-home-container d-flex">
				<div data-component="friend-list-box" class="d-flex flex-column cus-friend-list-container"></div>

                <div data-component="home-button-box" class="d-flex flex-column cus-home-card-container"></div>

				<div class="d-flex cus-home-card-container">
					<div data-component="usercard" class="cus-home-card m-auto">
					</div>
				</div>

			</div>
		`;
    }

    mounted() {
        const $friendlistbox = this.$target.querySelector('[data-component="friend-list-box"]');
        new FriendListBox($friendlistbox);

        const $homebuttonbox = this.$target.querySelector('[data-component="home-button-box"]');
        new HomeButtonBox($homebuttonbox);

        const $usercard = this.$target.querySelector('[data-component="usercard"]');
        new UserCard($usercard);
    }
}
