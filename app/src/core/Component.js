export default class Component {
    $target; // 컴포넌트를 넣을 부모
    $props;
    $state;

    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.setEvent();
        this.render();
        this._observeDOMChages();
    }

    setup() {} // 컴포넌트 state 설정

    dispose() {}

    mounted() {} // 컴포넌트가 마운트 되었을 때

    template() {
        // UI 구성
        return '';
    }

    render() {
        this.$target.innerHTML = this.template(); // UI 렌더링
        this.mounted();
    }

    setEvent() {} // 컴포넌트에서 필요한 이벤트 설정

    setState(newState) {
        // 상태 변경 후 렌더링
        // 인자로 들어온 newState로 갱신, 호출하는 쪽에서 state를 변경하고 호출해야 함.
        this.$state = { ...newState };
        this.render();
    }

    addEvent(eventType, selector, callback) {
        // 이벤트 등록 추상화
        this.$target.addEventListener(eventType, (event) => {
            if (!event.target.closest(selector)) return false;
            callback(event);
        });
    }

    _observeDOMChages() {
        const observer = new MutationObserver(() => {
            if (!document.contains(this.$target)) {
                this.dispose();
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
}
