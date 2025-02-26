import Component from '../core/Component.js';
import { GameLog, TournamentLog } from './index.js';

export default class GameLogBox extends Component {
    template() {
        return `
			<div class="d-flex justify-content-evenly mt-4">
                <button class="border-0 fs-4 text-white fw-bold rounded-pill cus-mode-button cus-button" id="gamelog-button">1 VS 1</button>
                <button class="border-0 fs-4 text-white fw-bold rounded-pill cus-mode-button cus-button" id="tournamentlog-button">Tournament</button>
            </div>
            <div data-component="gamelog" id="gamelog" class="current"></div>
            <div data-component="tournamentlog" id="tournamentlog" class="hidden"></div>
		`;
    }
    mounted() {
        const $gamelog = this.$target.querySelector('[data-component="gamelog"]');
        new GameLog($gamelog);
        const $tournamentlog = this.$target.querySelector('[data-component="tournamentlog"]');
        new TournamentLog($tournamentlog);
    }

    setEvent() {
        this.addEvent('click', '#gamelog-button', () => {
            const $Log = this.$target.querySelector('#gamelog');
            const $TournamentLog = this.$target.querySelector('#tournamentlog');
            $Log.classList.remove('hidden');
            $Log.classList.add('current');
            $TournamentLog.classList.remove('current');
            $TournamentLog.classList.add('hidden');
        });

        this.addEvent('click', '#tournamentlog-button', () => {
            const $Log = this.$target.querySelector('#gamelog');
            const $TournamentLog = this.$target.querySelector('#tournamentlog');
            $Log.classList.remove('current');
            $Log.classList.add('hidden');
            $TournamentLog.classList.remove('hidden');
            $TournamentLog.classList.add('current');
        });
    }
}
