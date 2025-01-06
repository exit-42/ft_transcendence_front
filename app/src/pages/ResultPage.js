
import Component from '../core/Component.js';

export default class ResultPage extends Component {
    template() {
        return `
            <div class="p-5" style="width: 100%; height: 88vh;">
                <div class="d-flex flex-column rounded-5 p-3" style="width: 100%; height: 100%; background-color: rgba(14, 180, 252, 0.25);">
                    <img class="m-auto" style="width: 14rem; height: 7rem;" src="src/imgs/crown.png">
                    <div class="m-auto rounded-5 d-flex align-items-center justify-content-center" style="width: 22rem; height: 22rem; background-color: rgba(14, 180, 252, 0.6);">
                        <div class="m-auto rounded-circle" style="width: 12rem; height: 12rem; background-color: white"></div>
                    </div>
                    <div class="m-auto fs-1 d-flex align-items-center justify-content-center" style="">heolee is winner</div>
                </div>
            </div>
        `;
    }

}

