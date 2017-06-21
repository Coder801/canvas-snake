document.addEventListener('DOMContentLoaded', function(){

  const canvas = document.querySelector('canvas');
  const speed = 1000 / 20;
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
      this.currentDirection = 'top';
      this.newDirection = '';
      this.length = 1;
      this.snakeTail = [];
      this.snakeOldPosition = [];

      this.head = {
        x: this.fraction,
        y: this.fraction * 5
      };

      this.ctx = canvas.getContext('2d');
      this.setCanvasSize();
      this.setDirection(this.currentDirection);
      this.drawSnakeHead();
      this.drawSnakeTail();
      this.keyListener();
    }

    setCanvasSize() {
      canvas.width = options.size;
      canvas.height = options.size;
    }

    drawCanvas() {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, options.size, options.size);
    }

    drawSnakeTail() {
      /*
      for(let i = 0; i < this.length; i += 1) {
        let tailFractionX = this.stepX ? this.head.x + this.fraction * i : this.head.x;
        let tailFractionY = this.stepY ? this.head.y + this.fraction * i : this.head.y;
        this.snakeTail.push({
          x: tailFractionX,
          y: tailFractionY
        })
        this.drawSnakeFraction(this.snakeTail[i].x, this.snakeTail[i].y)
      } */

      this.snakeTail.forEach(item => {
        this.drawSnakeFraction(item.x, item.y--);
      })
    }

    drawSnakeHead(x, y) {
      if(x > options.size) {
        this.head.x = 0;
      } else if (x + this.fraction < 0) {
        this.head.x = options.size - this.fraction;
      };

      if(y > options.size) {
        this.head.y = 0;
      } else if (y + this.fraction < 0) {
        this.head.y = options.size - this.fraction;
      };

      if(x < 0) {
        this.drawSnakeFraction(options.size + x, y);
      } else if (x + this.fraction > options.size) {
        this.drawSnakeFraction(x - options.size, y);
      }

      if(y < 0) {
        this.drawSnakeFraction(x, options.size + y);
      } else if (y + this.fraction > options.size) {
        this.drawSnakeFraction(x, y - options.size);
      }
      this.drawSnakeFraction(x, y)
    }

    drawSnakeFraction(x, y) {
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(x, y, this.fraction, this.fraction);
    }

    drawSnake() {
      this.drawSnakeHead(this.head.x + this.stepX, this.head.y + this.stepY);
      this.drawSnakeTail();
      //this.drawSnakeTail();
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
        case 32:
          clearInterval(interval)
          break;
      }
    }

    changeDirection(x, y, newDirection) {
      this.stepX = x;
      this.stepY = y;
      this.currentDirection = newDirection;
    }

    savePosition(x, y) {
      this.snakeTail.push({x: x, y: y});
      if(this.length < this.snakeTail.length) {
        this.snakeTail.shift();
      }
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
      this.drawSnakeTail();
      if(!(this.stepInCell % this.fraction)) {
        this.setDirection(this.newDirection);
        this.savePosition(this.head.x, this.head.y);
        this.stepInCell = 0
      }
      this.stepInCell += 1;
    }
  }

  let game = new Game(canvas, options)
  let interval = setInterval(function(){
    try {
      game.init();
    } catch(err) {
      clearInterval(interval);
    }
  }, speed);

  game.init();

  setTimeout(function(){
    clearInterval(interval);
  }, 5000);

})
