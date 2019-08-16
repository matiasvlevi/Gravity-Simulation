

function TwoSolarSystems() {
   mode = true;
   balls.push(new PhysBall(random(width,width*2), random(height,height*2), 0, -2, 500, 0));
   balls.push(new PhysBall(random(width+width*-3,width+width*-5), random(height+height*-3,height+height*-5), 0, 2, 500, 1));
   for (let i = 2; i < nb+2; i++) {
      balls.push(new PhysBall(random(width+width*-3,width+width*-5), random(height+height*-3,height+height*-5), random(-1,1), random(-1,1), random(1,10), i));
   }

   for (let i = nb+2; i < nb+nb+2; i++) {
      balls.push(new PhysBall(random(width,width+width*2), random(height,height+height*2), random(-0.05,0.05), random(-0.05,0.05), random(1,10), i));
   }


}

function SolarSystem() {
   mode = true;
   balls.push(new PhysBall(random(-width/2,width/2), random(-height/2,height/2), 0, 0, 750, 0));
   for (let i = 1; i < nb+1; i++) {
      balls.push(new PhysBall(random(-width,width), random(-height,height), random(-2,2), random(-2,2), random(5,15), i));
   }

}

function Star() {
   mode = true;
   balls.push(new PhysBall(0, 0, 0, 0, 1500));
   for (let i = 1; i < 2; i++) {
      balls.push(new PhysBall(random(-width,width), random(-height,height), 0, 0, 0.0001, i));
   }

}

function bhOrbit() {
   mode = true;
   balls.push(new Blackhole(random(-width/2,width/2), random(-height/2,height/2), 0, 0, 20000, 0));
   for (let i = 1; i < nb+1; i++) {
      balls.push(new PhysBall(random(-width*3,width*3), random(-height*3,height*3), random(-1,1), random(-1,1), random(10,100), i));
   }

}

function bh() {
   mode = true;
   balls.push(new Blackhole(random(-width/2,width/2), random(-height/2,height/2), 0, 0, 20000, 0));
   for (let i = 1; i < 2; i++) {
      balls.push(new PhysBall(random(-width*3,width*3), random(-height*3,height*3), 0,0,0.000001, i));
   }
}

function TWObh() {
   mode = true;
   balls.push(new Blackhole(random(-width*2,width*3), random(-height/2,height/2), -1, 0, 8000, 0));
   balls.push(new Blackhole(random(-width*-2,width*-3), random(-height/2,height/2), 1, 0, 6000, 1));

}

function BinaryStarSystem() {
   mode = true;
   balls.push(new PhysBall(random(-width/2,width/2), random(-height/2,height/2), -2, 1, 620, 0));
   balls.push(new PhysBall(random(-width/2,-width), random(-height/2,-height), 2, -1, 600, 1));
   for (let i = 2; i < nb+2; i++) {
      balls.push(new PhysBall(random(-width,width), random(-height,height), random(-0.5,0.5), random(-0.5,0.5), random(5,12), i));
   }

}

function Asteroids() {
   mode = true;
   for (let i = 0; i < nb; i++) {
      balls.push(new PhysBall(random(-width*5,width*5), random(-height*5,height*5), random(-0.5,0.5), random(-0.5,0.5), random(20,50), i));
   }

}
