function Block(x, y){
    this.x = x;
    this.y = y;
    this.deleted = false;

    this.reset = function() { 
        this.x = x;
        this.y = y;  
        this.deleted = false;
    }

    this.show = function(i,j) { 
        let color = `rgba(${240-(y-blocksYGap)/2}, ${(y-blocksYGap)*1.5}, 0, 0.9)`;
        fill(color);

        rectMode(CENTER);
        rect(this.x, this.y, scl*3, scl, 2);
        fill(255); 
        textAlign(CENTER);
        // text(`${i}, ${j}`, this.x, this.y);
    }

}