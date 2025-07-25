import { UIManager } from '../utils/UIManager.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.video('menu-bg', 'assets/videos/menu_bg.mp4', 'loadeddata', false, true);
    this.load.audio('menu-music', 'assets/audio/menu_theme.ogg');
  }

  create() {
    const bg = this.add.video(this.scale.width / 2, this.scale.height / 2, 'menu-bg');
    bg.setOrigin(0.5);
    bg.setDepth(0);
    bg.setDisplaySize(350, 350);
    bg.setMute(true);
    bg.setLoop(true);
    bg.play();

    this.menuMusic = this.sound.add('menu-music', {
      volume: 0.5,
      loop: true
    });

    const continueScreen = document.querySelector('#continue-screen');
    const menuUI = document.querySelector('#menu-ui');

    UIManager.hideElement('#continue-screen');
    UIManager.hideElement('#menu-ui');

    this.time.delayedCall(1000, () => {
      UIManager.showElement('#continue-screen');

      const startGame = () => {
        if (continueScreen.classList.contains('hidden')) return;

        UIManager.fadeOutElement('#continue-screen', 600);
        UIManager.showElement('#menu-ui');
        this.menuMusic.play();

        UIManager.bindMenuActions('#menu-ui', (action) => this.handleAction(action));
      };

      continueScreen.addEventListener('click', startGame);
      this.input.keyboard.once('keydown', startGame);
    });
  }

  handleAction(action) {
    switch (action) {
      case 'new':
        this.menuMusic.stop();
        UIManager.hideElement('#menu-ui');
        UIManager.removeAllVideos();
        UIManager.removeElement('#ui-container');
        this.scene.start('OverworldScene');
        break;

      case 'tips':
        UIManager.showModal('#modal-tips');
        UIManager.bindModalClose('#close-tips', '#modal-tips');
        break;

      case 'credits':
        UIManager.showModal('#modal-credits');
        UIManager.bindModalClose('#close-credits', '#modal-credits');
        break;

      case 'quit':
        // Aquí puedes mostrar un modal adicional si deseas o simplemente cerrar la ventana
        console.log('❌ Quit pressed (funcionalidad futura)');
        break;
    }
  }
}