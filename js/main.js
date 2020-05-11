"use strict";
class Bomb extends HTMLElement {
    constructor() {
        super();
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.resetPos();
        this.addEventListener('click', () => this.onClick());
        this.addEventListener('touchstart', () => this.onClick());
    }
    onClick() {
        Game.scorePoint();
        this.resetPos();
    }
    resetPos() {
        this.posy = Math.floor((Math.random() * -500) + -224);
        this.posx = Math.floor(Math.random() * window.innerWidth);
        this.speed = Math.floor((Math.random() * 6) + 3);
    }
    update() {
        this.posy += this.speed;
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
        if (this.posy > window.innerHeight) {
            this.resetPos();
            Game.destroyBuilding();
        }
    }
}
window.customElements.define("bomb-component", Bomb);
class Car extends HTMLElement {
    constructor() {
        super();
        this.carHeight = 138;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.resetPos();
        this.posy = window.innerHeight - this.carHeight;
        this.addEventListener('click', () => this.onClick());
        this.addEventListener('touchstart', () => this.onClick());
    }
    update() {
        this.posx += this.speed;
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
        if (this.posx > window.innerWidth) {
            this.resetPos();
        }
    }
    onClick() {
        Game.resetBuildings();
    }
    resetPos() {
        this.posx = Math.floor((Math.random() * -500) + -224);
        this.speed = Math.floor((Math.random() * 6) + 3);
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.bombs = [];
        Game.textfield = document.getElementsByTagName("textfield")[0];
        Game.statusbar = document.getElementsByTagName("bar")[0];
        this.car = new Car();
        Game.stopGame = false;
        for (let i = 0; i < Math.floor((Math.random() * 4) + 4); i++) {
            this.bombs.push(new Bomb());
        }
        this.gameLoop();
    }
    gameLoop() {
        console.log("updating the game");
        this.car.update();
        for (var bomb of this.bombs) {
            bomb.update();
        }
        if (!Game.stopGame) {
            Game.anFrame = requestAnimationFrame(() => this.gameLoop());
        }
    }
    static destroyBuilding() {
        if (this.destroyed == 3) {
            Game.stopGame = true;
            cancelAnimationFrame(Game.anFrame);
            console.log("DEAD");
        }
        this.destroyed++;
        Game.statusbar.style.backgroundPositionX = `${-72 * this.destroyed}px`;
    }
    static resetBuildings() {
        Game.statusbar.style.backgroundPositionX = "0px";
        this.destroyed = 0;
    }
    static scorePoint() {
        this.score++;
        this.textfield.innerHTML = "score: " + this.score;
    }
}
Game.score = 0;
Game.destroyed = 0;
window.addEventListener("load", () => new Game());
class GameObject {
    constructor() {
    }
}
//# sourceMappingURL=main.js.map