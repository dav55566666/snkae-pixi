import { Container, Graphics } from 'pixi.js';
import { AppManager } from '../core/App';

export class Snake {
    private snake: Container;
    private speed: number;
    private direction: { x: number, y: number };
    private appManager: AppManager;

    constructor(appManager: AppManager) {
        this.snake = new Container();
        this.speed = 1;
        this.direction = { x: 1, y: 0 };
        this.appManager = appManager;
        const snakeGraphics = new Graphics();
        snakeGraphics.beginFill(0xFFFF00); 
        snakeGraphics.drawCircle(0, 20, 10); 
        snakeGraphics.endFill();
        this.snake.addChild(snakeGraphics);
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.appManager.app.ticker.add(this.update.bind(this));
    }

    private update(): void {
        let newX: number = this.snake.x + this.direction.x * this.speed;
        let newY: number = this.snake.y + this.direction.y * this.speed;

        if (newX < 0) {
            newX = this.appManager.app.screen.width;
        } else if (newX > this.appManager.app.screen.width) {
            newX = 0;
        }

        if (newY < 0) {
            newY = this.appManager.app.screen.height;
        } else if (newY > this.appManager.app.screen.height) {
            newY = 0;
        }

        this.snake.x = newX;
        this.snake.y = newY;
    }

    private handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case 'ArrowUp':
                this.direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                this.direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                this.direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                this.direction = { x: 1, y: 0 };
                break;
        }
    }

    public getSnake(): Container {
        return this.snake;
    }
}