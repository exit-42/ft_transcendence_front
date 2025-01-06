
import Component from '../core/Component.js';
import UserCard from '../components/UserCard.js';

export default class HomePage extends Component {

    template() {

        const user = {
            name: 'heolee',
            win: 1,
            lose: 0,
        };

        return `
            <div class="p-5" style="width: 100%; height: 88vh;">
                <div class="home-container d-flex rounded-5 p-3" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.25); overflow: auto;">
                    <div class="home-item-container d-flex flex-column">
                        <button class="home-button border-0 fs-1 text-white fw-bold rounded-pill custom-button" id="gamelog-button">gamelog</button>
                        <button class="home-button border-0 fs-1 text-white fw-bold rounded-pill custom-button" id="lobby-button">lobby</button>
                        <button class="home-button border-0 fs-1 text-white fw-bold rounded-pill custom-button" id="select-button">make room</button>
                    </div>
                    <div class="home-item-container d-flex">
                        <div data-component="usercard" class="home-card m-auto">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    mounted() {
        const $usercard = this.$target.querySelector(
            '[data-component="usercard"]'
        );
        new UserCard($usercard);
    }

    setEvent() {

        // "gamelog" 버튼 클릭 시
        this.addEvent('click', '#gamelog-button', () => {
            window.location.hash = '/gamelog'; // gamelog 페이지로 이동
        });

        // "lobby" 버튼 클릭 시
        this.addEvent('click', '#lobby-button', () => {
            window.location.hash = '/lobby'; // lobby 페이지로 이동
        });

        // "Select" 버튼 클릭 시
        this.addEvent('click', '#select-button', () => {
            window.location.hash = '/select'; // select 페이지로 이동
        });
    }
}
