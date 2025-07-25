import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  preload() {
    // Cargar el fondo (imagen)
    this.load.image('menuBg', 'assets/animations/menu/menuBg.png');
    // Si usas webfontloader, puedes cargar la fuente aquí
  }

  create() {
    // Fondo (imagen)
    this.add.image(400, 300, 'menuBg').setDisplaySize(800, 600);

    // Título del juego
    this.add.text(400, 100, 'Sylvaran', {
      fontSize: '56px',
      color: '#fff',
      fontFamily: 'Pixelify Sans',
      stroke: '#000',
      strokeThickness: 6
    }).setOrigin(0.5);

    // Opciones del menú
    const menuOptions = [
      { label: 'New game', scene: 'GameScene' },
      { label: 'Tips and tricks', scene: null },
      { label: 'Credits', scene: null },
      { label: 'Quit', scene: null }
    ];

    menuOptions.forEach((option, i) => {
      const btn = this.add.text(400, 220 + i * 60, option.label, {
        fontSize: '32px',
        color: '#fff',
        fontFamily: 'Pixelify Sans',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: { x: 30, y: 10 },
        stroke: '#000',
        strokeThickness: 4
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      btn.on('pointerover', () => btn.setStyle({ color: '#ffd700' }));
      btn.on('pointerout', () => btn.setStyle({ color: '#fff' }));
      if (option.scene) {
        btn.on('pointerdown', () => this.scene.start(option.scene));
      }
    });
  }
}
