import Component from '../core/Component.js';
import playGame from '../game/GameModule.js';

export default class RoomFourSocket extends Component {
    template() {
        const player1 = 'heolee';
        const player2 = 'haejeong';

        this.$state.users.user1.name = 'dna';
        this.$state.users.user1.win = 4;
        this.$state.users.user1.lose = 5;

        this.$state.users.user2.name = 'heolee';
        this.$state.users.user2.win = 5;
        this.$state.users.user2.lose = 3;

        this.$state.users.user3.name = 'klha';
        this.$state.users.user3.win = 2;
        this.$state.users.user3.lose = 3;

        this.$state.users.user4.name = 'haejeong';
        this.$state.users.user4.win = 4;
        this.$state.users.user4.lose = 3;

        return `
            <div class="p-5" style="width: 100%; height: 88vh;">
                <div class="cus-tournament-container">
                    <img class="cus-crown" src="src/imgs/crown.png"></img>
                    <div class="cus-column-line"></div>
                    <div class="cus-row-up-line"></div>
                    <div class="cus-column-line-container">
                        <div class="cus-column-line"></div>
                        <div class="cus-column-line"></div>
                    </div>
                    <div class="cus-row-down-line-container">
                        <div class="cus-row-down-line"></div>
                        <div class="cus-row-down-line"></div>
                    </div>
                    <div class="cus-column-line-container">
                        <div class="cus-column-line"></div>
                        <div class="cus-column-line"></div>
                        <div class="cus-column-line"></div>
                        <div class="cus-column-line"></div>
                    </div>
                </div>
                <div class="cus-room-container d-flex justify-content-around" style="width: 100%;">
                    <div class="cus-user-card">
                        <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                            <img class="m-auto rounded-circle cus-user-card-picture" src="src/imgs/sample.jpeg">
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user1.name}</div>
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user1.win}승 ${this.$state.users.user1.lose}패</div>
                        </div>
                    </div>
                    <div class="cus-user-card">
                        <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                            <img class="m-auto rounded-circle cus-user-card-picture" src="src/imgs/sample.jpeg">
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user2.name}</div>
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user2.win}승 ${this.$state.users.user2.lose}패</div>
                        </div>
                    </div>
                    <div class="cus-user-card">
                        <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                            <img class="m-auto rounded-circle cus-user-card-picture" src="src/imgs/sample.jpeg">
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user3.name}</div>
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user3.win}승 ${this.$state.users.user3.lose}패</div>
                        </div>
                    </div>
                    <div class="cus-user-card">
                        <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                            <img class="m-auto rounded-circle cus-user-card-picture" src="src/imgs/sample.jpeg">
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user4.name}</div>
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user4.win}승 ${this.$state.users.user4.lose}패</div>
                        </div>
                    </div>
                </div>
                <div class="d-flex m-5">
                    <button class="m-auto border-0 fs-1 text-white fw-bold rounded-pill cus-button" style="width: 13rem; height: 4rem;" id="exit-button">Exit</button>
                    <button class="m-auto border-0 fs-1 text-white fw-bold rounded-pill cus-button" style="width: 13rem; height: 4rem;" id="start-button">Start</button>
                </div>
            </div>
            <div class="px-5 pb-5" style="width: 100%; height: 88vh;">
                <div class="fs-2 fw-normal d-flex align-items-center justify-content-center" style="width: 100%; height: 10%;">${player1}님과 ${player2}님이 경기중 입니다</div>
                <div data-component="game" class="fs-1 m-auto cus-threejs">
                    <canvas id="canvas" style="width: 100%; height: 100%;"></canvas>
                </div>
            </div>
        `;
    }

    setup() {
        this.$state = {
            game: null,
            users: {
                user1: {
                    name: '',
                    win: 0,
                    lose: 0,
                },
                user2: {
                    name: '',
                    win: 0,
                    lose: 0,
                },
                user3: {
                    name: '',
                    win: 0,
                    lose: 0,
                },
                user4: {
                    name: '',
                    win: 0,
                    lose: 0,
                },
            },
        };
    }

    async gameSetup() {
        this.$state.game = await playGame();
        console.log('소켓 열기');
        // this.socket = new WebSocket('ws://localhost:8000');
    }

    mounted() {}

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
            if (!this.$state.game.you) return;

            const step = 0.15;
            if (event.key === 'ArrowLeft') {
                if (this.$state.game.you.position.x > -1.2) {
                    this.$state.game.you.position.x -= step;

                    // // 뭐라뭐라 보냄
                    // this.socket.send(
                    //     JSON.stringify({
                    //         // type: 'move',
                    //         // player: 'you',
                    //         // position: this.$state.game.you.position
                    //     }),
                    // );
                }
            } else if (event.key === 'ArrowRight') {
                if (this.$state.game.you.position.x < 1.2) {
                    this.$state.game.you.position.x += step;

                    // // 뭐라뭐라 보냄
                    // this.socket.send(
                    //     JSON.stringify({
                    //         // type: 'move',
                    //         // player: 'you',
                    //         // position: this.$state.game.you.position
                    //     }),
                    // );
                }
            }
        });

        this.addEvent('click', '#exit-button', () => {
            window.location.hash = '/lobby';
        });

        this.addEvent('click', '#start-button', () => {
            window.location.hash = '/game';
        });
    }
}
