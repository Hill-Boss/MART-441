var CNVS

$(document).ready(function(){
  $.ajax(
    {
      type: 'GET',
      url: 'https://hill-boss.github.io/MART-441/HW11/objs.json',

      success: function(response)
      {
          CNVS = new Mycanvas(response);
      },

      failure: function()
      {
        alert("AJAX FAILED!");
      }
    }
  );

  $(this).keypress(function(event){
      getKey(event);
  });

  update();

});

class Mycanvas {
    constructor(json) {
        this.cnvs = document.getElementById('canvas');
        this.context = this.cnvs.getContext('2d');
        this.objs = json.objs;
        // this.context.translate(0,0);
    }

    // adds shape and changes existing ones
    Shape(id, type, x, y, r, color) {
        this.objs[id] = {'type':type, 'x':x, 'y':y, 'r':r, 'c':color};
        // console.log(this.objs);
    }

    drawByID(id) {
        if (this.objs[id].type == 'rect') {
            this.context.fillStyle = this.objs[id].c;
            this.context.fillRect(this.objs[id].x, this.objs[id].y, this.objs[id].r, this.objs[id].r);
        } else if (this.objs[id].type == 'circle') {
            this.context.fillStyle = this.objs[id].c;
            this.context.arc(this.objs[id].x, this.objs[id].y, this.objs[id].r, 0, 2*Math.PI, false);
        }
        this.context.fill();
    }

    drawAll() {
        for (const id in this.objs) {
            this.drawByID(id);
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.cnvs.width, this.cnvs.height);
    }
}

function update() {
    CNVS.clear();
    CNVS.drawAll();
    moveShape(1);
    // setInterval(update, 1000/60)
}

// start() not needed if loading a JSON file
// function start() {
//     // change circle to rect
//     // CNVS.Shape(0,'rect', 50, 50, 50, "#550000");
//     // CNVS.Shape(1,'rect', 150, 50, 50, "#00eeee");
//     // update();
// }

function moveShape(id) {
    dir = '';
    val = 40;
    x=0;
    y=0;
    if (randomWalk(val) > 0) { // decide direction
        x = randomWalk(val);
        if (x > 0) {
            dir = 'd';
        } else {
            dir = 'a';
        }
        speed = x;
    } else {
        y = randomWalk(val);
        if (y > 0) {
            dir = 's';
        } else {
            dir = 'w';
        }
        speed = y;
    }

    if (!collisions(id, [Math.abs(speed), dir])) {
        CNVS.Shape(id, CNVS.objs[id].type, CNVS.objs[id].x + x, CNVS.objs[id].y + y, CNVS.objs[id].r, CNVS.objs[id].c);
    }
    // CNVS.drawByID(id)
}

function randomWalk(n) {
    x = (Math.random()*100 % n) + 1;
    if (x > n/2) {
        x = x-(n+1) ;
    }
    // console.log(parseInt(x));
    return parseInt(x);
}

function getKey(event) {
    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char);
    // console.log(actualLetter);
    speed = 5;
    if (!collisions(0, [speed, actualLetter])) {
        if (actualLetter == 'w') {
            CNVS.Shape(0, CNVS.objs[0].type, CNVS.objs[0].x, CNVS.objs[0].y - speed, CNVS.objs[0].r, CNVS.objs[0].c);
        } else if (actualLetter == 'a') {
            CNVS.Shape(0, CNVS.objs[0].type, CNVS.objs[0].x - speed, CNVS.objs[0].y, CNVS.objs[0].r, CNVS.objs[0].c);
        } else if (actualLetter == 's') {
            CNVS.Shape(0, CNVS.objs[0].type, CNVS.objs[0].x, CNVS.objs[0].y + speed, CNVS.objs[0].r, CNVS.objs[0].c);
        } else if (actualLetter == 'd') {
            CNVS.Shape(0, CNVS.objs[0].type, CNVS.objs[0].x + speed, CNVS.objs[0].y, CNVS.objs[0].r, CNVS.objs[0].c);
        }
    }
    update();
}

function collisions(ida, v) {
    collision = false;
    for (const idb in CNVS.objs) {
        if (ida != idb) {
            if (wouldCollide(CNVS.objs[ida], CNVS.objs[idb], v)) {
                collision = true;
            }
        }
    }
    // TODO: Check wall collisions
    if (!collision) {
        collision = wouldCollideWall(ida, v);
    }
    return collision;
}
function wouldCollideWall(id, v) {
    T = wouldCollide(CNVS.objs[id], {'y': -50, 'x':-50, 'width':CNVS.cnvs.width + 100, 'height':50}, v, true);
    L = wouldCollide(CNVS.objs[id], {'y': -50, 'x':-50, 'width':50, 'height':CNVS.cnvs.height + 100}, v, true);
    R = wouldCollide(CNVS.objs[id], {'y': -50, 'x': CNVS.cnvs.width, 'width': 50, 'height': CNVS.cnvs.height + 100}, v, true);
    B = wouldCollide(CNVS.objs[id], {'y': CNVS.cnvs.height, 'x':-50, 'width':CNVS.cnvs.width + 100, 'height': 50}, v, true);
    return (T || L || R || B);
}

function wouldCollide(a, b, v, wall=false) {
    if (!wall) {
        if (v[1] == 'w') {
            return (
                a.x + a.r >= b.x &&
                a.x <= b.x + b.r &&
                a.y + a.r >= b.y &&
                a.y - v[0] <= b.y + b.r
            );
        } else if (v[1] == 'a') {
            return (
                a.x + a.r >= b.x &&
                a.x - v[0]  <= b.x + b.r &&
                a.y + a.r >= b.y &&
                a.y <= b.y + b.r
            );
        } else if (v[1] == 's') {
            return (
                a.x + a.r >= b.x &&
                a.x <= b.x + b.r &&
                a.y + a.r + v[0] >= b.y &&
                a.y <= b.y + b.r
            );
        } else if (v[1] == 'd') {
            return (
                a.x + a.r + v[0] >= b.x &&
                a.x <= b.x + b.r &&
                a.y + a.r >= b.y &&
                a.y <= b.y + b.r
            );
        }

    } else {
        if (v[1] == 'w') {
            return (
                a.x + a.r >= b.x &&
                a.x <= b.x + b.width &&
                a.y + a.r >= b.y &&
                a.y - v[0] <= b.y + b.height
            );
        } else if (v[1] == 'a') {
            return (
                a.x + a.r >= b.x &&
                a.x - v[0] <= b.x + b.width &&
                a.y + a.r >= b.y &&
                a.y <= b.y + b.height
            );
        } else if (v[1] == 's') {
            return (
                a.x + a.r >= b.x &&
                a.x <= b.x + b.width &&
                a.y + a.r + v[0] >= b.y &&
                a.y <= b.y + b.height
            );
        } else if (v[1] == 'd') {
            return (
                a.x + a.r + v[0] >= b.x &&
                a.x <= b.x + b.width &&
                a.y + a.r >= b.y &&
                a.y <= b.y + b.height
            );
        }
    }
}
