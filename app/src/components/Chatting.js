import Component from '../core/Component.js';

export default class Chatting extends Component {
    template() {

        return `
            <div class="p-1" style="width:100%; height: 100%;">
                <div class="d-flex align-items-center" style="height: 20%;"></div>
                <div class="d-flex align-items-center" style="height: 20%;"></div>
                <div class="d-flex align-items-center" style="height: 20%;">heolee : 어우 개 힘드네</div>
                <div class="d-flex align-items-center" style="height: 20%; border-bottom: 2px solid #0EB4FC;">heolee : 어우 개 어렵네</div>
                <form class="d-flex justify-content-evenly align-items-center" style="height: 20%;">
                    <input class="border-0" style="width: 90%;"></input>
                    <input class="border-0 text-white" style="background-color: rgba(14, 180, 252, 0.6);" type="submit" value="Enter">
                </form>
            </div>
        `;
    }

}