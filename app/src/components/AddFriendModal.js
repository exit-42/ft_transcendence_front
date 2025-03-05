import Component from '../core/Component.js';
import { getFollow, postFollow } from '../api/follow.js';

export default class AddFriendModal extends Component {
    template() {
        const users = this.$state.data
            .map((user) => {
                return `
                    <li class="cus-user" user-id="${user.nickname}">
                        <div class="cus-user-info">
                            <img class="m-auto rounded-circle cus-friend-picture" src="${user.imagePath}">
                        </div>
                        <div>${user.nickname}</div>
                        <button class="cus-user-add" id="add-button">add</button>
                    </li>
                `;
            })
            .join('');

        return `
            <div class="cus-modal-container ${this.$state.visible}" id="add-modal">
                <div class="cus-user-modal-content" id="add">
                    <div class="cus-user-search">
                        <input type="text" placeholder="username">
                        <button class="cus-button" id="user-search">
                            search
                        </button>
                    </div>
                    <div class="cus-divider"></div>
                    <ul class="cus-users">
                        ${users}
                    </ul>
                    <div class="cus-modal-close">
                        X
                    </div>
                </div>
            </div>
        `;
    }

    setup() {
        this.$state = {
            visible: 'hidden',
            data: [
                // {
                //     nickname: 'dna',
                //     imagePath: 'src/imgs/default.jpeg',
                // },
                // {
                //     nickname: 'klha',
                //     imagePath: 'src/imgs/default.jpeg',
                // },
            ],
        };
    }

    setEvent() {
        this.addEvent('click', '.cus-modal-close', () => {
            const $modal = this.$target.querySelector('.cus-modal-container.current');
            $modal.classList.add('hidden');
            $modal.classList.remove('current');
        });

        this.addEvent('click', '#user-search', async () => {
            const $modal = this.$target.querySelector('#add');
            const name = $modal.querySelector('input').value;

            const idPattern = /^[a-zA-Z0-9_]+$/;
            if (!idPattern.test(name) || name.length < 3 || 15 < name.length) {
                alert('사용할 수 없는 닉네임 입니다');
                return;
            }

            const response = await getFollow(name);

            if (response.ok) {
                this.$state.data = (await response.json()).data;
                this.$state.visible = 'current';
                this.render();
            } else {
                if (response.status == 400) {
                    alert('이름을 입력 하세요');
                } else if (response.status == 401) {
                    alert('토큰이 만료 되었습니다');
                } else if (response.status == 403) {
                    alert('팔로우 할 수 없습니다');
                } else if (response.status == 404) {
                    alert('유저를 찾을 수 없습니다');
                } else if (response.status == 409) {
                    alert('이미 친구 입니다');
                } else if (response.status == 452) {
                    alert('토큰이 만료 되었습니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });

        this.addEvent('click', '.cus-users', async (e) => {
            const clickedUser = e.target.closest('li');
            if (clickedUser) {
                const userName = clickedUser.getAttribute('user-id');
                const response = await postFollow({ name: userName });

                console.log(userName);

                if (response.ok) {
                    alert('친구 추가 했습니다');
                } else {
                    if (response.status == 400) {
                        alert('이름을 입력 하세요');
                    } else if (response.status == 401) {
                        alert('잘못된 요청 입니다');
                    } else if (response.status == 403) {
                        alert('권한이 없습니다');
                    } else if (response.status == 404) {
                        alert('유저를 찾을 수 없습니다');
                    } else if (response.status == 409) {
                        alert('이미 친구입니다');
                    } else if (response.status == 500) {
                        alert('서버 에러');
                    } else {
                        alert('알 수 없는 에러');
                    }
                }

                const $modal = this.$target.querySelector('.cus-modal-container.current');
                $modal.classList.add('hidden');
                $modal.classList.remove('current');
            }
        });
    }
}
