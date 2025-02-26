import Component from '../core/Component.js';
import { getLog } from '../api/log.js';

export default class GameLog extends Component {
    template() {
        const gameLogs = [
            {
                players: 'heolee VS haejeong',
                winner: 'heolee',
                score: '11 : 8',
            },
            {
                players: 'sangyhan VS haejeong',
                winner: 'haejeong',
                score: '8 : 11',
            },
            {
                players: 'sham VS haejeong',
                winner: 'sham',
                score: '11 : 7',
            },
        ];

        const gameLogItems = gameLogs
            .map(
                (log) => `
				<li class="d-flex mt-3 mb-3 p-4 border-0 fs-3 text-white fw-bold rounded-pill justify-content-between align-items-center"
					style="width: 80%; height: 7rem; background-color: rgba(14, 180, 252, 0.6);">
					<div class="my-auto">${log.players}</div>
					<div class="my-auto">Winner : ${log.winner}</div>
					<div class="my-auto">${log.score}</div>					
				</li>
			`,
            )
            .join('');

        return `
			<ul class="d-flex flex-column align-items-center list-unstyled" style="width: 100%;">
				${gameLogItems}
			</ul>
			<div class="d-flex justify-content-center" style="width: 100%;">
				<button id="loadMoreBtn" class="btn btn-primary">Load More</button>
			</div>
		`;
    }

    async setup() {
        // 기초설정필요
        this.$state = await (await getLog('normal', '-1')).json();
        console.log(this.$state);
        this.render();
    }

    setEvent() {
        this.addEvent('click', '#loadMoreBtn', async () => {
            this.$state = await (await getLog('normal', '0')).json();
            console.log(this.$state);
            this.render();
        });
    }
}
