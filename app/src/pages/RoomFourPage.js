import Component from '../core/Component.js';
import { UserCard } from '../components/index.js';

export default class RoomFourPage extends Component {
    template() {
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
                    <div class="cus-room-container d-flex justify-content-evenly" style="width: 100%;">
                        <div data-component="usercard" class="cus-user-card">
                        </div>
                        <div data-component="usercard" class="cus-user-card">
                        </div>
                        <div data-component="usercard" class="cus-user-card">
                        </div>
                        <div data-component="usercard" class="cus-user-card">
                        </div>
                    </div>
                        <div class="d-flex m-5">
                            <button class="m-auto border-0 fs-1 text-white fw-bold rounded-pill cus-button" style="width: 13rem; height: 4rem;" id="exit-button">Exit</button>
                            <button class="m-auto border-0 fs-1 text-white fw-bold rounded-pill cus-button" style="width: 13rem; height: 4rem;" id="start-button">Start</button>
                        </div>


            </div>
        `;
    }

    mounted() {
        const $usercards = this.$target.querySelectorAll('[data-component="usercard"]');
        $usercards.forEach(($usercard) => {
            new UserCard($usercard);
        });
    }

    setEvent() {
        this.addEvent('click', '#exit-button', () => {
            window.location.hash = '/lobby';
        });

        this.addEvent('click', '#start-button', () => {
            window.location.hash = '/game';
        });
    }
}
