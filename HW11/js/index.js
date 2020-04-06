// same as in objs.json
// var objs = {
//     0: {
//         'type': 'rect',
//         'collect': false,
//         'x': 50,
//         'y': 50,
//         'r': 50,
//         'c': '#550000'
//     },
//     1: {
//         'type': 'rect',
//         'collect': false,
//         'x': 50,
//         'y': 200,
//         'r': 50,
//         'c': '#00eeee'
//     },
//     2: {
//         'type': 'rect',
//         'collect': false,
//         'y': 50,
//         'x': 300,
//         'r': 50,
//         'c': '#555555'
//     },
//     3: {
//         'type': 'rect',
//         'collect': false,
//         'x': 200,
//         'y': 150,
//         'r': 50,
//         'c': '#306fe3'
//     },
//     4: {
//         'type': 'rect',
//         'collect': false,
//         'x': 500,
//         'y': 350,
//         'r': 50,
//         'c': '#ff3300'
//     },
//     5: {
//         'type': 'rect',
//         'collect': true,
//         'x': 1000,
//         'y': 350,
//         'r': 25,
//         'c': '#edbe13'
//     },
//     6: {
//         'type': 'rect',
//         'collect': true,
//         'x': 200,
//         'y': 400,
//         'r': 25,
//         'c': '#edbe13'
//     },
//     7: {
//         'type': 'rect',
//         'collect': true,
//         'x': 800,
//         'y': 50,
//         'r': 25,
//         'c': '#edbe13'
//     },
//
// };

class Mycanvas {
    constructor() {
        this.cnvs = document.getElementById('canvas');
        this.context = this.cnvs.getContext('2d');
        this.objs = {};
        // this.context.translate(0,0);
    }

    addObj(objs) {
        // console.log(objs);
        for (const id in objs) {
            this.objs[id] = objs[id];
        }
        // console.log(this.objs);
    }
    // adds shape and changes existing ones
    Shape(id, type, x, y, r, color) {
        this.objs[id] = {
            'type': type,
            'x': x,
            'y': y,
            'r': r,
            'c': color
        };
        // console.log(this.objs);
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
}
var CNVS = new Mycanvas();



$(document).ready(function() {
    // Couldn't update CNVS.objs from in this function
    //idk if the ajax call is even running
    $.get("https://hill-boss.github.io/MART-441/HW11/objs.json", function(data, status){
        console.log(data);
        alert("Data: " + data + "\nStatus: " + status);
    });
    $.ajax({
        type: 'GET',
        url: 'objs.json',

        success: function(response) {
            console.log('SUCCESSSSSS');
            console.log(response);
            CNVS.addObj(response);
        },

        failure: function() {
            alert("AJAX FAILED!");
        }
    });

    $(this).keypress(function(event) {
        getKey(event);
    });

    // update();

});


function update() {
    CNVS.clear();
    CNVS.drawAll();
    for (const id in CNVS.objs) {
        if (id > 0) {
            moveShape(id);
        }
    }
    setInterval(update, 1000/60);
}

// start() not needed if loading a JSON file
// function start() {
//     // change circle to rect
//     // CNVS.Shape(0,'rect', 50, 50, 50, "#550000");
//     // CNVS.Shape(1,'rect', 150, 50, 50, "#00eeee");
//     update();
// }

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

    if (speed == 0) {
        speed = Math.random()/20;
    }

    if (collisions(id, [speed, dir])) {
        // console.log(true);
        speed = 0;
    }

    if (dir == 'w') {
        CNVS.Shape(id, CNVS.objs[id].type, CNVS.objs[id].x, CNVS.objs[id].y - speed, CNVS.objs[id].r, CNVS.objs[id].c);
    } else if (dir == 'a') {
        CNVS.Shape(id, CNVS.objs[id].type, CNVS.objs[id].x - speed, CNVS.objs[id].y, CNVS.objs[id].r, CNVS.objs[id].c);
    } else if (dir == 's') {
        CNVS.Shape(id, CNVS.objs[id].type, CNVS.objs[id].x, CNVS.objs[id].y + speed, CNVS.objs[id].r, CNVS.objs[id].c);
    } else if (dir == 'd') {
        CNVS.Shape(id, CNVS.objs[id].type, CNVS.objs[id].x + speed, CNVS.objs[id].y, CNVS.objs[id].r, CNVS.objs[id].c);
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
                if ((ida == 0 && objs[idb].collect)) {
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
