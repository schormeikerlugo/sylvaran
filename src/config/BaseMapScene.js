// src/config/BaseMapScene.js
import Phaser from 'phaser';
import Player from '../objects/character/Player.js';
import AnimatedTiles from './AnimatedTiles.js';

export default class BaseMapScene extends Phaser.Scene {
  constructor(sceneKey) {
    super(sceneKey);

    // Estas propiedades deben ser definidas en la escena hija
    this.mapKey = '';
    this.tilesetsData = [];
    this.layerOrder = [];
    this.playerStart = { x: 100, y: 100 };

    // 🎵 Música opcional definida por la escena hija
  this.backgroundMusicKey = null;
  }

  preload() {
    // Se implementa en la escena hija
  }

  create() {
    // 🗺️ Crear tilemap
    const map = this.make.tilemap({ key: this.mapKey });

    // 🎨 Cargar tilesets del mapa
    const tilesets = this.tilesetsData.map(data =>
      map.addTilesetImage(data.nameInTiled, data.keyInPhaser)
    );

    // 🧱 Crear las capas de tiles en orden definido
    this.layerOrder.forEach(layerName => {
      if (map.getLayer(layerName)) {
        map.createLayer(layerName, tilesets, 0, 0).setName(layerName);
      }
    });

    // 🌀 Iniciar animaciones de tiles
    AnimatedTiles.init(this, map);

    // 🔲 Crear colisiones desde capa 'collides'
    this._createColliders(map);

    // 🎯 Buscar el punto de spawn (capa y objeto opcionales)
    let spawnX = this.playerStart.x;
    let spawnY = this.playerStart.y;

    const spawnLayer = map.getObjectLayer('spawn');

    if (spawnLayer && spawnLayer.objects) {
      const spawnObject = spawnLayer.objects.find(obj => obj.name === 'spawn');
      if (spawnObject) {
        spawnX = spawnObject.x;
        spawnY = spawnObject.y;
      }
    }

    // 👾 Instanciar jugador
    this.player = new Player(this, spawnX, spawnY);
    this.physics.add.collider(this.player, this.colliders);

    // 🎥 Cámara
    this._setupCamera(map);

    // 🎶 Reproducir música de fondo si se definió
    if (this.backgroundMusicKey && !this.sound.get(this.backgroundMusicKey)) {
    const music = this.sound.add(this.backgroundMusicKey, {
      loop: true,
      volume: 0.5
    });
    music.play();
}

  }

  update() {
    this.player?.update();
  }

  _createColliders(map) {
    const collisionLayer = map.getObjectLayer('collides');
    this.colliders = this.physics.add.staticGroup();

    if (!collisionLayer) return;

    collisionLayer.objects.forEach(obj => {
      const collider = this.colliders.create(
        obj.x + obj.width / 2,
        obj.y + obj.height / 2,
        null
      )
        .setDisplaySize(obj.width, obj.height)
        .refreshBody()
        .setVisible(false); // true para debug
    });
  }

  _setupCamera(map) {
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(3);
    this.cameras.main.roundPixels = true;
  }
}