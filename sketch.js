var waterImg, superImg, earthImg, moneyImg;
var endS, scoreS, earth;
var girl;
var moneyGroup;
var waterGroup;
var score = 0;
var gameState = "start";

function preload() {
  waterImg = loadImage("water.png");
  superImg = loadImage("super.png");
  earthImg = loadImage("earth.png");
  moneyImg = loadImage("money.png");
  endS = loadSound("end.wav");
  scoreS = loadSound("score.wav");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 110);

  girl = createSprite(700, 600, 10, 10);
  girl.addImage(superImg);
  girl.scale = 0.1;
  earth = createSprite(1000, 200);
  earth.addImage(earthImg);
  earth.scale = 0.5;
  earth.visible = false;

  waterGroup = createGroup();
  moneyGroup = createGroup();
}

function draw() {
  background(0);
  if (gameState === "start") {
    background(255);

    textFont("times new roman");
    fill(0);
    textSize(50);
    stroke(0);
    text("Conserwater", 500, 200);
    textSize(25);
    textFont("ink free");
    text(
      "There is enough on Earth for every man's need. But not enough to fulfill even one's greed.",
      200,
      300
    );
    textSize(25);
    text(
      "Conserving water is important because it keeps water pure and clean while protecting the environment.",
      100,
      400
    );
     text(
      "Conserving water means using our water supply wisely.",
      350,
      450
    );
    text(
      "Let's play a game to see if we can save our resouces for others or fulfill our greed. Press space to play.",
      150,
      500
    );
    earth.visible = false;

    girl.visible = false;
    if (keyDown(32)) {
      gameState = "play";
    }
  }
  if (gameState === "play") {
    girl.visible = true;
    textFont("ink free");
    fill(255);
    stroke(0);

    textSize(25);
    text("Score : " + score, 50, 50);

    spawnWater();
    spawnMoney();

    if (keyDown("right")) {
      girl.x = girl.x + 10;
    }
    if (keyDown("left")) {
      girl.x = girl.x - 10;
    }

    edges = createEdgeSprites();
    girl.collide(edges);

    if (girl.isTouching(waterGroup)) {
      waterGroup.destroyEach();
      score = score + 1;
      scoreS.play();
    }
    if (girl.isTouching(moneyGroup)) {
      moneyGroup.destroyEach();
      gameState = "over";
      endS.play();
    }
    earth.visible = false;
  }
  if (gameState === "over") {
    background(255);
    girl.visible = false;
    textFont("ink free");
    fill(0);
    textSize(25);
    stroke(0);

    text("Score : " + score, 50, 50);
    strokeWeight(2);
    textSize(30);
    text("Sorry! You Lost!", 600, 300);
    text(
      "But it doesn't stop here! Go teach the world to save water!",
      350,
      400
    );
    textSize(25);
    stroke(0);
    textFont("ink free");
    strokeWeight(1);
    text("Press Space to restart", 570, 600);
    earth.visible = true;

    if (keyDown(32)) {
      gameState = "play";
      earth.visible = false;
      score = 0;
    }
  }

  drawSprites();
}

function spawnWater() {
  if (frameCount % 10 === 0) {
    var random1 = random(50, 2000);
    var water = createSprite(random1, 0, 10, 10);
    water.addImage(waterImg);
    water.velocityY = 20;
    water.lifetime = 200;
    water.scale = 0.2;

    waterGroup.add(water);
  }
}

function spawnMoney() {
  if (frameCount % 10 === 0) {
    var random1 = random(50, 2000);
    var money = createSprite(random1, 0, 10, 10);
    money.addImage(moneyImg);
    money.velocityY = 20;
    money.lifetime = 200;
    money.scale = 0.05;

    moneyGroup.add(money);
  }
}
