var myGamePiece;
var myObstacles = [];
var myScore;
var myHight;
var godmoder=0;
var Schnelle=1.5;
var Mengeangeg=200;
var zehl=0;
var mySkill;
var godindicator;
var Hindernissegesch;
function startGame() {
    myGamePiece = new component(10, 10, "#003b46", 500, 490);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "#07575b", 5, 30, "text");
    myHight = new component("30px", "Consolas", "#07575b", 5, 90, "text");
    mySkill = new component("30px", "Consolas", "#07575b", 5, 120, "text");
    godindicator = new component("30px", "Consolas", "Red", 250, 30, "text");
    Hindernissegesch =new component("30px", "Consolas", "#07575b", 5, 60, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1250;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea,2);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
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
            this.gravitySpeed = 0;
        }
    this.hitTop = function() {
        if(godmoder==0){
        if((Math.round(myGamePiece.y-490)/-1)>490){
            this.y=0;
            this.gravitySpeed=0.1;
        }
        }
    }
        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true
        if(godmoder==1){crash = false};
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(Mengeangeg)) {
        zehl++;
        if(zehl>=15){
        if(Schnelle<7){Schnelle += 0.2;console.log("Speed:"+Schnelle.toFixed(1)+"  Abstand:"+Mengeangeg)
        Mengeangeg-=2.5;}}
        console.log("Neue Hindernisse")
        
        x = myGameArea.canvas.width;
        minHeight = 100;
        maxHeight = 300;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 40;
        maxGap = 100;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "#c4dfe6", x, 0));
        myObstacles.push(new component(10, x - height - gap, "#c4dfe6", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -Schnelle;
        myObstacles[i].update();
    }

    //Anzeigen//
    myScore.text="Punkte: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    myHight.text="Höhe:"+Math.round(myGamePiece.y-490)/-1;
    if((Math.round(myGamePiece.y-490)/-1)==490){myHight.text="Höhe:"+Math.round(myGamePiece.y-490)/-1+" max"};
    myHight.update();
    if(zehl>=15){
        mySkill.text="ProMode";
    mySkill.update();
    }
    if(godmoder==1){
        godindicator.text="Godmode enabled"
        godindicator.update();
    }
    if(zehl<3){
        Hindernissegesch.text="Hindernisse: "+0;
    Hindernissegesch.update();
    }
    else{Hindernissegesch.text="Hindernisse: "+(zehl-2);
    Hindernissegesch.update();
}
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}
function godmode(m){
    if(m=1){ godmoder=1;
        console.log("Godmode");
    }
}