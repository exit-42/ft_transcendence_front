
import Component from '../core/Component.js';

export default class SelectPage extends Component {
    template() {
        return `
            <div class="d-flex p-5 select-container" style="width: 100%; height: 88vh;">
                <div class="select-item" id="room4-button">
                    <div class="d-flex flex-column m-auto rounded-5 p-3 custom-button" style="width: 25rem; height: 30rem;">
                        <div class="d-flex" style="height: 35%;">
                            <img class="m-auto" style="width: 8rem; height: 8rem;" src="src/imgs/Vector.svg">
                            <img class="m-auto" style="width: 8rem; height: 8rem;" src="src/imgs/Vector.svg">
                        </div>
                        <div class="d-flex" style="height: 35%;">
                            <img class="m-auto" style="width: 8rem; height: 8rem;" src="src/imgs/Vector.svg">
                            <img class="m-auto" style="width: 8rem; height: 8rem;" src="src/imgs/Vector.svg">
                        </div>
                        <div class="m-auto text-white fw-bold fs-1">Tournament</div>
                    </div>
                </div>
                <div class="select-item" id="room2-button">
                    <div class="d-flex flex-column m-auto rounded-5 p-3 custom-button" style="width: 25rem; height: 30rem;">
                        <div class="d-flex" style="height: 70%;">
                            <img class="m-auto" style="width: 8rem; height: 8rem;" src="src/imgs/Vector.svg">
                            <img class="m-auto" style="width: 8rem; height: 8rem;" src="src/imgs/Vector.svg">
                        </div>
                        <div class="m-auto text-white fw-bold fs-1">1 VS 1</div>
                    </div>
                </div>
            </div>
        `;
    }

    setEvent() {

        this.addEvent('click', '#room2-button', () => {
            window.location.hash = '/room2';
        });

        this.addEvent('click', '#room4-button', () => {
            window.location.hash = '/room4';
        });

    }
}
