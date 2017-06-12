document.addEventListener('DOMContentLoaded', function(){

  const canvas = document.querySelector('canvas');
  const speed = 1000 / 30;
  var options = {
    width: 600,
    height: 600,
    size: 30
  };

  class Game {
    constructor(canvas, options) {
      this.pixelWidth = options.width / options.size;
      this.pixelHeight = options.height / options.size;
      this.posX = 1;
      this.posY = 0;
      this.timer = 0;
      this.head = {
        x: 0,
        y: 0
      };

      this.ctx = canvas.getContext('2d');
      this.setCanvasSize();
      this.keyListener();
    }

    setCanvasSize() {
      canvas.width = options.width;
      canvas.height = options.height;
    }

    drawCanvas() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, options.width, options.height);
    }

    drawSnakeHead(x, y) {
      this.ctx.fillStyle = 'green';

      if(x + this.pixelWidth > canvas.width) {
        this.head.x = 0;
      } else if (x < 0) {
        this.head.x = canvas.width - this.pixelWidth;
      };

      if(y + this.pixelHeight > canvas.height) {
        this.head.y = 0;
      } else if (y < 0) {
        this.head.y = canvas.height - this.pixelHeight;
      };

      this.ctx.fillRect(x, y, this.pixelWidth, this.pixelHeight);
    }

    drawSnake() {
      this.drawSnakeHead(this.head.x + this.posX, this.head.y + this.posY);
    }

    keyListener() {
      document.addEventListener('keydown', this.control.bind(this));
    }

    control(key) {
      switch (key.keyCode) {
        case 37:
          this.setDirection('left');
          break;
        case 38:
          this.setDirection('top');
          break;
        case 39:
          this.setDirection('right');
          break;
        case 40:
          this.setDirection('bottom');
          break;
      }
    }

    setDirection(direction) {
      switch(direction){
        case 'top':
          this.posX = 0;
          this.posY = -1;
          break;
        case 'bottom':
          this.posX = 0;
          this.posY = 1;
          break;
        case 'left':
          this.posX = -1;
          this.posY = 0;
          break;
        case 'right':
          this.posX = 1;
          this.posY = 0;
      }
    }

    init() {
      this.drawCanvas();
      this.drawSnake();
      this.head.x += this.posX;
      this.head.y += this.posY;
      this.timer += 1;
    }
  }

  let game = new Game(canvas, options)
  let interval = setInterval(function(){
    game.init();
  }, speed);

  game.init();

  setTimeout(function(){
    clearInterval(interval);
  }, 10000);
})
