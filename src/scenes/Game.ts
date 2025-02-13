import * as PIXI from 'pixi.js';

export class GameScene {
    private gameScene: PIXI.Container;

    constructor() {
        this.gameScene = new PIXI.Container();
        this.initialize();
    }

    private initialize(): void {
    }

    public getScene(): PIXI.Container {
        return this.gameScene;
    }

    public update(delta: number): void {
    }
}
