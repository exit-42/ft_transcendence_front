import Component from '../core/Component.js';

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
					<div class="cus-user-picture-container">
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
					<div class="cus-user-picture-container">
						<img class="cus-user-picture" src="src/imgs/sample.jpeg"></img>
						<img class="cus-user-picture" src="src/imgs/sample.jpeg"></img>
					</div>
					<div class="cus-username-container">
						<div>${log.players3}</div>
						<div>${log.players4}</div>
					</div>
				</li>
			`,
		).join('');

		return `
			<ul class="d-flex flex-column align-items-center p-5 list-unstyled" style="width: 100%;">
				${gameLogItems}
			</ul>
		`;
	}
}