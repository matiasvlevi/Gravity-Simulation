
class Blackhole {
   constructor(x, y, xv, yv, m, i) {
      this.pos = createVector(x,y);
      this.vel = createVector(xv,yv);
      this.mass = m*10;
      this.acc = createVector();
      this.size = this.mass/1000;
      this.i = i;
      this.vis = true;
   }
   show() {
      stroke(255,180,50);
      strokeWeight(15);
      fill(25,25,25);
      if (this.vis) {
         ellipse(this.pos.x, this.pos.y, this.size);
      } else {
         this.mass = 0.000000000000000000000000001;

      }
      ellipse(this.pos.x, this.pos.y, this.size);
      strokeWeight(1);
   }
   update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
   }

   attract(other) {
   //direction force

   if (other.pos.x > this.pos.x - this.size/2 &&
       other.pos.x < this.pos.x + this.size/2 &&
       other.pos.y > this.pos.y - this.size/2 &&
       other.pos.y < this.pos.y + this.size/2) {
      //balls.splice(other.i+1, 1);
      if (this.mass >= other.mass) {
         other.vis = false;
         this.mass += other.mass;
         this.size = this.mass/1000;
      }
    }

   let force = p5.Vector.sub(this.pos, other.pos);
   let d = force.mag();
   force.normalize();

   d = constrain(d, 5, 25);
   //magnitude force
   let strenght = (1 * this.mass * other.mass) / (d*d);
   //putting magnitude and direcetion together
   force.mult(strenght*-0.05);

   return force;
}

   applyForce(force) {
      let f = p5.Vector.div(force, this.mass);
      this.acc.add(f)
   }


}
