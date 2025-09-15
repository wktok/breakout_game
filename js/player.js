function Player() {
    this.x = wWidth/2;

    this.reset = function() {
        this.x = wWidth/2;
    }

    this.move = function() {
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A key
            this.x -= scl/2;
            this.x = constrain(this.x, 0 + playerWidth/2, wWidth - playerWidth/2);
        } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
            this.x += scl/2;
            this.x = constrain(this.x, 0 + playerWidth/2, wWidth - playerWidth/2);
        } else {
            this.x += 0;
        }   
    }

    this.show = function() {
        fill(50, 150, 200);
        rectMode(CENTER);
        rect(this.x, playerYpos, playerWidth, playerHeight, 2);
    }
}