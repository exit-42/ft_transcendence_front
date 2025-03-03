import Component from '../core/Component.js';
import playGame from '../game/GameModule.js';
import { postLogin } from '../api/account.js';
import { Announce } from './index.js';

export default class RoomTwoSocket extends Component {
    template() {
        return `
            <div class="p-5 ${this.$state.roomVisible}" style="width: 100%; height: 88vh;">
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
                </div>
            </div>



            <div class="px-5 pb-5 ${this.$state.gameVisible}" style="width: 100%; height: 88vh;">
                <div class="fs-3 d-flex align-items-center justify-content-center" data-component="announce1" style="width: 100%; height: 5%;"></div>
                <div class="fs-3 d-flex align-items-center justify-content-center" data-component="announce2" style="width: 100%; height: 5%;"></div>
                <div data-component="game" class="fs-1 m-auto cus-threejs">
                    <canvas id="canvas" style="width: 100%; height: 100%;"></canvas>
                </div>
            </div>



            <div class="p-5 ${this.$state.resultVisible}" style="width: 100%; height: 88vh;">
                <div class="d-flex flex-column rounded-5 p-3" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.25);">
                    <img class="m-auto" style="width: 14rem; height: 7rem;" src="src/imgs/crown.png">
                    <div class="m-auto rounded-5 d-flex align-items-center justify-content-center" style="width: 22rem; height: 22rem; background-color: rgba(14, 180, 252, 0.6);">
                        <div class="m-auto rounded-circle" style="width: 12rem; height: 12rem; background-color: white"></div>
                    </div>
                    <div class="m-auto fs-1 d-flex align-items-center justify-content-center" style=""> ${this.$state.winner} is winner</div>
                </div>
            </div>
        `;
    }

    setup() {
        console.log(window.myGlobalVar);
        this.$state = {
            you: '',
            isEnenmy: false,
            winner: '',
            roomVisible: 'current',
            gameVisible: 'hidden',
            resultVisible: 'hidden',
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

    async socketSetup() {
        // this.$state.game = await playGame();
        console.log('소켓 열기');
        const user = await postLogin();
        const userJson = await user.json();
        if (!userJson) {
            return;
        }

        this.$state.you = userJson.nickname;
        console.log('state : ', this.$state);
        this.socket = new WebSocket(`wss://localhost:${window.myGlobalVar}?username=${userJson.nickname}`);
        // 메시지 수신
        this.socket.onmessage = async (event) => {
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
            } else if (msg && msg.type === 'start' && msg.player1 && msg.player2) {
                // 잠시후 게임이 시작 됩니다 문구 띄운다
                // 화면 타입을 바꾼다

                this.$state.roomVisible = 'hidden';
                this.$state.gameVisible = 'current';
                this.render();
                new Announce(
                    this.$target.querySelector('[data-component="announce1"]'),
                    `${msg.player1} VS ${msg.player2}`,
                );
                new Announce(this.$target.querySelector('[data-component="announce2"]'), `0 : 0`);
                this.$state.game = await playGame();
                if (msg.player2 == this.$state.you) {
                    this.$state.game.camera.position.set(0, 3, -8);
                    this.$state.game.camera.lookAt(0, 2, 0);
                    this.$state.isEnenmy = true;
                }
            } else if (msg && msg.type === 'play' && msg.ball && msg.player) {
                this.$state.game.ball.position.set(msg.ball[0], msg.ball[1], msg.ball[2]);
                this.$state.game.you.position.x = msg.player[0];
                this.$state.game.enemy.position.x = msg.player[1];
            } else if (msg && msg.type === 'set_result' && msg.win && msg.lose) {
                new Announce(
                    this.$target.querySelector('[data-component="announce2"]'),
                    `${msg.p1_score} : ${msg.p2_score}`,
                );
            } else if (msg && msg.type === 'match_result' && msg.win && msg.lose && msg.p1_score && msg.p2_score) {
                this.$state.resultVisible = 'current';
                this.$state.gameVisible = 'hidden';
                this.$state.winner = msg.win;

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
                if (this.$state.isEnenmy) {
                    this.socket.send(
                        JSON.stringify({
                            type: 'move',
                            dir: 'right',
                        }),
                    );
                } else {
                    this.socket.send(
                        JSON.stringify({
                            type: 'move',
                            dir: 'left',
                        }),
                    );
                }
            } else if (event.key === 'ArrowRight') {
                if (this.$state.isEnenmy) {
                    this.socket.send(
                        JSON.stringify({
                            type: 'move',
                            dir: 'left',
                        }),
                    );
                } else {
                    this.socket.send(
                        JSON.stringify({
                            type: 'move',
                            dir: 'right',
                        }),
                    );
                }
            }
        });
    }

    mounted() {}

    dispose() {
        console.log('소켓 닫기');
        if (this.socket) {
            this.socket.close();
        }
    }

    setEvent() {
        this.addEvent('click', '#exit-button', () => {
            window.location.hash = '/lobby';
        });
    }
}
