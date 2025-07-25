// src/objects/character/Player.js
import Phaser from 'phaser';
import { createPlayerAnimations } from './PlayerAnimations.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    // Ajuste de hitbox
    this.setSize(20, 20);      // Ancho y alto de la hitbox real
    this.setOffset(22, 25);    // Desplazamiento desde la esquina superior izquierda del sprite

    // Controles
    this.cursors = scene.input.keyboard.createCursorKeys();

    // Animaciones
    createPlayerAnimations(scene);

    this.currentDirection = 'down';
  }

  update() {
    const speed = 100;
    const { left, right, up, down } = this.cursors;
    let vx = 0;
    let vy = 0;

    if (left.isDown) {
      vx = -speed;
      this.currentDirection = 'left';
    } else if (right.isDown) {
      vx = speed;
      this.currentDirection = 'right';
    }

    if (up.isDown) {
      vy = -speed;
      this.currentDirection = 'up';
    } else if (down.isDown) {
      vy = speed;
      this.currentDirection = 'down';
    }

    this.setVelocity(vx, vy);

    if (vx !== 0 || vy !== 0) {
      this.anims.play(`walk-${this.currentDirection}`, true);
    } else {
      this.anims.play(`idle-${this.currentDirection}`, true);
    }
  }
}
