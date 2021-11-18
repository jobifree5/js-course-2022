const { fromEvent } = window.rxjs;
const {
    map, pairwise, distinctUntilChanged, throttleTime, filter,
} = window.rxjs.operators;

export class Menu {
    constructor(header, headerLogo, burgerButton, navigationMenu) {
        this.header = header;
        this.headerLogo = headerLogo;
        this.burgerButton = burgerButton;
        this.navigationMenu = navigationMenu;
        this.scrollLimit = 50;
        this.toggleDropdownMenu();
        this.toggleHeader();
    }

    toggleDropdownMenu() {
        const source = fromEvent(this.burgerButton, 'click');
        source.subscribe(() => this.navigationMenu.classList.toggle('display-none'));
    }

    toggleHeader() {
        const source = fromEvent(window, 'scroll').pipe(
            throttleTime(50),
            map(() => window.scrollY),
            filter((data) => data > this.scrollLimit),
            pairwise(),
            map(([prev, next]) => prev > next),
            distinctUntilChanged(),
        );
        source.subscribe(() => this.header.classList.toggle('hidden'));
    }
}
