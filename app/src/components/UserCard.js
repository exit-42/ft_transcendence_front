
import Component from '../core/Component.js';

export default class UserCard extends Component {
    template() {

        const user = {
            name: 'heolee',
            win: 1,
            lose: 0,
        };

        return `
            <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                <img class="m-auto rounded-circle" style="width: 10rem; height: 10rem; background-color: white" src="src/imgs/sample.jpeg">
                <div class="m-auto text-center fs-1 text-white fw-bold">${user.name}</div>
                <div class="m-auto text-center fs-1 text-white fw-bold">${user.win}승 ${user.lose}패</div>
            </div>
        `;
    }
}
