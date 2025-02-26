import Component from '../core/Component.js';
import { getLog } from '../api/log.js';

export default class TournamentLog extends Component {
    template() {
        const gameLogItems = this.$state.games
            .map((log) => {
                if (!log || !log.matches || !log.matches[0]) {
                    return ``;
                }
                return `
					<li class="cus-tournamentlog-list">				
						<div class="cus-username-container">
							<div>${log.matches[0].playerA}</div>
							<div>${log.matches[0].playerB}</div>
						</div>
						<div class="cus-user-picture-container-left">
							<img class="cus-user-picture" src="${log.matches[0].playerAimagePath}"></img>
							<img class="cus-user-picture" src="${log.matches[0].playerBimagePath}"></img>
						</div>
						<div class="cus-side-line-container">
							<div class="cus-side-line ${log.matches[0].scoreA > log.matches[0].scoreB ? 'cus-red' : 'cus-black'}"></div>
							<div>${log.matches[0].scoreA} : ${log.matches[0].scoreB}</div>
							<div class="cus-side-line ${log.matches[0].scoreA > log.matches[0].scoreB ? 'cus-black' : 'cus-red'}"></div>
						</div>
						<div class="cus-semi-line-container">
							<div class="cus-semi-line ${log.matches[0].scoreA > log.matches[0].scoreB ? 'cus-red' : 'cus-black'}"></div>
							<div class="cus-semi-line ${log.matches[0].scoreA > log.matches[0].scoreB ? 'cus-black' : 'cus-red'}"></div>
						</div>
						<div class="cus-mid-container">
							<img class="cus-tournament-crown" src="src/imgs/crown.png"></img>
							<div class="cus-mid-line-container">
								<div class="cus-mid-line ${log.matches[2].scoreA > log.matches[2].scoreB ? 'cus-red' : 'cus-black'}"></div>
								<div class="cus-mid-line ${log.matches[2].scoreA > log.matches[2].scoreB ? 'cus-black' : 'cus-red'}"></div>
							</div>
							<div class="cus-tournament-crown">${log.matches[2].scoreA} : ${log.matches[2].scoreB}</div>
						</div>
						<div class="cus-semi-line-container">
							<div class="cus-semi-line ${log.matches[1].scoreA > log.matches[1].scoreB ? 'cus-red' : 'cus-black'}"></div>
							<div class="cus-semi-line ${log.matches[1].scoreA > log.matches[1].scoreB ? 'cus-black' : 'cus-red'}"></div>
						</div>
						<div class="cus-side-line-container">
							<div class="cus-side-line ${log.matches[1].scoreA > log.matches[1].scoreB ? 'cus-red' : 'cus-black'}"></div>
							<div>${log.matches[1].scoreA} : ${log.matches[1].scoreB}</div>
							<div class="cus-side-line ${log.matches[1].scoreA > log.matches[1].scoreB ? 'cus-black' : 'cus-red'}"></div>
						</div>
						<div class="cus-user-picture-container-right">
							<img class="cus-user-picture" src="${log.matches[1].playerAimagePath}"></img>
							<img class="cus-user-picture" src="${log.matches[1].playerBimagePath}"></img>
						</div>
						<div class="cus-username-container">
							<div>${log.matches[1].playerA}</div>
							<div>${log.matches[1].playerB}</div>
						</div>
					</li>
			`;
            })
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
        this.$state = {
            games: [],
        };
        const response = await getLog('tournament', '-1');

        if (response.ok) {
            this.$state = await response.json();
            this.render();
        } else if (response.ok == 400) {
            alert('잘못된 요청 입니다');
        } else if (response.ok == 401) {
            alert('잘못된 접근 입니다');
        } else if (response.ok == 500) {
            alert('서버 에러');
        } else {
            alert('알 수 없는 에러');
        }
    }

    setEvent() {
        this.addEvent('click', '#loadMoreBtn', async () => {
            if (this.$state.next_cursor == null) {
                return;
            }
            const response = await getLog('tournament', `${this.$state.next_cursor}`);
            if (response.ok) {
                const responseData = await response.json();
                this.$state.games = [...this.$state.games, ...responseData.games];
                this.$state.next_cursor = responseData.next_cursor;
                this.render();
            } else if (response.ok == 400) {
                alert('잘못된 요청 입니다');
            } else if (response.ok == 401) {
                alert('잘못된 접근 입니다');
            } else if (response.ok == 500) {
                alert('서버 에러');
            } else {
                alert('알 수 없는 에러');
            }
        });
    }
}
