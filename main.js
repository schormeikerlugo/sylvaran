// main.js
import Phaser from 'phaser';
import { GameConfig } from './src/config/gameConfig.js';

// Escenas principales
import BootScene from './src/scenes/BootScene.js';
import PreloadScene from './src/scenes/PreloadScene.js';
import MenuScene from './src/scenes/MenuScene.js';

// Menú de niveles
import OverworldScene from './src/scenes/OverworldScene.js';

// ✅ Agregar escenas al GameConfig
GameConfig.scene = [BootScene, PreloadScene, MenuScene, OverworldScene];

// ✅ Crear instancia del juego con el GameConfig ya completo
new Phaser.Game(GameConfig);
