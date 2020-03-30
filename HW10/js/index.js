var CNVS
$(document).ready(function () {
    $(this).keypress(function(event){
        getKey(event);
    });

    CNVS = new Mycanvas();
    start();

});

class Mycanvas {
    constructor() {
        this.cnvs = document.getElementById('canvas');
        this.context = this.cnvs.getContext('2d');
        this.objs = {};
        // this.context.translate(0,0);
    }

    Shape(id, type, x, y, r, color) {
        this.objs[id] = {'type':type, 'x':x, 'y':y, 'r':r, 'c':color};
        console.log(this.objs);
    }

    drawByID(id) {
        if (this.objs[id].type == 'rect') {
            this.context.fillStyle = this.objs[id].c;
            this.context.fillRect(this.objs[id].x, this.objs[id].y, this.objs[id].r, this.objs[id].r);
        }
        this.context.fill();
    }

    drawAll() {
        for (const id in this.objs) {
            var shape = this.objs[id];
            // console.log(shape);
            if (shape.type == 'rect') {
                this.context.fillStyle = shape.c;
                this.context.fillRect(shape.x, shape.y, shape.r, shape.r);
            }
            this.context.fill();
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

function start() {
    CNVS.Shape(0,'rect', 50, 50, 50, "#550000");
    CNVS.Shape(1,'rect', 150, 50, 50, "#00eeee");
    update();
}

function moveShape(id, x=null, y=null) {
    if (x == null && y == null) {
        x = randomWalk(40);
        y = randomWalk(40);
    }
    CNVS.Shape(id, CNVS.objs[id].type, CNVS.objs[id].x + x, CNVS.objs[id].y + y, CNVS.objs[id].r, CNVS.objs[id].c);
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
    console.log(actualLetter);
    speed = 5;
    if (!collisions(speed, actualLetter)) {
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

function collisions(id, speed, dir) {
    for (const idb in CNVS.objs) {
        if (ida != idb) {
            if (CNVS.objs[ida].x + CNVS.objs[ida].r ) {

            }
        }
    }
    // TODO: Check wall collisions
    if (true) {

    }
}
