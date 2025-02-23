import Component from '../core/Component.js';
import { LoginButtonBox } from '../components/index.js';
import { postLogin } from '../api/account.js';

async function checkToken() {
    const response = await postLogin();
    if (response.ok) window.location.hash = '/home';
}

export default class LoginPage extends Component {
    template() {
        return `
			<div style="width: 100vw; height: 100vh; position: relative;">
				<img  style="width: 100%; height: 100%; object-fit: cover;" src="src/imgs/pingpong.png">
				
				<div data-component="login-button-box"t></div>

			</div>
		`;
    }

    mounted() {
        checkToken();
        const $loginbuttonbox = this.$target.querySelector('[data-component="login-button-box"]');
        new LoginButtonBox($loginbuttonbox);
    }
}
