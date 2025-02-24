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

        console.log('소켓 열기');
        // this.socket = new WebSocket('ws://localhost:8000');
    }

    dispose() {
        console.log('소켓 닫기');
        // if (this.socket) {
        //     this.socket.close();
        // }
    }

    setEvent() {
        // // 메시지 수신
        // this.socket.onmessage = (event) => {
        //     console.log(event.data);
        // };

        // // 소켓 에러 발생
        // this.socket.onerror = (error) => {
        //     console.error(error);
        // };

        window.addEventListener('keydown', (event) => {
            if (!this.$state.you) return;

            const step = 0.15;
            if (event.key === 'ArrowLeft') {
                if (this.$state.you.position.x > -1.2) {
                    this.$state.you.position.x -= step;

                    // // 뭐라뭐라 보냄
                    // this.socket.send(
                    //     JSON.stringify({
                    //         // type: 'move',
                    //         // player: 'you',
                    //         // position: this.$state.you.position
                    //     }),
                    // );
                }
            } else if (event.key === 'ArrowRight') {
                if (this.$state.you.position.x < 1.2) {
                    this.$state.you.position.x += step;

                    // // 뭐라뭐라 보냄
                    // this.socket.send(
                    //     JSON.stringify({
                    //         // type: 'move',
                    //         // player: 'you',
                    //         // position: this.$state.you.position
                    //     }),
                    // );
                }
            }
        });
    }
}
