
import Component from '../core/Component.js';

export default class Header extends Component {
    template() {

        return `
            <header class="d-flex px-5" style="height: 12vh; border-bottom: 2px solid #0EB4FC;">
                <button class="my-auto border-0 fs-5 text-white fw-bold rounded-pill custom-button" style="width: 9rem; height: 3rem;" id="logo-button">42 PONG</button>
                <button class="my-auto ms-auto border-0 fs-5 text-white fw-bold rounded-pill custom-button" style="width: 9rem; height: 3rem;" id="logout-button">Log out</button>
            </header>
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