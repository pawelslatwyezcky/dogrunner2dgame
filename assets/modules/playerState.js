import {
  Dust,
  Fire,
  Splash,
} from "/dogrunner2dgame/assets/modules/particles.js";

const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends State {
  constructor(game) {
    super("SITTING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 5;
  }

  handleInput(input) {
    if (
      (input.includes("ArrowLeft") && !this.game.gameStart) ||
      (input.includes("ArrowRight") && !this.game.gameStart)
    ) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes("Control")) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Running extends State {
  constructor(game) {
    super("RUNNING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 3;
  }

  handleInput(input) {
    this.game.particles.push(
      new Dust(
        this.game,
        this.game.player.x + 25,
        this.game.player.y + this.game.player.height - 5
      )
    );
    if (input.includes("ArrowDown")) {
      this.game.player.setState(states.SITTING, 0);
    } else if (input.includes("ArrowUp") && this.game.player.onGround()) {
      this.game.player.setState(states.JUMPING, 1);
    } else if (input.includes("Control")) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Jumping extends State {
  constructor(game) {
    super("JUMPING", game);
  }

  enter() {
    if (this.game.player.onGround()) this.game.player.vy -= 25;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 1;
  }

  handleInput(input) {
    if (input.includes("Control") && input.includes("ArrowDown")) {
      this.game.player.setState(states.DIVING, 0);
    } else if (input.includes("Control")) {
      this.game.player.setState(states.ROLLING, 2);
    } else if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(states.FALLING, 1);
    }
  }
}

export class Falling extends State {
  constructor(game) {
    super("FALLING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 2;
  }

  handleInput(input) {
    if (input.includes("Control") && input.includes("ArrowDown")) {
      this.game.player.setState(states.DIVING, 0);
    } else if (input.includes("Control")) {
      this.game.player.setState(states.ROLLING, 2);
    } else if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    }
  }
}

export class Rolling extends State {
  constructor(game) {
    super("ROLLING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
  }

  handleInput(input) {
    this.game.particles.push(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width / 2,
        this.game.player.y + this.game.player.height / 2
      )
    );
    if (!input.includes("Control") && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (!input.includes("Control") && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1);
    } else if (
      input.includes("Control") &&
      input.includes("ArrowUp") &&
      this.game.player.onGround()
    ) {
      this.game.player.vy -= 25;
    }
  }
}

export class Diving extends State {
  constructor(game) {
    super("DIVING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
    this.game.player.vy = 15;
  }

  handleInput(input) {
    this.game.particles.push(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width / 2,
        this.game.player.y + this.game.player.height / 2
      )
    );
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
      for (let i = 0; i < 30; i++) {
        this.game.particles.push(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width / 2,
            this.game.player.y + this.game.player.height / 2
          )
        );
      }
    } else if (input.includes("Control") && this.game.player.onGround()) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

export class Hit extends State {
  constructor(game) {
    super("HIT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 10;
    this.game.player.frameY = 4;
  }

  handleInput(input) {
    if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 0);
    }
  }
}
