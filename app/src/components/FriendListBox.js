import Component from '../core/Component.js';
import { AddFriendModal, DeleteFriendModal } from './index.js';
import { getFolloweList } from '../api/follow.js';

export default class FriendListBox extends Component {
    template() {
        const friendList = this.$state
            .map((friend) => {
                return `
                <li class="cus-friend">
                    <img class="m-auto rounded-circle cus-friend-picture" src="${friend.imagePath}">
                </li>
                <div class="d-flex justify-content-center">${friend.nickname}</div>
            `;
            })
            .join('');

        return `
            <div class="cus-friend-button-container">
                <button id="add-button" class="my-1 mx-auto border-0 rounded-pill cus-friend-button">add</button>
                <button id="delete-button" class="my-1 mx-auto border-0 rounded-pill cus-friend-button">delete</button>
            </div>
            <ul class="cus-friend-list">
                <li class="cus-friend">
                    <img class="m-auto rounded-circle cus-friend-picture" src="src/imgs/default.jpeg">
                </li>
                <div class="d-flex justify-content-center">friend</div>
                ${friendList}

            <ul>
            <div data-component="addfriend-modal"></div>

            <div data-component="deletefriend-modal"></div>
        `;
    }

    async setup() {
        this.$state = [];

        const response = await getFolloweList();
        if (response.ok) {
            this.$state = (await response.json()).data;
            // console.log(this.$state);
            this.render();
        } else if (response.ok == 400) {
            alert('잘못된 요청 입니다');
        } else if (response.ok == 401) {
            alert('잘못된 접근 입니다');
        } else if (response.ok == 452) {
            alert('토큰이 만료 되었습니다');
        } else if (response.ok == 500) {
            alert('서버 에러');
        } else {
            alert('알 수 없는 에러');
        }
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
