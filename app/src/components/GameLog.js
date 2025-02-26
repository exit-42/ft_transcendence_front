import Component from '../core/Component.js';
import { getLog } from '../api/log.js';

export default class GameLog extends Component {
    template() {
        const gameLogItems = this.$state.games
            .map((log) => {
                if (!log || !log.matches || !log.matches[0]) {
                    return ``;
                }
                return `
                    <li class="d-flex mt-3 mb-3 p-4 border-0 fs-3 text-white fw-bold rounded-pill justify-content-between align-items-center"
                        style="width: 80%; height: 7rem; background-color: rgba(14, 180, 252, 0.6);">
                        <div class="my-auto">${log.matches[0].playerA} VS ${log.matches[0].playerB}</div>
                        <div class="my-auto">Winner : ${log.matches[0].scoreA > log.matches[0].scoreB ? log.matches[0].playerA : log.matches[0].playerB}</div>
                        <div class="my-auto">${log.matches[0].scoreA} : ${log.matches[0].scoreB}</div>					
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

        const response = await getLog('normal', '-1');
        if (response.ok) {
            this.$state = await response.json();
            // console.log(this.$state);
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
            const response = await getLog('normal', `${this.$state.next_cursor}`);
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
