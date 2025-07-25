export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Centrado
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    // Fondo opcional
    this.add.image(centerX, centerY, 'background').setOrigin(0.5).setAlpha(0.5);

    // Logo (opcional)
    const logo = this.add.image(centerX, centerY - 100, 'logo').setOrigin(0.5);
    logo.setScale(0.5);

    // Texto "Cargando..."
    const loadingText = this.add.text(centerX, centerY + 50, 'Cargando...', {
      fontFamily: 'Pixelify Sans',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Texto porcentaje
    const percentText = this.add.text(centerX, centerY + 90, '0%', {
      fontFamily: 'Pixelify Sans',
      fontSize: '18px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Barra de carga (fondo)
    const barWidth = 400;
    const barHeight = 25;

    const progressBarBg = this.add.rectangle(centerX, centerY + 130, barWidth, barHeight, 0x222222).setOrigin(0.5);
    const progressBar = this.add.rectangle(centerX - barWidth / 2, centerY + 130, 0, barHeight, 0xffffff).setOrigin(0, 0.5);

    // Cargar assets principales aquí
    this.load.video('menu-bg', 'assets/videos/menu_bg.mp4', 'loadeddata', false, true);
    this.load.audio('menu-music', 'assets/audio/menu/menu_theme.ogg', 'assets/audio/menu/menu_theme.mp3');

    // Eventos de carga
    this.load.on('progress', (value) => {
      progressBar.width = barWidth * value;
      percentText.setText(`${Math.floor(value * 100)}%`);
    });

    this.load.on('complete', () => {
      loadingText.setText('¡Listo!');
      this.time.delayedCall(500, () => {
      this.scene.start('MenuScene');
      });
    });
  }

  create() {
    // Nada aquí por ahora, todo en preload()
  }
}