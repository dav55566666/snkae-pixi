import { Container, Graphics, Text } from "pixi.js";
import { AppManager } from "../core/App";
import { Snake } from "./Snake";

export class Point {
    private point: Container;
    private points: Container;
    private claimedPopints: number;
    private appManager: AppManager;
    private snake: Snake;

    constructor(appManager: AppManager, snake: Snake) {
        this.appManager = appManager;
        this.snake = snake;
        this.point = new Container();
        this.points = new Container();
        this.points.position.set(10, 10);
        this.claimedPopints = 0;
        
        this.randomizePosition();
        const pointGraphics = new Graphics();
        pointGraphics.beginFill(0xFF0000);
        pointGraphics.drawCircle(0, 0, 10);
        pointGraphics.endFill();
        this.point.addChild(pointGraphics);
        this.appManager.app.stage.addChild(this.point);

        const pointGraphicsText = new Text();
        pointGraphicsText.text = `Point: ${this.claimedPopints}`;
        pointGraphicsText.style = { fill: 0xFFFFFF };
        pointGraphicsText.position.set(10, 10);
        this.points.addChild(pointGraphicsText);
        this.appManager.app.stage.addChild(this.points);
        this.appManager.app.ticker.add(this.update, this);
    }

    private randomizePosition(): void {
        this.point.x = Math.random() * (this.appManager.app.screen.width - this.point.width);
        this.point.y = Math.random() * (this.appManager.app.screen.height - this.point.height);
    }

    private update(): void {
        if (this.checkCollision()) {
            this.randomizePosition();
            this.claimedPopints++;
            (this.points.children[0] as Text).text = `Point: ${this.claimedPopints}`;
        }
    }

    private checkCollision(): boolean {
        const snakeX = this.snake.getSnake().x + (this.snake.getSnake().width / 2);
        const snakeY = this.snake.getSnake().y + (this.snake.getSnake().height / 2);
        const pointX = this.point.x;
        const pointWidth = this.point.width;
        const pointY = this.point.y;
        const claimSize = 5; 
        const claimRadius = {
            x: [pointX - claimSize, pointX + claimSize + pointWidth],
            y: [pointY - claimSize - (this.snake.getSnake().height / 2), pointY + claimSize]
        }
        
        const isCollidingX = snakeX >= claimRadius.x[0] && snakeX <= claimRadius.x[1];
        const isCollidingY = snakeY - claimSize >= claimRadius.y[0] && snakeY <= claimRadius.y[1];

        return isCollidingX && isCollidingY;
    }

    public getPoint(): Container {
        return this.point;
    }
}