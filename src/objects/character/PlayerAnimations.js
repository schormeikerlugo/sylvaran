export function createPlayerAnimations(scene) {
  const anims = scene.anims;
  const frameRate = 10;
  const repeat = -1;

  // WALK Animations
  
  anims.create({
    key: 'walk-up',
    frames: anims.generateFrameNumbers('player', { start: 0, end: 5 }),
    frameRate,
    repeat
  });

  anims.create({
    key: 'walk-left',
    frames: anims.generateFrameNumbers('player', { start: 6, end: 11 }),
    frameRate,
    repeat
  });

  anims.create({
    key: 'walk-down',
    frames: anims.generateFrameNumbers('player', { start: 12, end: 17 }),
    frameRate,
    repeat
  });

  anims.create({
    key: 'walk-right',
    frames: anims.generateFrameNumbers('player', { start: 18, end: 23 }),
    frameRate,
    repeat
  });

  // IDLE Animations (1 frame por dirección)

  anims.create({
    key: 'idle-up',
    frames: [ { key: 'player', frame: 0 } ]
  });

  anims.create({
    key: 'idle-left',
    frames: [ { key: 'player', frame: 6 } ]
  });

  anims.create({
    key: 'idle-down',
    frames: [ { key: 'player', frame: 12 } ]
  });

  anims.create({
    key: 'idle-right',
    frames: [ { key: 'player', frame: 18 } ]
  });
}
