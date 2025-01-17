import Component from '../core/Component.js';

export default class Header extends Component {
    template() {
        return `
            <div class="d-flex px-5" style="height: 12vh; border-bottom: 2px solid #0EB4FC;">
                <button type="button" class="my-auto border-0 fs-5 text-white fw-bold rounded-pill cus-button" style="width: 9rem; height: 3rem;" id="logo-button">42 PONG</button>
                <button type="button" class="my-auto ms-auto border-0 fs-5 text-white fw-bold rounded-pill cus-button" style="width: 9rem; height: 3rem;" id="logout-button">Log out</button>
            </div>
        `;
    }

    setEvent() {
        this.addEvent('click', '#logo-button', () => {
            window.location.hash = '/home';
        });

        this.addEvent('click', '#logout-button', () => {
            window.location.hash = '/login';
        });
    }
}
