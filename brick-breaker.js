let playerScore = 0;
let paddle;
let ball;
let bricks = []
let gameState

function setup(){
    createCanvas(800,600);

    let colors = []
    colors.push(color(135,206,250))
    colors.push(color(124,252,0))
    colors.push(color(255,4,240))
    colors.push(color(255,69,0))

    gameState = 'playing'
    paddle = new Paddle();
    ball = new Ball(paddle);
    bricks = createBricks(colors);
}

function createBricks(colors){
  const bricks = []
  const rows = 5;
  const bricksPerRow = 10;
  const brickWidth = width / bricksPerRow;
  for(let row = 0; row < rows; row++){
  for(let i = 0; i < bricksPerRow; i++){
  brick = new Brick(createVector(brickWidth * i, 25 * row),brickWidth,25, colors[floor(random(0, colors.length - 1))]);
  bricks.push(brick)
      }
    }
    return bricks;
}

function draw(){
  if (gameState === 'playing') {
    background(0);
    

    ball.bounceEdge();
    ball.bouncePaddle();

    
    ball.update();
    
    if (keyIsDown(LEFT_ARROW)) {
        paddle.move('left');
      }else if (keyIsDown(RIGHT_ARROW)) {
        paddle.move('right');
      }

   
     // bricks.forEach(brick => {
     //   brick.display()
     //   brick.collide(ball)
     // })
     for(let i = bricks.length - 1;i >= 0; i-- ){
       const brick = bricks[i];
       if (brick.isColliding(ball)){
         ball.reverse('y')
         bricks.splice(i, 1);
         playerScore += brick.points;
       }else{
        brick.display()
       }

     } 

     paddle.display();
     ball.display();

     

      textSize(32);
      fill(255);
      text(`Score:${playerScore}`, width - 150, 50);

      if(ball.belowBottom()){
        gameState = 'TRY AGAIN..';
      }

      if(bricks.length === 0){
        gameState = 'BOOYAH!';
 
      }
      
    }else{
      textSize(80);
       gameState === 'TRY AGAIN..' ? fill(255, 0, 0) : fill(255);
       text(`${gameState}`, width / 2 - 200, height / 2);
    }
      
}

