class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    // movement
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // check if off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.6;
    this.speedX = Math.random() + 2;
    this.speedY = 0;

    this.angle = 0;
    this.va = Math.random() + 0.1;
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class Fly extends FlyingEnemy {
  constructor(game) {
    super(game);
    this.width = 60;
    this.height = 44;
    this.maxFrame = 5;
    this.image = new Image();
    this.image.src = "./assets/img/enemy_fly.png";
  }
}

export class Bat extends FlyingEnemy {
  constructor(game) {
    super(game);
    this.width = 69.33;
    this.height = 49;
    this.maxFrame = 5;
    this.image = new Image();
    this.image.src = "./assets/img/enemy_bat_3.png";
  }
}

export class Ghost extends FlyingEnemy {
  constructor(game) {
    super(game);
    this.width = 87.33;
    this.height = 70;
    this.maxFrame = 5;
    this.image = new Image();
    this.image.src = "./assets/img/enemy_ghost_3.png";
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.x = this.game.width + Math.random() * 100;
    this.speedY = 0;
  }
}

export class Plant extends GroundEnemy {
  constructor(game) {
    super(game);
    this.width = 60;
    this.height = 87;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = new Image();
    this.image.src = "./assets/img/enemy_plant.png";
    this.speedX = 0;
    this.maxFrame = 1;
  }
}

export class GroundZombie extends GroundEnemy {
  constructor(game) {
    super(game);
    this.width = 120.125;
    this.height = 90;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = new Image();
    this.image.src = "./assets/img/enemy_ground_zombie.png";
    this.speedX = 0;
    this.maxFrame = 1;
  }
}

export class Zombie extends GroundEnemy {
  constructor(game) {
    super(game);
    this.width = 106.875;
    this.height = 150;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = new Image();
    this.image.src = "./assets/img/enemy_zombie.png";
    this.speedX = Math.random() + 2;
    this.maxFrame = 7;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.speedY *= -1;
    if (this.y < -this.height) this.markedForDeletion = true;
  }

  draw(context) {
    super.draw(context);
    context.beginPath();
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + this.height / 3);
    context.stroke();
  }
}

export class BigSpider extends ClimbingEnemy {
  constructor(game) {
    super(game);
    this.width = 120;
    this.height = 144;
    this.x = this.game.width + Math.random() * 50;
    this.y = Math.random() * this.game.height * 0.5;
    this.image = new Image();
    this.image.src = "./assets/img/enemy_spider_big.png";
  }
}

export class SmallSpider extends ClimbingEnemy {
  constructor(game) {
    super(game);
    this.width = 124;
    this.height = 70;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.image = new Image();
    this.image.src = "./assets/img/enemy_spider.png";
  }
}