var wWidth = 800;
var wHeight = 600;
var scl = 20;
var r = scl/2;
var blocksXCount = 10;
var blocksYCount = 5;
var blocksYGap = 30;
var player;
var playerWidth = scl*4;
var playerHeight = scl;
var playerYpos = wHeight - scl*3;
var ball;
var blocks = [];
var bWidth = scl*3;
var bHeight = scl*2;
var bSpeed = 2.5;
var score = 0;
var life = 3;
var blocksCount = 100000000;
var gameState = "playing"; // "gameOver", "paused", "clear"
// var isGameOver = false;
// var isPaused = false;
// var isClear = false;

function setup() {
  createCanvas(wWidth, wHeight);
  player = new Player();
  ball = new Ball();
  resetBall();
  resetBlocks();

  // make 2D array
  for (let i = 0; i < blocksYCount; i++) {
    blocks[i] = [];
  }
  // fill array with blocks
  for (let i = 0; i < blocksYCount; i++) {
    for(let j = 0; j < blocksXCount; j++) {
      blocks[i][j] = new Block(wWidth/(blocksXCount+1)*(j+1), blocksYGap*(i+2))
    }
  }
}

function resetBall() {
  ball.reset();
  player.reset();
}

function resetBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    for(let j = 0; j < blocks[i].length; j++) {
      blocks[i][j].reset();
    }
  }
  blocksCount = blocksXCount * blocksYCount;
}

function draw() {
  switch(gameState){
    case "playing":
      background(40);
      noStroke();
      // move and draw player
      player.move();
      
      // move ball & reset if out of bounds
      if(ball.move()){
        resetBall();
        life-=1;
        if (life <= 0){
          gameState = "gameOver";
          return;  
        }
      }

      // draw ball
      player.show();
      ball.show();
      
      // player/ball collision detection
      let plE = player.x - playerWidth/2; // left edge of player
      let prE = player.x + playerWidth/2; // right edge of player
      let ptE = playerYpos - playerHeight/2; // top edge of player
      let pbE = playerYpos + playerHeight/2; // bottom edge of player
      if(ball.y + r >= ptE && // ball is below player top edge
          ball.x + r >= plE && 
          ball.x - r <= prE 
        ) {
        if(ball.checkPlayerHit(plE, prE, ptE)){
          console.log("player hit ball");
        } 
      } else {
        // if the ball wasn't hit by the player 
        // block/ball collision detection
        for (let i = 0; i < blocks.length; i++) {
          for(let j = 0; j < blocks[i].length; j++) {
            let lE = blocks[i][j].x - bWidth/2; // left edge of block
            let rE = blocks[i][j].x + bWidth/2; // right edge of block
            let tE = blocks[i][j].y - bHeight/2; // top edge of block
            let bE = blocks[i][j].y + bHeight/2; // bottom edge of block

            // if ball is within block boundaries
            if (blocks[i][j].deleted) {
              continue; // ignore block if it has been deleted
            }
            if (ball.x + r > lE &&  // ball within left edge of block
                ball.x - r < rE &&  // ball within right edge of block
                ball.y + r > tE &&  // ball within top edge of blcok
                ball.y - r < bE     // ball within bottom edge of block
              ) {
              if(ball.checkBlockHit(lE, rE, tE, bE)){
                console.log("hit block", i, j);
                blocks[i][j].deleted = true;
                blocksCount--;
                if(blocksCount <= 0) {
                  gameState = "clear";
                }
              }
            }
          }
        }
      }
      

      // display blocks
      for (let i = 0; i < blocksYCount; i++) {
        for(let j = 0; j < blocksXCount; j++) {
          if (!blocks[i][j].deleted){
            blocks[i][j].show(i,j);
          }
        }
      }

      // display score
      let tSize = 20;
      textSize(tSize);
      textAlign(RIGHT);
      text(`score: ${score} `, wWidth, wHeight-tSize/2);

      // display remaining life
      for (let i = 0; i < life; i++) {
        let lTop = wHeight - tSize*1.2;
        let lBot = wHeight - tSize/3;
        strokeWeight(3);
        stroke(50, 150, 200);
        line(tSize/2 + scl*(i+0.3), lTop, tSize/2 + scl*i, lBot);
      }
      break;

    case "paused":
      textSize(40);
      textAlign(CENTER);
      text('PAUSE\npress ESC to resume', wWidth/2, wHeight/2)
      break;

    case "gameOver":
      textAlign(CENTER);
      textSize(40);
      fill(255, 50, 50);
      text('GAME OVER', wWidth/2, wHeight/2 - 40);
      textSize(20);
      fill(240 );
      text(`\n\nscore: ${score}\npress  [SPACE]  to play again`, wWidth/2, wHeight/2); 
      break;

    case "clear":
      textAlign(CENTER);
      textSize(40);
      fill(50, 250, 50);
      text('GAME CLEAR', wWidth/2, wHeight/2 - 40);
      textSize(20);
      fill(240 );
      text(`\n\nscore: ${score}\npress  [SPACE]  to play again`, wWidth/2, wHeight/2); 
      break;

    default:
      console.log("game state not defined");
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if(gameState === "paused") {    
      gameState = "playing";
    } else if (gameState === "playing") {
      gameState = "paused";
    } 
  }
  if (gameState === "gameOver" || gameState === "clear") {
    if(keyCode === 32){
      console.log("play again");
      resetBall();
      resetBlocks();
      life = 3;
      score = 0; 
      gameState = "playing";
    }
  }
}

// TODO
// [x] move player continuously
// [x] launch ball
// [x] reflect off player
// [x] gameover & reset
// [ ] manage score
// [ ] change ball reflection according to player speed and direction
// [ ] game ui