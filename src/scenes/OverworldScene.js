// src/scenes/OverworldScene.js
import BaseMapScene from '../config/BaseMapScene.js';

export default class OverworldScene extends BaseMapScene {
  constructor() {
    super('OverworldScene');

    this.mapKey = 'overworld';
    this.playerStart = { x: 1000, y: 1000 };
    this.backgroundMusicKey = 'overworldMusic'; // 🎵 Música específica de esta escena

    this.tilesetsData = [
      { nameInTiled: 'TX Plant', keyInPhaser: 'TX Plant' },
      { nameInTiled: 'TX Plant with Shadow', keyInPhaser: 'TX Plant with Shadow' },
      { nameInTiled: 'TX Props', keyInPhaser: 'TX Props' },
      { nameInTiled: 'TX Props with Shadow', keyInPhaser: 'TX Props with Shadow' },
      { nameInTiled: 'TX Shadow', keyInPhaser: 'TX Shadow' },
      { nameInTiled: 'TX Shadow Plant', keyInPhaser: 'TX Shadow Plant' },
      { nameInTiled: 'TX Struct', keyInPhaser: 'TX Struct' },
      { nameInTiled: 'TX Tileset Grass', keyInPhaser: 'TX Tileset Grass' },
      { nameInTiled: 'TX Tileset Stone Ground', keyInPhaser: 'TX Tileset Stone Ground' },
      { nameInTiled: 'TX Tileset Wall', keyInPhaser: 'TX Tileset Wall' }
    ];

    this.layerOrder = [
      'Grass_base',
      'Grass_animation',
      'piso externo',
      'piso_interno',
      'Plant',
      'Struct1',
      'Struct',
      'shadow',
      'bush',
      'signal',
      'objetos'
    ];
  }

  preload() {
    this.load.tilemapTiledJSON('overworld', 'assets/maps/overworld.json');

    this.tilesetsData.forEach(tileset =>
      this.load.image(tileset.keyInPhaser, `assets/tilesets/${tileset.keyInPhaser}.png`)
    );

    this.load.spritesheet('player', 'assets/objects/player/player.png', {
      frameWidth: 64,
      frameHeight: 64
    });

  // 🎵 Cargar música de fondo
  this.load.audio('overworldMusic', 'assets/audio/overworld/background.ogg');
  }
}