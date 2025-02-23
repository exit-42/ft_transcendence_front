import Component from '../core/Component.js';
import { EditUserModal } from './index.js';

export default class HomeButtonBox extends Component {
    template() {
        return `
			<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="gamelog-button">game log</button>
			<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="lobby-button">lobby</button>
			<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="select-button">make room</button>
			<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="edit-button">edit ID</button>
			<button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button cus-delete-button" id="select-button">delete ID</button>				
            <div data-component="edit-modal"></div>
        `;
    }

    mounted() {
        const $editmodal = this.$target.querySelector('[data-component="edit-modal"]');
        new EditUserModal($editmodal);
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
