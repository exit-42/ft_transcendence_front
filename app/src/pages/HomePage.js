import Component from '../core/Component.js';
import { UserCard } from '../components/index.js';

export default class HomePage extends Component {
    template() {
        return `
            <div class="home-container d-flex">
                <div class="d-flex flex-column friend-list-container">
                    <div class="friend-button-container">
                        <button class="my-1 mx-auto border-0 rounded-pill friend-button">add</button>
                        <button class="my-1 mx-auto border-0 rounded-pill friend-button">delete</button>
                    </div>
                    <ul class="friend-list">
                        <li class="friend friend-on"></li>
                        <li class="friend"></li>
                        <li class="friend"></li>
                        <li class="friend"></li>
                        <li class="friend"></li>
                        <li class="friend"></li>
                        
                    <ul>
                </div>
                <div class="d-flex flex-column cus-home-card-container">
                    <button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="gamelog-button">game log</button>
                    <button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="lobby-button">lobby</button>
                    <button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="select-button">make room</button>
                    <button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button" id="select-button">edit ID</button>
                    <button class="cus-home-button border-0 fs-2 text-white fw-bold rounded-pill cus-button delete-button" id="select-button">delete ID</button>
                </div>
                <div class="d-flex cus-home-card-container">
                    <div data-component="usercard" class="cus-home-card m-auto">
                    </div>
                </div>
            </div>
        `;
    }

    mounted() {
        const $usercard = this.$target.querySelector('[data-component="usercard"]');
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
