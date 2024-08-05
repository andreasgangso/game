
export class Game extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
  }

  create(data) {
    this.circle = this.add.circle(100, 100, 50, 0xff0000,);
    this.circle.setDepth(10)
    this.physics.add.existing(this.circle)

    this.circle.setInteractive();
    this.circle.on('pointerdown', () => {
      this.circle.setScale(5)
      this.gameOver();
    })

    const { width, height } = this.cameras.main;

    this.things = [];
    this.lastThing = null;
    this.interval = setInterval(() => {
      var x = Math.random() * width
      var y = Math.random() * height
      var thing = this.add.circle(x, y, 50, 0x999999);
      this.physics.add.existing(thing)
      thing.setInteractive();
      thing.on('pointerdown', () => {
        thing.destroy();
        this.things.splice(this.things.findIndex((v) => v == thing), 1);
      })
      this.things.push(thing);
      this.lastThing = thing;
    }, 1000)

    this.score = 0;
    this.health = 100;
    this.healthBar = this.add.rectangle(this.cameras.main.centerX, 10, width, 30, 0xff0000)
  }

  update(time, delta) {
    this.score = time;
    this.healthBar.width = this.cameras.main.width * (this.health / 100)
    if (this.things.length > 1) {
      this.health -= 0.06 * delta;
    }
    if (this.lastThing) {
      this.physics.moveToObject(this.circle, this.lastThing, 500, 600)
    }
    if (this.health <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.scene.pause();
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 300, "Game over", { font: "65px Arial", fill: "#ff0044" })
    this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY, "Score: " + this.score / 1000, { font: "65px Arial", fill: "#ff0044" })

    clearInterval(this.interval);
  }

}
