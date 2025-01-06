
import Component from '../core/Component.js';

export default class LobbyPage extends Component {
    template() {

        const rooms = [
            { capacity: '2/4', roomName: "heolee's room" },
            { capacity: '2/2', roomName: "haejeong's room" },
            { capacity: '1/2', roomName: "sangyhan's room" },
            { capacity: '1/4', roomName: "sham's room" },
            { capacity: '1/4', roomName: "klha's room" },
            { capacity: '3/4', roomName: "dna's room" }
        ];

        const roomItems = rooms.map(room => `
            <li class="col m-auto rounded-5 d-flex flex-column p-3" 
                style="width: 16rem; height: 12rem; background-color: rgba(14, 180, 252, 0.5);">
                <div class="my-auto fs-5 text-white">${room.capacity}</div>
                <div class="m-auto rounded-circle" style="width: 5rem; height: 5rem; background-color: white"></div>
                <div class="m-auto fs-4 text-white">${room.roomName}</div>
            </li>
        `).join('');

        return `
            <div class="parent" style="">
                <div class="parent" style="height: 100%; background-color: rgba(14, 180, 252, 0.25);">
                    <ul class="lobby-container">
                        ${roomItems}
                    </ul>
                </div>
            </div>
        `;
    }

    setEvent() {

        this.addEvent('click', '#room2-button', () => {
            window.location.hash = '/room2';
        });

        this.addEvent('click', '#room4-button', () => {
            window.location.hash = '/room4';
        });

    }
}
