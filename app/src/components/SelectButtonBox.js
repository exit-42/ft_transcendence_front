import Component from '../core/Component.js';

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
        this.addEvent('click', '#room2-button', () => {
            window.location.hash = '/room2';
            // 서버에 본인이 방장인 2인 룸 개설
        });

        this.addEvent('click', '#room4-button', () => {
            window.location.hash = '/room4';
            // 서버에 본인이 방장인 4인 룸 개설
        });
    }
}
