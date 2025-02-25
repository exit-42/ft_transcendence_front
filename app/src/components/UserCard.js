import Component from '../core/Component.js';
import { postLogin } from '../api/account.js';

export default class UserCard extends Component {
    template() {
        return `
            <div class="d-flex flex-column m-auto rounded-5" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.6);">
                <img class="m-auto rounded-circle cus-user-card-picture" src="${this.$state.imagePath}">
                <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.nickname}</div>
                <div class="m-auto text-center fs-1 text-white fw-bold">${this.$state.winCnt}승 ${this.$state.loseCnt}패</div>
            </div>
        `;
    }

    async setup() {
        this.$state = {
            nickname: '로딩중',
            winCnt: 0,
            loseCnt: 0,
            imagePath: 'src/imgs/sample.jpeg',
        };
        this.$state = await (await postLogin()).json();
        console.log(this.$state);
        this.render();
    }
}
