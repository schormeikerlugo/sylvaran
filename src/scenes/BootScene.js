// src/scenes/BootScene.js
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Aquí puedes cargar cualquier asset mínimo como logo o fuente bitmap
    this.load.image('logo', 'assets/images/logo.png');
  }

  create() {
    // Pasamos a la siguiente escena
    this.scene.start('PreloadScene');
  }
}