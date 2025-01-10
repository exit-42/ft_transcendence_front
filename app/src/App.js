import Router from './Router.js';
import Component from './core/Component.js';
import { Header } from './components/index.js';
import createPages from './pages/index.js';

export default class App extends Component {
    template() {
        return `
        <header></header>
        <main></main>
        `;
    }

    mounted() {
        const $header = this.$target.querySelector('header');
        new Header($header);
        const $main = this.$target.querySelector('main');
        const pages = createPages($main);

        const router = new Router($main);
        router.addRoute('#/', () => {
            $header.style.display = 'none';
            pages.login();
        });
        router.addRoute('#/home', () => {
            $header.style.display = 'block';
            pages.home();
        });
        router.addRoute('#/lobby', () => {
            $header.style.display = 'block';
            pages.lobby();
        });
        router.addRoute('#/select', () => {
            $header.style.display = 'block';
            pages.select();
        });
        router.addRoute('#/room2', () => {
            $header.style.display = 'block';
            pages.room2();
        });
        router.addRoute('#/room4', () => {
            $header.style.display = 'block';
            pages.room4();
        });
        router.addRoute('#/game', () => {
            $header.style.display = 'block';
            pages.game();
        });
        router.addRoute('#/result', () => {
            $header.style.display = 'block';
            pages.result();
        });
        router.addRoute('#/gamelog', () => {
            $header.style.display = 'block';
            pages.gamelog();
        });

        // 사용되지 않는 메서드
        // router.onRouteChange = (currentRoute) => {
        //     console.log('onRouteChange');
        //     console.log('currentRoute', currentRoute);
        //     if (currentRoute === '#/') {
        //         $header.style.display = 'none';
        //     } else {
        //         $header.style.display = 'block';
        //     }
        // };

        router.start();
    }
}
