import Component from '../core/Component.js';
import { Chatting, UserCard } from '../components/index.js';

export default class RoomFourPage extends Component {
    template() {
        return `
            <div class="p-5" style="width: 100%; height: 88vh;">

                    <div class="room-container d-flex justify-content-evenly" style="width: 100%;">
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

        const $chatting = this.$target.querySelector('[data-component="chatting"]');
        new Chatting($chatting);
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
