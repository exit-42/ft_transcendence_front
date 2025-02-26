import Component from '../core/Component.js';
import { getLog } from '../api/log.js';

export default class TournamentLog extends Component {
    template() {
        const gameLogs = [
            {
                players1: 'dogwak',
                players2: 'haejeong',
                players3: 'sham',
                players4: 'dogwak',
                winner1: 'dogwak',
                winner2: 'sham',
                winner3: 'sham',
                score1: '11 : 8',
                score2: '11 : 9',
                score3: '11 : 7',
            },
        ];

        const gameLogItems = gameLogs
            .map(
                (log) => `
				<li class="cus-tournamentlog-list">				
					<div class="cus-username-container">
						<div>${log.players1}</div>
						<div>${log.players2}</div>
					</div>
					<div class="cus-user-picture-container-left">
						<img class="cus-user-picture" src="src/imgs/sample.jpeg"></img>
						<img class="cus-user-picture" src="src/imgs/sample.jpeg"></img>
					</div>
					<div class="cus-side-line-container">
						<div class="cus-side-line cus-red"></div>
						<div>${log.score1}</div>
						<div class="cus-side-line cus-black"></div>
					</div>
					<div class="cus-semi-line-container">
						<div class="cus-semi-line cus-red"></div>
						<div class="cus-semi-line cus-black"></div>
					</div>
					<div class="cus-mid-container">
						<img class="cus-tournament-crown" src="src/imgs/crown.png"></img>
						<div class="cus-mid-line-container">
							<div class="cus-mid-line cus-red"></div>
							<div class="cus-mid-line cus-black"></div>
						</div>
						<div class="cus-tournament-crown">${log.score3}</div>
					</div>
					<div class="cus-semi-line-container">
						<div class="cus-semi-line cus-black"></div>
						<div class="cus-semi-line cus-black"></div>
					</div>
					<div class="cus-side-line-container">
						<div class="cus-side-line cus-black"></div>
						<div>${log.score2}</div>
						<div class="cus-side-line cus-red"></div>
					</div>
					<div class="cus-user-picture-container-right">
						<img class="cus-user-picture" src="src/imgs/sample.jpeg"></img>
						<img class="cus-user-picture" src="src/imgs/sample.jpeg"></img>
					</div>
					<div class="cus-username-container">
						<div>${log.players3}</div>
						<div>${log.players4}</div>
					</div>
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
        // this.$state = 기초값 설정
        this.$state = await (await getLog('tournament', '-1')).json();
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
