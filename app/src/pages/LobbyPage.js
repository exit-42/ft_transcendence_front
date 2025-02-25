import Component from '../core/Component.js';
import { LobbyBox } from '../components/index.js';

export default class LobbyPage extends Component {
    template() {
        return `
            <div data-component="lobby-box"></div>
        `;
    }

    mounted() {
        const $lobbybox = this.$target.querySelector('[data-component="lobby-box"]');
        new LobbyBox($lobbybox);
    }
}
