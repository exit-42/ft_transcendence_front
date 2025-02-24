import Component from '../core/Component.js';
import { RoomFourSocket } from '../components/index.js';

export default class RoomFourPage extends Component {
    template() {
        return `
			<div data-component="socket"></div>
		`;
    }

    mounted() {
        const $socket = this.$target.querySelector('[data-component="socket"]');
        new RoomFourSocket($socket);
    }
}
