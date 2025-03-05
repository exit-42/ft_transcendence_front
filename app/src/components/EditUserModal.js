import Component from '../core/Component.js';
import { patchNickname, postImage } from '../api/account.js';

export default class EditUserModal extends Component {
    template() {
        return `
            <div class="cus-modal-container hidden" id="edit-modal">
                <div class="cus-edit-modal-content" id="edit">
                    <div class="cus-modal-check" id="edit-id">
                        <input class="cus-username-change-input" type="text" placeholder="username">
                        <button class="cus-button cus-username-change-button" id="username-change">
                            change
                        </button>
                    </div>
                    <button class="cus-button cus-new-image" id="new-image">
                        new image
                    </button>
                    <input type="file" id="image-input" class="hidden" accept="image/*">
                    <div class="cus-modal-close">
                        X
                    </div>
                </div>   
            </div>
        `;
    }

    setEvent() {
        this.addEvent('click', '.cus-modal-close', () => {
            const $modal = this.$target.querySelector('.cus-modal-container.current');
            $modal.classList.add('hidden');
            $modal.classList.remove('current');
        });

        this.addEvent('click', '#username-change', async () => {
            const $modal = this.$target.querySelector('#edit');
            const nickname = $modal.querySelector('input').value;

            const idPattern = /^[a-zA-Z0-9_]+$/;
            if (!idPattern.test(nickname) || nickname.length < 3 || 15 < nickname.length) {
                alert('사용할 수 없는 닉네임 입니다');
                return;
            }

            const data = {
                name: nickname,
            };
            const response = await patchNickname(data);

            if (response.ok) {
                alert('닉네임을 바꿨습니다');
            } else {
                if (response.status == 401) {
                    alert('잘못된 요청 입니다');
                } else if (response.status == 452) {
                    alert('토큰이 만료 되었습니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }

            const $close = this.$target.querySelector('.cus-modal-container.current');
            $close.classList.add('hidden');
            $close.classList.remove('current');
        });

        this.addEvent('click', '#new-image', () => {
            const imageInput = this.$target.querySelector('#image-input');
            imageInput.click();
        });

        this.addEvent('change', '#image-input', async (event) => {
            const file = event.target.files[0];
            if (!file) {
                return alert('이미지를 선택하세요');
            }

            const formData = new FormData();
            formData.append('profile_image', file);

            const response = await postImage(formData);

            if (response.ok) {
                alert('이미지가 업로드 되었습니다');
            } else {
                if (response.status == 400) {
                    alert('파일 형식이 잘못 되었습니다');
                } else if (response.status == 401) {
                    alert('잘못된 접근 입니다');
                } else if (response.status == 452) {
                    alert('토큰이 만료 되었습니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }

            const $close = this.$target.querySelector('.cus-modal-container.current');
            $close.classList.add('hidden');
            $close.classList.remove('current');
        });
    }
}
