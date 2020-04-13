class Mycanvas {
    constructor() {
        this.cnvs = document.getElementById('canvas');
        this.context = this.cnvs.getContext('2d');
        this.objs = {};
    }

    addObj(objs) {
        for (const id in objs) {
            this.objs[id] = objs[id];
        }
    }
    // changes existing objs
    moveByID(id, x, y) {
        this.objs[id].x = x;
        this.objs[id].y = y;
    }

    drawByID(id) {
        if (this.objs[id].type == 'rect') {
            this.context.fillStyle = this.objs[id].c;
            this.context.fillRect(this.objs[id].x, this.objs[id].y, this.objs[id].r, this.objs[id].r);
        } else if (this.objs[id].type == 'circle') {
            this.context.fillStyle = this.objs[id].c;
            this.context.arc(this.objs[id].x, this.objs[id].y, this.objs[id].r, 0, 2 * Math.PI, false);
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

    gravity(id, gravity) {
        this.objs[id].y += gravity;
    }
}
var CNVS = new Mycanvas();



$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://hill-boss.github.io/MART-441/HW11/objs.json',

        success: function(response) {
            CNVS.addObj(response);
        },

        failure: function() {
            alert("AJAX FAILED!");
        }
    });

    $(this).keypress(function(event) {
        getKey(event);
    });
});


function update() {
    CNVS.clear();
    for (const id in CNVS.objs) {
        moveShape(id);
    }
    CNVS.drawAll();
    setInterval(update, 1000/60);
}


function moveShape(id, speed=0, dir='') {
    if (id != 0) {
        val = 40;
        x = 0;
        y = 0;
        if (randomWalk(val) > 0) { // decide direction
            x = randomWalk(val);
            if (x > 0) {
                dir = 'd';
            } else {
                dir = 'a';
            }
            // speed = x;
        } else {
            y = randomWalk(val);
            if (y > 0) {
                dir = 's';
            } else {
                dir = 'w';
            }
        }
    }

    if (id != 0) {
        speed = Math.random()/20;
        if (collisions(id, [speed, dir])) {
            // console.log(true);
            speed = 0;
        }
        if (speed != 0) {
            if (!collisions(id, [0.01, dir])) {
                CNVS.gravity(id, 0.01);
            }
        }
    } else {
        if (!collisions(id, [0.01, 's'])) {
            CNVS.gravity(id, 0.01);
        } else if (collisions(id, [speed, dir])) {
            speed = 0;
        }
    }

    if (dir == 'w') {
        CNVS.moveByID(id, CNVS.objs[id].x, CNVS.objs[id].y - speed);
    } else if (dir == 'a') {
        CNVS.moveByID(id, CNVS.objs[id].x - speed, CNVS.objs[id].y);
    } else if (dir == 's') {
        CNVS.moveByID(id, CNVS.objs[id].x, CNVS.objs[id].y + speed);
    } else if (dir == 'd') {
        CNVS.moveByID(id, CNVS.objs[id].x + speed, CNVS.objs[id].y);
    }
}

// TODO: make random movement with weighted direction
function randomWalk(n, selfCall=false) {
    x = (Math.floor(Math.random()*n) % n) + 1;
    if (!selfCall) {
        if (randomWalk(n, true) > 0) {
            x = x - 1;
        } else {
            x = x + 1;
        }
    }
    // x = x - (n+1)
    if (x > n/2) {
        x = x - (n+1);
    }
    return x;
}

function getKey(event) {
    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char);
    // console.log(actualLetter);
    speed = 5
    moveShape(0, speed, actualLetter);
    update();
}

function collisions(ida, v) {
    collision = false;
    for (const idb in CNVS.objs) {
        if (ida != idb) {
            if (wouldCollide(CNVS.objs[ida], CNVS.objs[idb], v)) {
                collision = true;
                if ((ida == 0 && CNVS.objs[idb].collect)) {
                    delete CNVS.objs[idb];
                    incrementScore();
                }
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
    T = wouldCollide(CNVS.objs[id], {
        'y': -50,
        'x': -50,
        'width': CNVS.cnvs.width + 100,
        'height': 50
    }, v, true);
    L = wouldCollide(CNVS.objs[id], {
        'y': -50,
        'x': -50,
        'width': 50,
        'height': CNVS.cnvs.height + 100
    }, v, true);
    R = wouldCollide(CNVS.objs[id], {
        'y': -50,
        'x': CNVS.cnvs.width,
        'width': 50,
        'height': CNVS.cnvs.height + 100
    }, v, true);
    B = wouldCollide(CNVS.objs[id], {
        'y': CNVS.cnvs.height,
        'x': -50,
        'width': CNVS.cnvs.width + 100,
        'height': 50
    }, v, true);
    return (T || L || R || B);
}

function wouldCollide(a, b, v, wall = false) {
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
                a.x - v[0] <= b.x + b.r &&
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

function incrementScore() {
    Score = document.getElementById('score');
    score = Score.innerHTML;
    score  = score.split(' ');
    score[1] = '' + (parseInt(score[1]) + 1);
    score = score.join(' ');
    Score.innerHTML = score;

}
