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
            imagePath: 'src/imgs/default.jpeg',
        };

        const response = await postLogin();
        if (response.ok) {
            this.$state = await response.json();
            this.render();
        } else if (response.ok == 400) {
            alert('잘못된 요청 입니다');
        } else if (response.ok == 401) {
            alert('잘못된 접근 입니다');
        } else if (response.ok == 452) {
            alert('토큰이 만료 되었습니다');
        } else if (response.ok == 500) {
            alert('서버 에러');
        } else {
            alert('알 수 없는 에러');
        }
    }
}
