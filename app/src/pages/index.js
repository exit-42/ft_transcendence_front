
import LoginPage from './LoginPage.js';
import HomePage from './HomePage.js';
import LobbyPage from './LobbyPage.js';
import SelectPage from './SelectPage.js';
import RoomTwoPage from './RoomTwoPage.js';
import RoomFourPage from './RoomFourPage.js';
import GamePage from './GamePage.js';
import ResultPage from './ResultPage.js';
import GameLogPage from './GameLogPage.js';
import CounterPage from './CounterPage.js';

import UserCard from '../components/UserCard.js';

export default (main) => {
    const login = () => new LoginPage(main);
    const home = () => new HomePage(main);
    const lobby = () => new LobbyPage(main);
    const select = () => new SelectPage(main);
    const room2 = () => new RoomTwoPage(main);
    const room4 = () => new RoomFourPage(main);
    const game = () => new GamePage(main);
    const result = () => new ResultPage(main);
    const gamelog = () => new GameLogPage(main);
    const counter = () => new CounterPage(main);

    const usercard = () => new UserCard(main);

    return {
        login,
        home,
        lobby,
        select,
        room2,
        room4,
        game,
        result,
        gamelog,
        counter,
        usercard
    };
};
