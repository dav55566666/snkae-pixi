import { AppManager } from './core/App';
import { HomeScene } from './scenes/Home';
import { GameScene } from './scenes/Game';

async function main() {
  const appManager = new AppManager();
  await appManager.initApp();

  const homeScene = new HomeScene(appManager);
  appManager.app.stage.addChild(homeScene.getScene());

  window.addEventListener('startGame', () => {
    appManager.app.stage.removeChild(homeScene.getScene());

    const gameScene = new GameScene();
    appManager.app.stage.addChild(gameScene.getScene());

  });
}

main().catch(console.error);