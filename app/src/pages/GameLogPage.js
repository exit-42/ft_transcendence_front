
import Component from '../core/Component.js';

export default class GameLogPage extends Component {
    template() {
        // 객체 배열 정의
        const gameLogs = [
            { players: 'heolee VS haejeong', winner: 'heolee', score: '11 : 8' },
            { players: 'sangyhan VS haejeong', winner: 'haejeong', score: '8 : 11' },
            { players: 'sham VS haejeong', winner: 'sham', score: '11 : 7' }
        ];

        // 게임 로그를 반복적으로 렌더링
        const gameLogItems = gameLogs.map(log => `
            <li class="d-flex m-4 p-4 border-0 fs-3 text-white fw-bold rounded-pill justify-content-between align-items-center"
                style="width: 80%; height: 7rem; background-color: rgba(14, 180, 252, 0.6);">
                <div class="my-auto">${log.players}</div>
                <div class="my-auto">Winner : ${log.winner}</div>
                <div class="my-auto">${log.score}</div>
            </li>
        `).join('');

        return `
            <ul class="d-flex flex-column align-items-center p-5 list-unstyled" style="width: 100%; height: 88vh;">
                ${gameLogItems}
            </ul>
        `;
    }

}
