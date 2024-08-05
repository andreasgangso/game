import { Game } from "./main_scene.js";

export const config = {
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE
    },
    backgroundColor: '#f9f9f9',
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    fps: {
        target: 30,
        min: 30,
    },
    scene: [Game]
};
