import Component from '../core/Component.js';
import { postRoom } from '../api/room.js';

export default class SelectButtonBox extends Component {
    template() {
        return `
            <div class="cus-select-item" id="room4-button">
                <div class="d-flex flex-column m-auto rounded-5 p-3 cus-button" style="width: 20rem; height: 25rem;">
                    <div class="d-flex" style="height: 35%;">
                        <img class="m-auto" style="width: 6rem; height: 6rem;" src="src/imgs/Vector.svg">
                        <img class="m-auto" style="width: 6rem; height: 6rem;" src="src/imgs/Vector.svg">
                    </div>
                    <div class="d-flex" style="height: 35%;">
                        <img class="m-auto" style="width: 6rem; height: 6rem;" src="src/imgs/Vector.svg">
                        <img class="m-auto" style="width: 6rem; height: 6rem;" src="src/imgs/Vector.svg">
                    </div>
                    <div class="m-auto text-white fw-bold fs-1">Tournament</div>
                </div>
            </div>
            <div class="cus-select-item" id="room2-button">
                <div class="d-flex flex-column m-auto rounded-5 p-3 cus-button" style="width: 20rem; height: 25rem;">
                    <div class="d-flex" style="height: 70%;">
                        <img class="m-auto" style="width: 6rem; height: 6rem;" src="src/imgs/Vector.svg">
                        <img class="m-auto" style="width: 6rem; height: 6rem;" src="src/imgs/Vector.svg">
                    </div>
                    <div class="m-auto text-white fw-bold fs-1">1 VS 1</div>
                </div>
            </div>
        `;
    }

    setEvent() {
        this.addEvent('click', '#room2-button', async () => {
            // 서버에 본인이 방장인 2인 룸 개설
            const response = await postRoom('individual');
            if (response.ok) {
                const responseData = await response.json();
                window.myGlobalVar = responseData.port;
                window.location.hash = '/room2';
            } else {
                if (response.status == 400) {
                    alert('코드가 틀렸습니다');
                } else if (response.status == 401) {
                    alert('존재하지 않는 유저 입니다');
                } else if (response.status == 452) {
                    alert('세션이 만료 되었습니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });

        this.addEvent('click', '#room4-button', async () => {
            // 서버에 본인이 방장인 4인 룸 개설
            const response = await postRoom('tournament');
            if (response.ok) {
                const responseData = await response.json();
                window.myGlobalVar = responseData.port;
                window.location.hash = '/room4';
            } else {
                if (response.status == 400) {
                    alert('코드가 틀렸습니다');
                } else if (response.status == 401) {
                    alert('존재하지 않는 유저 입니다');
                } else if (response.status == 452) {
                    alert('세션이 만료 되었습니다');
                } else if (response.status == 500) {
                    alert('서버 에러');
                } else {
                    alert('알 수 없는 에러');
                }
            }
        });
    }
}
