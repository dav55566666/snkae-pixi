import { Application } from 'pixi.js';

export class AppManager {
    public app: Application;

    constructor() {
        this.app = new Application();
    }

    public async initApp(): Promise<void> {
        await this.app.init({ width: 800, height: 400 });
        document.getElementById('app')?.appendChild(this.app.view);
    }
}