psiApp.factory('GameComponentService',[function(){
	

	this.initComponent = function(width, height, color, x, y, type) {
		this.type = type;
	
		if (type == "image" || type == "background") {
			this.image = new Image();
			this.image.src = color;
		}
		
	    this.width = width;
	    this.height = height;
	    this.x = x;
	    this.y = y;
	    this.gravity = 0.05;
	    this.gravitySpeed = 0;
	    this.bounce = 0.6;
		
	    this.speedX = 0;
	    this.speedY = 0;
	}
	
	this.update = function() {
		ctx = myGameArea.context;
		if (type == "image") {
			ctx.drawImage(this.image,
				this.x,
				this.y,
				this.width, this.height);
			return;
		}
		if(type == "background") {
			var maxLoop = myGameArea.canvas.width/this.width;
			var verLoop = myGameArea.canvas.height/this.height;
			for(i=0;i<maxLoop+1;i++) {
				ctx.drawImage(this.image,
					this.x + this.width*i,
					this.y,
					this.width, this.height);
				for(j=0;j<verLoop+1;j++) {
					ctx.drawImage(this.image,
						this.x + this.width*i,
						this.y + this.width*j,
						this.width, this.height);
				}
			}
			return;
		}
		if(this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
			return;
		}
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
    this.newPos = function() {
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
			return;
        }
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed; 
        this.hitBottom();
    } 
		
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }
	
	this.crash = function(other) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = other.x;
        var otherright = other.x + (other.width);
        var othertop = other.y;
        var otherbottom = other.y + (other.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
	}
	
	
	this.passOver = function(other) {
        var myleft = this.x;
        var otherright = other.x + (other.width);
        return myleft > otherright;
	}
}
