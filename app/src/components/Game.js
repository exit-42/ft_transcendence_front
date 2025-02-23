import Component from '../core/Component.js';
import playGame from '../game/GameModule.js';

export default class Game extends Component {
    template() {
        return `
            <canvas id="canvas" style="width: 100%; height: 100%;"></canvas>
        `;
    }

    mounted() {
        this.$state = playGame();
        // this.$state.ball.position.set(1, 3, -1);
        // this.$state.you.position.set(1, 1.9, 3.2);
        // this.$state.enemy.position.set(-1, 1.9, -3.2);
        console.log('소켓열기');
    }

    dispose() {
        console.log('소켓닫기');
    }

    setEvent() {
        window.addEventListener('keydown', (event) => {
            if (!this.$state.you) return;

            const step = 0.15;
            if (event.key === 'ArrowLeft') {
                if (this.$state.you.position.x > -1.2) {
                    this.$state.you.position.x -= step;
                }
            } else if (event.key === 'ArrowRight') {
                if (this.$state.you.position.x < 1.2) {
                    this.$state.you.position.x += step;
                }
            }
        });
    }
}
