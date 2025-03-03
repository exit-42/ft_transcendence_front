import Component from '../core/Component.js';
import playGame from '../game/GameModule.js';
import { postLogin } from '../api/account.js';

export default class RoomFourSocket extends Component {
    template() {
        return `
            <div class="p-5 ${this.$state.roomVisible}" style="width: 100%; height: 88vh;">
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
                    <div class="cus-user-card">
                        <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                            <img class="m-auto rounded-circle cus-user-card-picture" src="${this.$state.users.user3.imgPath}">
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user3.name}</div>
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user3.win}승 ${this.$state.users.user3.lose}패</div>
                        </div>
                    </div>
                    <div class="cus-user-card">
                        <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                            <img class="m-auto rounded-circle cus-user-card-picture" src="${this.$state.users.user4.imgPath}">
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user4.name}</div>
                            <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.users.user4.win}승 ${this.$state.users.user4.lose}패</div>
                        </div>
                    </div>
                </div>
                <div class="d-flex m-5">
                    <button class="m-auto border-0 fs-1 text-white fw-bold rounded-pill cus-button" style="width: 13rem; height: 4rem;" id="exit-button">Exit</button>
                </div>
            </div>


            <div class="px-5 pb-5 ${this.$state.gameVisible}" style="width: 100%; height: 88vh;">
                <div class="fs-2 fw-normal d-flex align-items-center justify-content-center" style="width: 100%; height: 10%;">${this.$state.announce}</div>
                <div data-component="game" class="fs-1 m-auto cus-threejs">
                    <canvas id="canvas" style="width: 100%; height: 100%;"></canvas>
                </div>
            </div>
        `;
    }

    setup() {
        console.log(window.myGlobalVar);
        this.$state = {
            roomVisible: 'current',
            gameVisible: 'hidden',
            announce: '게임 대기중',
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
                user3: {
                    name: '대기 중',
                    imgPath: 'src/imgs/default.jpeg',
                    win: 0,
                    lose: 0,
                },
                user4: {
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
            } else if (msg && msg.type === 'start') {
                // 잠시후 게임이 시작 됩니다 문구 띄운다
                // 화면 타입을 바꾼다
                this.$state.announce = '스코어 표시';
                this.$state.roomVisible = 'hidden';
                this.$state.gameVisible = 'current';
                this.render();
                this.$state.game = await playGame();
            } else if (msg && msg.type === 'play' && msg.ball && msg.player) {
                // state 변화 준다 render 안해도 알아서 위치 바뀜
                // this.$state.game.ball.position.x = msg.ball[0];
                // this.$state.game.ball.position.y = msg.ball[1];
                // this.$state.game.ball.position.z = msg.ball[2];
                this.$state.game.ball.position.set(msg.ball[0], msg.ball[1], msg.ball[2]);
                this.$state.game.you.position.x = msg.player[0];
                this.$state.game.enemy.position.x = msg.player[1];
            } else if (msg && msg.type === 'set_result' && msg.win && msg.lose) {
                // 안내문구 상태변화후 랜더링 playGame 다시호출
                this.$state.announce = '경기 중...';
                this.render();
                this.$state.game = await playGame();
            } else if (msg && msg.type === 'match_result' && msg.win && msg.lose && msg.win_cnt && msg.lose_cnt) {
                this.$state.announce = `${msg.win} 님이 이겼습니다`;
                this.render();
            } else if (msg && msg.type === 'final_info' && msg.player1 && msg.player2) {
                this.$state.announce = '스코어 표시';

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
                // if (this.$state.game.you.position.x > -1.2) {
                //     this.$state.game.you.position.x -= step;
                // // 뭐라뭐라 보냄
                // this.socket.send(
                //     JSON.stringify({
                //         // type: 'move',
                //         // player: 'you',
                //         // position: this.$state.game.you.position
                //     }),
                // );
                // }
            } else if (event.key === 'ArrowRight') {
                // this.socket.send(
                //     JSON.stringify({
                //         // type: 'move',
                //         // player: 'you',
                //         // position: this.$state.game.you.position
                //     }),
                // );
                // }
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
