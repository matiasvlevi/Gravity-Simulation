
class PhysBall {
   constructor(x, y, xv, yv, m, i) {
      this.pos = createVector(x,y);
      this.vel = createVector(xv,yv);
      this.mass = m;
      this.acc = createVector();
      this.size = this.mass/4
      this.i = i;
      this.vis = true;

   }
   show() {
      noStroke();
      fill(255);
      if (this.vis) {
         ellipse(this.pos.x, this.pos.y, this.size);
      } else {
         this.mass = 0.0001;
      }
   }

   showStats() {
      textSize(zoom*800);
      fill(0);
      stroke(255);
      textAlign(CENTER);
      if (this.vis && this.mass > 0.1) {
         text(this.i, this.pos.x,this.pos.y);
      }
   }

   update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
   }

   attract(other) {
      if (other.pos.x > this.pos.x - this.size/2 &&
          other.pos.x < this.pos.x + this.size/2 &&
          other.pos.y > this.pos.y - this.size/2 &&
          other.pos.y < this.pos.y + this.size/2) {
         //balls.splice(other.i+1, 1);
         if (this.mass >= other.mass) {
            other.vis = false;
            this.mass += other.mass;
            this.size = this.mass/4;
         }
       }
   //direction force
   let force = p5.Vector.sub(this.pos, other.pos);
   let d = force.mag();
   force.normalize();

   d = constrain(d, 5, 28);
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
