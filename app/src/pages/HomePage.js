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

                <div class="cus-modal-container hidden" id="delete-modal">
                    <div class="cus-user-modal-content" id="delete">   
                        <div class="cus-users"></div>
                        <div class="cus-modal-close">
                            X
                        </div>
                    </div>
                </div>


                <div class="cus-modal-container hidden" id="edit-modal">
                    <div class="cus-edit-modal-content" id="edit">
                        <div class="cus-modal-check" id="edit-id">
                            <input class="cus-username-change-input" type="text" placeholder="username">
                            <button class="cus-button cus-username-change-button" id="username-search">
                                search
                            </button>
                        </div>
                        <div class="mb-4">사용 가능합니다</div>
                        <button class="cus-button cus-new-image mb-5" id="new-image">
                            new image
                        </button>
                        <button class="cus-button cus-submit" id="submit">
                            submit
                        </button>
                        <div class="cus-modal-close">
                            X
                        </div>
                    </div>     
                </div>
            </div>
        `;
    }

    mounted() {
        const $usercard = this.$target.querySelector('[data-component="usercard"]');
        new UserCard($usercard);
        renderFriendList(mockData, '#add');
        renderFriendList(mockData, '#delete');
    }

    setEvent() {
        // "gamelog" 버튼 클릭 시
        this.addEvent('click', '#gamelog-button', () => {
            window.location.hash = '/gamelog'; // gamelog 페이지로 이동
        });

        // "lobby" 버튼 클릭 시
        this.addEvent('click', '#lobby-button', () => {
            window.location.hash = '/lobby'; // lobby 페이지로 이동
        });

        // "Select" 버튼 클릭 시
        this.addEvent('click', '#select-button', () => {
            window.location.hash = '/select'; // select 페이지로 이동
        });

        this.addEvent('click', '#add-button', () => {
            const $modal = this.$target.querySelector('#add-modal');
            $modal.classList.remove('hidden');
            $modal.classList.add('current');
        });

        this.addEvent('click', '#delete-button', () => {
            const $modal = this.$target.querySelector('#delete-modal');
            $modal.classList.remove('hidden');
            $modal.classList.add('current');
        });

        this.addEvent('click', '#edit-button', () => {
            const $modal = this.$target.querySelector('#edit-modal');
            $modal.classList.remove('hidden');
            $modal.classList.add('current');

            const $dup = this.$target.querySelector('#id-dup');
            if ($dup) {
                $dup.innerHTML = '';
            }
        });

        this.addEvent('click', '.cus-modal-close', () => {
            const $modal = this.$target.querySelector('.cus-modal-container.current');
            $modal.classList.add('hidden');
            $modal.classList.remove('current');
        });

        this.addEvent('click', '#user-search', () => {
            const $modal = this.$target.querySelector('#add');
            const $input = $modal.querySelector('input');
            console.log('user-search click : ', $input.value);
            // 서버에 유저 검색 요청
        });

        this.addEvent('click', '#username-search', () => {
            // const $modal = this.$target.querySelector('#edit');
            // const $input = $modal.querySelector('input');
            // console.log('username-search click : ', $input.value);

            // // 서버에 유저 검색 요청

            // const $editId = this.$target.querySelector('#edit-id');
            // const $dup = $editId.querySelector('#id-dup');
            // if (!$dup) {
            //     const $newDiv = document.createElement('div');
            //     $newDiv.id = 'id-dup';
            //     $newDiv.innerHTML = $input.value + '는 사용 가능합니다.';
            //     $editId.appendChild($newDiv);
            // }
            // $dup.innerHTML = $input.value + '는 사용 가능합니다.';
        });
    }
}
