import Component from '../core/Component.js';
import { SelectButtonBox, UserCard } from '../components/index.js';

export default class SelectPage extends Component {
    template() {
        return `
            <div data-component="select" class="d-flex p-5 cus-select-container" style="width: 100%; height: 88vh;">
            </div>
        `;
    }

    mounted() {
        const $selectbuttonbox = this.$target.querySelector('[data-component="select"]');
        new SelectButtonBox($selectbuttonbox);
    }
}
