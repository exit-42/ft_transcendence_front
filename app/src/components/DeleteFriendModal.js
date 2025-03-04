import Component from '../core/Component.js';
import { deleteFollow } from '../api/follow.js';

export default class DeleteFriendModal extends Component {
    template() {
        return `
			<div class="cus-modal-container hidden" id="delete-modal">
				<div class="cus-user-modal-content-delete" id="delete">   
                    <div>
						<input type="text" placeholder="username">
						<button class="cus-button cus-red" id="user-search">
							delete
						</button>
					</div>
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

        this.addEvent('click', '#user-search', async () => {
            const $modal = this.$target.querySelector('#delete');
            const name = $modal.querySelector('input').value;
            // console.log('삭제할게 : ', name);

            const response = await deleteFollow({ name });

            if (response.ok) {
                alert('친구 삭제 했습니다');
            } else {
                if (response.status == 400) {
                    alert('이름을 입력 하세요');
                } else if (response.status == 401) {
                    alert('토큰이 만료 되었습니다');
                } else if (response.status == 404) {
                    alert('유저를 찾을 수 없습니다');
                } else if (response.status == 452) {
                    alert('토큰이 만료 되었습니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });
    }
}
