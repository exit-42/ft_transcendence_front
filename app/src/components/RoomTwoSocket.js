import Component from '../core/Component.js';
import playGame from '../game/GameModule.js';
import { postLogin } from '../api/account.js';

export default class RoomTwoSocket extends Component {
    template() {
        const player1 = 'heolee';
        const player2 = 'haejeong';

        return `
            <div class="p-5" style="width: 100%; height: 88vh;">
                <div class="cus-room-container d-flex justify-content-around" style="width: 100%;">
                    <div class="cus-user-card">
                        <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                            <img class="m-auto rounded-circle cus-user-card-picture" src="${this.$state.users.user1.imgPath}">
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user1.name}</div>
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user1.win}승 ${this.$state.users.user1.lose}패</div>
                        </div>
                    </div>
                    <div class="cus-user-card">
                        <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                            <img class="m-auto rounded-circle cus-user-card-picture" src="${this.$state.users.user2.imgPath}">
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user2.name}</div>
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user2.win}승 ${this.$state.users.user2.lose}패</div>
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
        console.log(window.myGlobalVar);
        this.$state = {
            game: null,
            users: {
                user1: {
                    name: '대기 중',
                    imgPath: 'src/imgs/default.jpeg',
                    win: 1,
                    lose: 0,
                },
                user2: {
                    name: '대기 중',
                    imgPath: 'src/imgs/default.jpeg',
                    win: 0,
                    lose: 0,
                },
            },
        };
    }

    async gameSetup() {
        this.$state.game = await playGame();
        console.log('소켓 열기');
        const user = await postLogin();
        const userJson = await user.json();
        if (!userJson) {
            return;
        }
        this.socket = new WebSocket(`ws://localhost:${window.myGlobalVar}?username=${userJson.nickname}`);
        // 메시지 수신
        this.socket.onmessage = (event) => {
            console.log(event.data);
            const msg = JSON.parse(event.data);
            if (msg && msg.type === 'join' && msg['data']) {
                // 1번부터 4번까지 순서대로 업데이트
                let i = 1;
                for (let key in msg['data']) {
                    const playerKey = key;
                    if (msg['data'][playerKey]) {
                        // key의 이름을 그대로 사용자 이름으로 사용하거나, 다른 로직이 필요하면 수정
                        this.$state.users[`user${i}`].name = playerKey;
                        this.$state.users[`user${i}`].imgPath = msg.data[playerKey].img_path;
                        this.$state.users[`user${i}`].win = msg.data[playerKey].winCnt;
                        this.$state.users[`user${i}`].lose = msg.data[playerKey].loseCnt;
                    }
                    i++;
                }
                // 상태 업데이트 후 화면을 다시 렌더링
                this.render();
            }
        };

        // 소켓 에러 발생
        this.socket.onerror = (error) => {
            console.error(error);
        };
        window.addEventListener('keydown', (event) => {
            if (!this.$state.game.you) return;

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
            const step = 0.15;
        });
    }

    mounted() {}

    dispose() {
        console.log('소켓 닫기');
        // if (this.socket) {
        //     this.socket.close();
        // }
    }

    setEvent() {
        window.addEventListener('keydown', (event) => {
            if (!this.$state.game.you) return;

            const step = 0.15;
        });

        this.addEvent('click', '#exit-button', () => {
            window.location.hash = '/lobby';
        });

        this.addEvent('click', '#start-button', () => {
            window.location.hash = '/game';
        });
    }
}
