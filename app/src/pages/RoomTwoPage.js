
import Component from '../core/Component.js';
import Chatting from '../components/Chatting.js';
import UserCard from '../components/UserCard.js';


export default class RoomTwoPage extends Component {
    template() {

        const user1 = {
            name: 'heolee',
            win: 1,
            lose: 0,
        };

        const user2 = {
            name: 'haejeong',
            win: 0,
            lose: 1,
        };

        return `
            <div class="p-3" style="width: 100%; height: 88vh;">
                <div class="all-container d-flex flex-column rounded-5 p-3" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.25); overflow: auto;">
                    <div class="room-container d-flex justify-content-evenly" style="width: 100%;">
                        <div data-component="usercard" class="user-card">
                        </div>
                        <div data-component="usercard" class="user-card">
                        </div>
                    </div>
                    <div class="d-flex justify-content-evenly" style="width: 100%;">
                        <div data-component="chatting" class="d-flex flex-column m-2" style="width: 80%; height: 12rem; background-color: rgba(14, 180, 252, 0.25);"></div>
                        <div class="d-flex flex-column m-2">
                            <button class="m-auto border-0 fs-1 text-white fw-bold rounded-pill custom-button" style="width: 10rem; height: 4rem;" id="exit-button">Exit</button>
                            <button class="m-auto border-0 fs-1 text-white fw-bold rounded-pill custom-button" style="width: 10rem; height: 4rem;" id="start-button">Start</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    mounted() {
        const $usercards = this.$target.querySelectorAll('[data-component="usercard"]');
        $usercards.forEach(($usercard) => {
            new UserCard($usercard);
        });

        const $chatting = this.$target.querySelector(
            '[data-component="chatting"]'
        );
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
