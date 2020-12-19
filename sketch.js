const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var birds = [];

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

var birdFlyingSound, birdSelectSound, pigSnortSound;

function preload() {
    getBackgroundImg();

    birdFlyingSound = loadSound("sprites/bird_flying.mp3");
    birdSelectSound = loadSound("sprites/bird_select.mp3");
    pigSnortSound = loadSound("sprites/pig_snort.mp3");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150, 170);
    bird3 = new Bird(100, 170);
    bird4 = new Bird(50, 170);

    birds.push(bird4);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);

    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(28)
        fill("white")
        text("Score: " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(birds[birds.length-1].body, birds[birds.length-1].body.position, {x:5, y:-5});
        birdSelectSound.play();
    //}
}


function mouseReleased(){
    slingshot.fly();
    birds.pop();
    gameState = "launched";

    birdFlyingSound.play();
}

function keyPressed(){
    if(keyCode == 32 && gameState == "launched"){
        if(birds.length >= 0){
            bird.trajectory = [];
            bird2.trajectory = [];
            bird3.trajectory = [];
            bird4.trajectory = [];
            Matter.Body.setPosition(birds[birds.length-1].body, {x:200, y: 50});
            slingshot.attach(birds[birds.length-1].body);
            gameState = "onSling";
        }
    }
}

async function getBackgroundImg() {
    var worldTimeResponse = await fetch("http://worldtimeapi.org/api/timezone/America/Los_Angeles");
    var worldTimeResponseJSON = await worldTimeResponse.json();

    var dateTime = await worldTimeResponseJSON.datetime;
    var hour = dateTime.slice(11,13);
    
    if(hour >= 06 && hour <= 17) {
        bg = "sprites/bg.png";
    }
    else {
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
}