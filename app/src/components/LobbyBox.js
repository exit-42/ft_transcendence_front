import Component from '../core/Component.js';

export default class LobbyBox extends Component {
    template() {
        const roomItems = this.$state
            .map(
                (room) => `
                    <li class="col m-auto rounded-5 d-flex flex-column p-3" 
                        style="width: 16rem; height: 12rem; background-color: rgba(14, 180, 252, 0.5);"
                        data-room-name="${room.roomName}">
                        <div class="my-auto fs-5 text-white">${room.capacity}</div>
                        <div class="m-auto rounded-circle" style="width: 5rem; height: 5rem; background-color: white"></div>
                        <div class="m-auto fs-4 text-white">${room.roomName}</div>
                    </li>
                `,
            )
            .join('');

        return `
            <div class="cus-parent">
                <div class="d-flex justify-content-evenly cus-mode-button-container">
                    <button class="border-0 fs-4 text-white fw-bold rounded-pill cus-mode-button cus-button" id="room2-button">1 VS 1</button>
                    <button class="border-0 fs-4 text-white fw-bold rounded-pill cus-mode-button cus-button" id="room4-button">Tournament</button>
                </div>
                <div class="inner-container">
                    <ul class="cus-lobby-container">
                        ${roomItems}
                    </ul>
                </div>
            </div>
        `;
    }

    setup() {
        this.$state = [
            {
                capacity: '2/4',
                roomName: "heolee's room",
            },
            {
                capacity: '2/2',
                roomName: "haejeong's room",
            },
            {
                capacity: '1/2',
                roomName: "sangyhan's room",
            },
        ];
        // 최초에는 1대1 room만 불러 올것임
        // console.log(this.$state);
    }

    setEvent() {
        this.addEvent('click', '#room2-button', () => {
            this.$state = [
                {
                    capacity: '2/4',
                    roomName: "heolee's room",
                },
                {
                    capacity: '2/2',
                    roomName: "haejeong's room",
                },
                {
                    capacity: '1/2',
                    roomName: "sangyhan's room",
                },
            ];
            this.render();
        });

        this.addEvent('click', '#room4-button', () => {
            this.$state = [
                {
                    capacity: '1/4',
                    roomName: "sham's room",
                },
                {
                    capacity: '1/4',
                    roomName: "klha's room",
                },
                {
                    capacity: '3/4',
                    roomName: "dna's room",
                },
            ];
            this.render();
        });

        this.addEvent('click', '.cus-lobby-container', (e) => {
            const clickedRoom = e.target.closest('li'); // Find the clicked <li> element
            if (clickedRoom) {
                const roomName = clickedRoom.getAttribute('data-room-name');
                console.log(`You clicked on: ${roomName}`);
            }
        });
    }
}
