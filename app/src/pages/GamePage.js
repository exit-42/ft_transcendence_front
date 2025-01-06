
import Component from '../core/Component.js';
import Game from '../components/Game.js';

export default class GamePage extends Component {
    template() {

        const player1 = 'heolee';
        const player2 = 'haejeong';

        return `
            <div class="px-5 pb-5" style="width: 100%; height: 88vh;">
                <div class="fs-2 fw-normal d-flex align-items-center justify-content-center" style="width: 100%; height: 10%;">${player1}님과 ${player2}님이 경기중 입니다</div>
                <div data-component="game" class="fs-1" style="width: 100%; height: 90%; border: 3px solid black;"></div>
            </div>
        `;
    }

    mounted() {
        const $game = this.$target.querySelector(
            '[data-component="game"]'
        );
        new Game($game);
    }
}
