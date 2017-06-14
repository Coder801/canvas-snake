document.addEventListener('DOMContentLoaded', function(){

  const canvas = document.querySelector('canvas');
  const speed = 1000 / 60;
  var options = {
    size: 600,
    fractions: 25
  };

  class Game {
    constructor(canvas, options) {
      this.fraction = options.size / options.fractions;

      this.stepX = 0;
      this.stepY = 0;
      this.stepInCell = 0;
      this.currentDirection = 'bottom';
      this.newDirection = '';

      this.head = {
        x: 24,
        y: 24
      };

      this.ctx = canvas.getContext('2d');
      this.setCanvasSize();
      this.setDirection(this.currentDirection);
      this.keyListener();
    }

    drawGrid() {

    }

    setCanvasSize() {
      canvas.width = options.size;
      canvas.height = options.size;
    }

    drawCanvas() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, options.size, options.size);
    }

    drawSnakeHead(x, y) {
      this.ctx.fillStyle = 'green';
      if(x + this.fraction > options.size) {
        this.head.x = 0;
      } else if (x < 0) {
        this.head.x = options.size - this.fraction;
      };

      if(y + this.fraction > options.size) {
        this.head.y = 0;
      } else if (y < 0) {
        this.head.y = options.size - this.fraction;
      };

      this.ctx.fillRect(x, y, this.fraction, this.fraction);
    }

    drawSnake() {
      this.drawSnakeHead(this.head.x + this.stepX, this.head.y + this.stepY);
    }

    keyListener() {
      document.addEventListener('keydown', this.control.bind(this));
    }

    control(key) {
      switch (key.keyCode) {
        case 37:
          this.newDirection = 'left';
          break;
        case 38:
          this.newDirection = 'top';
          break;
        case 39:
          this.newDirection = 'right';
          break;
        case 40:
          this.newDirection = 'bottom';
          break;
      }
    }

    changeDirection(x, y, newDirection) {
      this.stepX = x;
      this.stepY = y;
      this.currentDirection = newDirection;
    }

    setDirection(newDirection) {
      switch(true){
        case newDirection === 'top' && this.currentDirection !== 'bottom':
          this.changeDirection(0, -1, newDirection);
          break;
        case newDirection === 'bottom' && this.currentDirection !== 'top':
          this.changeDirection(0, 1, newDirection);
          break;
        case newDirection === 'left' && this.currentDirection !== 'right':
          this.changeDirection(-1, 0, newDirection)
          break;
        case newDirection === 'right' && this.currentDirection !== 'left':
          this.changeDirection(1, 0, newDirection)
      }
    }

    init() {
      this.drawCanvas();
      this.drawSnake();
      this.head.x += this.stepX;
      this.head.y += this.stepY;
      if(!(this.stepInCell % this.fraction)) {
        this.setDirection(this.newDirection)
        this.stepInCell = 0
      }
      this.stepInCell += 1;
    }
  }

  let game = new Game(canvas, options)
  let interval = setInterval(function(){
    game.init();
  }, speed);

  game.init();

  setTimeout(function(){
    clearInterval(interval);
  }, 50000);
})
