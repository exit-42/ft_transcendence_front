import Component from '../core/Component.js';

export default class EditUserModal extends Component {
    template() {
        return `
			<div class="cus-modal-container hidden" id="edit-modal">
				<div class="cus-edit-modal-content" id="edit">
					<div class="cus-modal-check" id="edit-id">
						<input class="cus-username-change-input" type="text" placeholder="username">
						<button class="cus-button cus-username-change-button" id="username-search">
							change
						</button>
					</div>
					<button class="cus-button cus-new-image" id="new-image">
						new image
					</button>
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

        this.addEvent('click', '#username-search', () => {
            // const $modal = this.$target.querySelector('#edit');
            // const $input = $modal.querySelector('input');
            // console.log('username-search click : ', $input.value);
            // // 서버에 유저 검색 요청
            // const $editId = this.$target.querySelector('#edit-id');
            // const $dup = $editId.querySelector('#id-dup');
            // if (!$dup) {
            //	 const $newDiv = document.createElement('div');
            //	 $newDiv.id = 'id-dup';
            //	 $newDiv.innerHTML = $input.value + '는 사용 가능합니다.';
            //	 $editId.appendChild($newDiv);
            // }
            // $dup.innerHTML = $input.value + '는 사용 가능합니다.';
        });
    }
}
