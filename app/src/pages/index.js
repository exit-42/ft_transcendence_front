import LoginPage from './LoginPage.js';
import HomePage from './HomePage.js';
import LobbyPage from './LobbyPage.js';
import SelectPage from './SelectPage.js';
import RoomTwoPage from './RoomTwoPage.js';
import RoomFourPage from './RoomFourPage.js';
import GameLogPage from './GameLogPage.js';

export default function createPages(main) {
    const login = () => new LoginPage(main);
    const home = () => new HomePage(main);
    const lobby = () => new LobbyPage(main);
    const select = () => new SelectPage(main);
    const room2 = () => new RoomTwoPage(main);
    const room4 = () => new RoomFourPage(main);
    const gamelog = () => new GameLogPage(main);

    return {
        login,
        home,
        lobby,
        select,
        room2,
        room4,
        gamelog,
    };
}
