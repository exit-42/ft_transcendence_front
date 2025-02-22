import Component from '../core/Component.js';
import { GameLog, TournamentLog } from '../components/index.js';

export default class GameLogPage extends Component {
    template() {
        return `
			<div class="d-flex justify-content-evenly mt-4">
				<button class="border-0 fs-4 text-white fw-bold rounded-pill cus-mode-button cus-button" id="gamelog-button">1 VS 1</button>
        		<button class="border-0 fs-4 text-white fw-bold rounded-pill cus-mode-button cus-button" id="tournamentlog-button">Tournament</button>
			</div>
			<div data-component="gamelog"></div>
			<div data-component="tournamentlog"></div>
		`;
    }

    mounted() {
        const $gamelog = this.$target.querySelector('[data-component="gamelog"]');
        const $tournamentlog = this.$target.querySelector('[data-component="tournamentlog"]');
        this.gameLogInstance = new GameLog($gamelog);
        this.tournamentLogInstance = new TournamentLog($tournamentlog);

        this.toggleComponent('gamelog');
    }

    setEvent() {
        this.addEvent('click', '#gamelog-button', () => {
            this.toggleComponent('gamelog');
        });

        this.addEvent('click', '#tournamentlog-button', () => {
            this.toggleComponent('tournamentlog');
        });
    }

    toggleComponent(componentType) {
        const $gamelog = this.$target.querySelector('[data-component="gamelog"]');
        const $tournamentlog = this.$target.querySelector('[data-component="tournamentlog"]');

        if (componentType === 'gamelog') {
            $gamelog.classList.remove('d-none');
            $tournamentlog.classList.add('d-none');
        } else if (componentType === 'tournamentlog') {
            $gamelog.classList.add('d-none');
            $tournamentlog.classList.remove('d-none');
        }
    }
}
