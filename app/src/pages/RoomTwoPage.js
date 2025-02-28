import Component from '../core/Component.js';
import { RoomTwoSocket } from '../components/index.js';

export default class RoomTwoPage extends Component {
    template() {
        return `
			<div data-component="socket"></div>
		`;
    }

    mounted() {
        const $socket = this.$target.querySelector('[data-component="socket"]');
        new RoomTwoSocket($socket);
    }
}
