import Component from '../core/Component.js';
import { GameLogBox } from '../components/index.js';

export default class GameLogPage extends Component {
    template() {
        return `
            <div data-component="game-log-box"></div>
		`;
    }

    mounted() {
        const $gamelogbox = this.$target.querySelector('[data-component="game-log-box"]');
        new GameLogBox($gamelogbox);
    }
}
