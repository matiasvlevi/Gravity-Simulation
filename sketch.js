let nb = 25;
let balls = [];
let zoom = 0.1;
let isMDragged = false;
let synthIndex = 0;
let Xvelmult = 1;
let Yvelmult = 1;
let followStar = false;
let spawnMass = 100;
let mode = false;
let spawnEnable = false;
let showstats = false;

function setup() {
   createCanvas(1880,780);
   //TwoSolarSystems();
   //SolarSystem();
   //bh();
   //bhOrbit();
   //TWObh();
   //BinaryStarSystem();
   //Star();
   //Asteroids();
   createP('Presets');
   var b1 = createButton("Solar System");
   b1.mousePressed(SolarSystem);
   var b2 = createButton("Two Solar Systems");
   b2.mousePressed(TwoSolarSystems);
   var b3 = createButton("Binary System");
   b3.mousePressed(BinaryStarSystem);
   var b4 = createButton("Star");
   b4.mousePressed(Star);
   var b5 = createButton("Blackhole");
   b5.mousePressed(bh);
   var b6 = createButton("Two Blackholes");
   b6.mousePressed(TWObh);
   var b7 = createButton("Asteroids");
   b7.mousePressed(Asteroids);
   var b8 = createButton("Blackhole & Asteroids");
   b8.mousePressed(bhOrbit);
   setp = createP('Settings');
   setp.position(880,795);
   var b9 = createButton("Clear");
   b9.mousePressed(refresh);
   b9.position(20,30);
   var c1 = createCheckbox("Use mouse to Spawn", false);
   c1.mousePressed(disableSpawn);
   c1.position(878,825);
   var c2 = createCheckbox("Dynamic camera (Can't use mouse to spawn)");
   c2.mousePressed(changeCamera);
   c2.position(878,840);
   var c3 = createCheckbox("Show Index");
   c3.mousePressed(showIndex);
   c3.position(878,855);

   s1p = createP('Pen size');
   s1p.position(1220,805);
   s2p = createP('Zoom');
   s2p.position(1360,805);

   s1 = createSlider(10,2000,80);
   s1.position(1220,840);
   s2 = createSlider(0.1,30,10);
   s2.position(1360,840);

}

function draw() {
   background(0);
   zoom = s2.value()/100;

   translate(width/2, height/2);
   scale(zoom);


   spawnMass = s1.value();

   if (followStar && mode) {
      translate(-balls[0].pos.x, -balls[0].pos.y);
   } else if (!followStar) {
      drawCursor();
   }


   for (let l = -200; l < 200; l++) {
      stroke(255,255,255,20);
      strokeWeight(10);
      line(l*height,-(width*200),l*height,(width*200));
      strokeWeight(1);
   }
   for (let k = -200; k < 200; k++) {
      stroke(255,255,255,20);
      strokeWeight(10);
      line((height*200),k*height,-(height*200),k*height);
      strokeWeight(1);
   }
   for (let i = 0; i < balls.length; i++) {
      for (let j = 0; j < balls.length; j++) {
         if (j != i) {
            let force = balls[i].attract(balls[j]);
            balls[i].applyForce(force);
            balls[i].update();
            balls[i].show();
            if (showstats) {
               balls[i].showStats();
            }
         }

      }
   }

   if (isMDragged && !followStar) {
      mousexScaled = map(mouseX, 0,width, -((width/2)*100)/s2.value(),((width/2)*100)/s2.value());
      mouseyScaled = map(mouseY, 0,height, -((height/2)*100)/s2.value(),((height/2)*100)/s2.value());
      drawLine(spawnX, spawnY, mousexScaled, mouseyScaled);
   }
}
function changeCamera() {
   followStar = !followStar
}

function disableSpawn() {
   spawnEnable = !spawnEnable;
}

function refresh() {
   window.location.reload();
}

function showIndex() {
   showstats = !showstats;
}

function mousePressed() {
   mousexScaled = map(mouseX, 0,width, -((width/2)*100)/s2.value(),((width/2)*100)/s2.value());
   mouseyScaled = map(mouseY, 0,height, -((height/2)*100)/s2.value(),((height/2)*100)/s2.value());
   spawnX = mousexScaled;
   spawnY = mouseyScaled;
}

function mouseDragged() {
   isMDragged = true;
}

function drawCursor() {
   mousexScaledC = map(mouseX, 0,width, -((width/2)*100)/s2.value(),((width/2)*100)/s2.value());
   mouseyScaledC = map(mouseY, 0,height, -((height/2)*100)/s2.value(),((height/2)*100)/s2.value());
   fill(255,200,20,100);
   ellipse(mousexScaledC, mouseyScaledC, spawnMass/4, spawnMass/4);

}

function mouseReleased() {
  isMDragged = false;
  if (!followStar && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && spawnEnable) {
   balls.push(new PhysBall(spawnX,spawnY,SpawnVel*Xvelmult,SpawnVel*Yvelmult,spawnMass,synthIndex));
   synthIndex++;
  }
}


function drawLine(x1,y1,x2,y2) {
   stroke(255,100,10);
   strokeWeight(20);
   if (spawnEnable) {
      line(x1,y1,x2,y2);
   }

   SpawnVel = dist(x1,y1,x2,y2);
   SpawnVel = constrain(SpawnVel, 0, 5000);
   SpawnVel /= 300;
   console.log(SpawnVel);
   if (x1 < x2) {
      Xvelmult = -1;
   } else if(x1 > x2) {
      Xvelmult = 1;
   }
   if (y1 < y2) {
      Yvelmult = -1;
   } else if (y1 > y2) {
      Yvelmult = 1;
   }
   strokeWeight(1);
}
