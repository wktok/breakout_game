function Ball() {
    this.x = wWidth/2;
    this.y = playerYpos - r*2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.atStart = true;

    this.reset = function() {
        this.x = wWidth/2;
        this.y = playerYpos - r*2;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.atStart = true;
    }

    this.move = function() {
        // if at start, move with player
        if (this.atStart) {
            this.x = player.x;
            if (keyIsDown(32)) { // space key
                this.atStart = false;
                this.xSpeed = bSpeed*2;
                this.ySpeed = bSpeed*-3;
            } 
            return false;
        }

        else {
            // move ball
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            // bounce off side or top
            if (this.x > wWidth - scl/2 || this.x < scl/2) {
                this.xSpeed *= -1;
            } else if (this.y < scl/2) {
                if(this.ySpeed < 0) this.ySpeed *= -1;
            } 
            // reset if off bottom
            if (this.y > wHeight - scl/2) {
                return true; // trigger gaeme reset
            }
            return false;
        }

    }

    this.checkPlayerHit = function(leftEdge, rightEdge, topEdge, bottomEdge) {
        if (this.y + r > topEdge && this.y < topEdge) {
            // circle hit top edge
            this.ySpeed *= -1;
            return true;
        } else if (this.x + r > leftEdge && this.x < leftEdge){
            // circle hit left edge
            if(this.xSpeed > 0) { // if ball is moving to the right
                this.xSpeed *= -1;
            } 
            return true;
        } else if (this.x - r < rightEdge && this.x > rightEdge){ 
            // circle hit right edge
            if(this.xSpeed < 0) { // if ball is moving to the right
                this.xSpeed *= -1;
            } 
            return true;
        } 
    }

    this.checkBlockHit = function(leftEdge, rightEdge, topEdge, bottomEdge) {
        if (this.x + r > leftEdge && this.x < leftEdge){
            // circle hit left edge
            this.xSpeed *= -1;
            return true;
        } else if (this.x - r < rightEdge && this.x > rightEdge){ 
            // circle hit right edge
            this.xSpeed *= -1;
            return true;
        } else if (this.y + r > topEdge && this.y < topEdge) {
            // circle hit top edge
            this.ySpeed *= -1;
            return true;
        } else if (this.y - r < bottomEdge && this.y > bottomEdge) {
            // circle hit bottom edge while moving upwards 
            this.ySpeed *= -1;
            return true;
         }
    }

    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, scl, scl);
    }
}

