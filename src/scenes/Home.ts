import { Container, Text, TextStyle } from "pixi.js";
import { Snake } from "../entities/Snake";
import { Point } from "../entities/Point";
import { AppManager } from "../core/App";

export class HomeScene {
    private homeScene: Container;
    private startButton!: Text;
    private startButtonContainer: Container;
    private snake: Snake;
    private point: Point;
    private appManager: AppManager;

    constructor(appManager: AppManager) {
        this.homeScene = new Container();
        this.startButtonContainer = new Container();
        this.appManager = appManager;
        this.snake = new Snake(this.appManager);
        this.point = new Point(this.appManager, this.snake);
        this.initialize();
    }

    private initialize(): void {
        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "white",
        });

        this.startButton = new Text("Start Game", style);
        this.startButton.anchor.set(0.5);
        this.startButton.x = 0;
        this.startButton.y = 0;

        this.startButtonContainer.x = this.appManager.app.screen.width / 2;
        this.startButtonContainer.y = this.appManager.app.screen.height / 2;
        this.startButtonContainer.interactive = true;
        this.startButtonContainer.cursor = "pointer";
        Object.assign(this.startButtonContainer, { buttonMode: true });

        this.startButtonContainer.addChild(this.startButton);
        this.startButtonContainer.on("pointerdown", () => this.onStartGame());

        this.homeScene.addChild(this.startButtonContainer);
    }

    private onStartGame(): void {
        const event = new CustomEvent("startGame");
        window.dispatchEvent(event);
        this.appManager.app.stage.addChild(this.point.getPoint(), this.snake.getSnake());
    }

    public getScene(): Container {
        return this.homeScene;
    }
}