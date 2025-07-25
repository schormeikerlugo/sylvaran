// src/config/AnimatedTiles.js (o plugins, como prefieras)

export default {
  init(scene, tilemap) {
    if (!tilemap) {
      console.warn('AnimatedTiles: Tilemap not provided.');
      return;
    }

    const animatedTiles = [];

    tilemap.layers.forEach(layerData => {
      const layer = scene.children.getByName(layerData.name);
      if (!layer || !layer.layer || !layer.layer.data) return;

      layer.layer.data.forEach(row => {
        row.forEach(tile => {
          if (!tile || !tile.tileset || !tile.tileset.tileData) return;
          const tileData = tile.tileset.tileData[tile.index - tile.tileset.firstgid];
          if (tileData && tileData.animation) {
            animatedTiles.push({
              tile,
              frames: tileData.animation.map(frame => frame.tileid + tile.tileset.firstgid),
              durations: tileData.animation.map(frame => frame.duration),
              currentFrame: 0,
              timer: 0
            });
          }
        });
      });
    });

    scene.events.on('update', (time, delta) => {
      animatedTiles.forEach(anim => {
        anim.timer += delta;
        if (anim.timer > anim.durations[anim.currentFrame]) {
          anim.timer = 0;
          anim.currentFrame = (anim.currentFrame + 1) % anim.frames.length;
          anim.tile.index = anim.frames[anim.currentFrame];
        }
      });
    });
  }
};