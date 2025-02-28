import Component from '../core/Component.js';
import { getRoom, patchRoom } from '../api/room.js';

export default class LobbyBox extends Component {
    template() {
        const roomItems = this.$state.data
            .map(
                (room) => `
                    <li class="col m-auto rounded-5 d-flex flex-column p-3" 
                        style="width: 16rem; height: 12rem; background-color: rgba(14, 180, 252, 0.5);"
                        room-id="${room.roomId}">
                        <div class="my-auto fs-5 text-white">${room.playerCount}/${this.$state.now}</div>
                        <div class="m-auto rounded-circle" style="width: 5rem; height: 5rem; background-color: white"></div>
                        <div class="m-auto fs-4 text-white">${room.roomManager}</div>
                    </li>
                `,
            )
            .join('');

        return `
            <div class="cus-parent">
                <div class="d-flex justify-content-evenly cus-mode-button-container">
                    <button class="border-0 fs-4 text-white fw-bold rounded-pill cus-mode-button cus-button" id="room2-button">1 VS 1</button>
                    <button class="border-0 fs-4 text-white fw-bold rounded-pill cus-mode-button cus-button" id="room4-button">Tournament</button>
                </div>
                <div class="inner-container">
                    <ul class="cus-lobby-container">
                        ${roomItems}
                    </ul>
                </div>
            </div>
        `;
    }

    async setup() {
        this.$state = {
            now: '2',
            data: [],
        };

        const response = await getRoom('individual');
        if (response.ok) {
            const responseData = await response.json();
            this.$state.data = responseData.data;
            this.render();
        } else if (response.ok == 400) {
            alert('잘못된 요청 입니다');
        } else if (response.ok == 401) {
            alert('잘못된 접근 입니다');
        } else if (response.ok == 452) {
            alert('토큰이 만료 되었습니다');
        } else if (response.ok == 500) {
            alert('서버 에러');
        } else {
            alert('알 수 없는 에러');
        }
    }

    setEvent() {
        this.addEvent('click', '#room2-button', async () => {
            const response = await getRoom('individual');
            if (response.ok) {
                const responseData = await response.json();
                this.$state.now = '2';
                this.$state.data = responseData.data;
                this.render();
            } else if (response.ok == 400) {
                alert('잘못된 요청 입니다');
            } else if (response.ok == 401) {
                alert('잘못된 접근 입니다');
            } else if (response.ok == 452) {
                alert('토큰이 만료 되었습니다');
            } else if (response.ok == 500) {
                alert('서버 에러');
            } else {
                alert('알 수 없는 에러');
            }
        });

        this.addEvent('click', '#room4-button', async () => {
            const response = await getRoom('tournament');
            if (response.ok) {
                const responseData = await response.json();
                this.$state.now = '4';
                this.$state.data = responseData.data;
                this.render();
            } else if (response.ok == 400) {
                alert('잘못된 요청 입니다');
            } else if (response.ok == 401) {
                alert('잘못된 접근 입니다');
            } else if (response.ok == 452) {
                alert('토큰이 만료 되었습니다');
            } else if (response.ok == 500) {
                alert('서버 에러');
            } else {
                alert('알 수 없는 에러');
            }
        });

        this.addEvent('click', '.cus-lobby-container', async (e) => {
            const clickedRoom = e.target.closest('li');
            if (clickedRoom) {
                const roomId = clickedRoom.getAttribute('room-id');
                // console.log(`this room id: ${roomId}`);
                const response = await patchRoom(roomId);
                if (response.ok) {
                    const responseData = await response.json();
                    window.myGlobalVar = responseData.port;
                    window.location.hash = `/room${this.$state.now}`;
                } else if (response.ok == 400) {
                    alert('잘못된 요청 입니다');
                } else if (response.ok == 401) {
                    alert('잘못된 접근 입니다');
                } else if (response.ok == 452) {
                    alert('토큰이 만료 되었습니다');
                } else if (response.ok == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });
    }
}
