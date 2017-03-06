psiApp.controller('GameCtrl', function($scope, $state,$ionicGesture) {


    $scope.$on('$ionicView.beforeEnter', function() {
        screen.lockOrientation('landscape');
        console.log('enter - lock');
    });

    $scope.$on('$ionicView.afterLeave', function() {
        screen.unlockOrientation();
        console.log('leave - unlock')
    });

var myGamePiece;
var myObstacles = [];
var myScore;
var windowWidth = window.innerHeight;
var windowHeight = window.innerWidth;
// var windowWidth = window.innerWidth;
// var windowHeight = window.innerHeight;

var BACKGROUND_IMAGE = "resources/img/background.jpg";
var BLUE_SPACESHIPT_IMAGE = "resources/img/blue-spaceship.png";
var FLYING_SPACESHIPT_IMAGE = "resources/img/flying-spaceship.png";

$scope.backToHome = function() {
    $state.go('tab.home');
}

$scope.restartGame = function() {
    document.getElementById("myfilter").style.display = "none";
    document.getElementById("myrestartbutton").style.display = "none";
    myGameArea.stop();
    myGameArea.clear();
    myGamePiece = {};
    myObstacles = [];
    myscore = 0;
    document.getElementById("canvascontainer").innerHTML = "";
    startGame();
}

function startGame() {
    myBackground = new component(160, 270, BACKGROUND_IMAGE, 0, 0, "background");
    myGamePiece = new component(50, 30, BLUE_SPACESHIPT_IMAGE, windowWidth/2.5, windowHeight/2, "image");
    myScore = new component("30px","Consolas", "red", windowWidth - 200, 40, "text");
    
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = windowWidth;
        this.canvas.height = windowHeight;
        this.frameNo = 0; 
        this.pass = 0;
        this.touched = false;
        this.context = this.canvas.getContext("2d"); 
        document.getElementById("canvascontainer").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        
        // window.addEventListener('keydown', function (e) {
        //     myGameArea.keys = (myGameArea.keys || []);
        //     myGameArea.keys[e.keyCode] = true;
        // });
        // window.addEventListener('keyup', function (e) {
        //     myGameArea.keys[e.keyCode] = false;
        // });
        // window.addEventListener('mousedown', function (e) {
        //     myGameArea.mouse = e.which;
        // });
        // window.addEventListener('mouseup', function (e) {
        //     myGameArea.mouse = false;
        // });

        var element = angular.element(document.getElementById("content"));
        $ionicGesture.on('tap', function(e) {
            myGameArea.touched = true;
         }, element);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {     
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function component(width, height, color, x, y, type) {
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
    this.bounce = 0.5;
    
    this.speedX = 0;
    this.speedY = 0;
    
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
        this.hitTop();
    } 
        
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }

    this.hitTop = function() {
        var rockTop = 0;
        if (this.y < rockTop) {
            this.y = rockTop;
            this.gravitySpeed = (this.bounce);
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

function updateGameArea() {

    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crash(myObstacles[i])) {
            myGameArea.stop();
            document.getElementById("myfilter").style.display = "block";
            document.getElementById("myrestartbutton").style.display = "block";           
            return;
        }
    }
    if(myObstacles.length > 0 && myGamePiece.passOver(myObstacles[myGameArea.pass])) {
        myGameArea.pass++;
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;

        minGap = 100;
        maxGap = 150;
        gap = Math.floor(Math.random()*(maxGap - minGap)+minGap);

        minHeight = 50;
        maxHeight = myGameArea.canvas.height;
        height = Math.floor(Math.random()*(maxHeight - minHeight - maxGap) + minHeight);
        myObstacles.push(new component(10, height, "green", x, 0, "obstacle"));
        myObstacles.push(new component(10, maxHeight - height - gap, "green", x, height + gap, "obstacle"));
    }

    myBackground.speedX = -1; 
    myBackground.newPos();
    myBackground.update();
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    
    clearmove(); 
    // if (myGameArea.keys && myGameArea.keys[37]) {move("left"); }
    // if (myGameArea.keys && myGameArea.keys[39]) {move("right"); }
    // if (myGameArea.keys && myGameArea.keys[38]) {accelerate(-0.3);  } else {accelerate(0.1);} // {move("up"); }
    //if (myGameArea.keys && myGameArea.keys[40]) {move("down"); }
    //if(myGameArea.mouse && myGameArea.mouse == 1) {accelerate(-0.3);  } else {accelerate(0.1);}
    
    if (myGameArea.touched) {accelerate(-5);  myGameArea.touched=false;} else {accelerate(0.1);} 

    myScore.text = "SCORE: " + myGameArea.pass/2; //Because there are two obstacles drew each time (1 up, 1 down)
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    
}

function accelerate(n) {    
    // myGamePiece.image.src = n>0 ? BLUE_SPACESHIPT_IMAGE:FLYING_SPACESHIPT_IMAGE;
    myGamePiece.gravity = n;
}

function move(dir) {
    // myGamePiece.image.src = FLYING_SPACESHIPT_IMAGE;
    if (dir == "up") {myGamePiece.speedY = -1; }
    if (dir == "down") {myGamePiece.speedY = 1; }
    if (dir == "left") {myGamePiece.speedX = -1; }
    if (dir == "right") {myGamePiece.speedX = 1; }
}

function clearmove() {
    myGamePiece.image.src = BLUE_SPACESHIPT_IMAGE;
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

startGame();
});