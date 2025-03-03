import Component from '../core/Component.js';

export default class Announce extends Component {
    template() {
        return `
            <div>${this.$props}</div>
        `;
    }
}
