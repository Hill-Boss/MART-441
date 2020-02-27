var fields;

function getInfo() {
    fields = JSON.parse(localStorage.getItem('information'));
    // console.log(fields);
}

function setInfo() {
    localStorage.setItem('information', JSON.stringify(fields));
}

function gotoPage(page) {
    setInfo()
    window.location = page;
}

path = '../imgs/';

card_back = 'back.png';
back_w = 459;
back_h = 588;
scale = 0.5;

// len should be n
card_front = ['front1.jpg',
    'front2.jpg',
    'front3.png',
    'front4.png',
    'front5.jpg'
];

id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


function init_setup() {
    document.getElementById('start').classList.toggle('hide');
    shuffle(id);
    add_backs(10);
    for (i = 0; i < 10; i++) {
        flip(id[i]);
    }
    sleep(2000, Start);
}

function add_backs(n) {
    page = document.getElementById('cards')
    page.innerHTML = '';
    w = back_w * scale
    h = back_h * scale

    for (i = 0; i < n; i++) {
        page.innerHTML += "<img id='" + id[i] + "' src='" + path + card_back +
            "' width='" + w + "' height='" + h + "'>"
    }
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms, callFunction, arg) {
    return new Promise(resolve => setTimeout(callFunction, ms, arg));
}

function Start() {
    flop(id);
    for (i = 0; i < id.length; i++) {
        document.getElementById(id[i]).setAttribute("onclick","flip_flop(this.id);"); 
    }
}

// https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
var shuffle = function(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};


flipped = [];

function flip_flop(i) {
    // console.log(flipped)

    if (flipped.length == 2) {
        flop(flipped, match_check());
        fields['attempts']++;
        flipped = [];
        if (check_done()) {
            gotoPage('../Final/')
        }
    } else if (i==undefined){
        return
    } else if (!flipped.includes(i)) {
        flip(i);
        flipped[flipped.length] = i;
        sleep(1000, flip_flop, undefined)
    }
}

function match_check() {
    return (flipped[0] % 5 == flipped[1] % 5);
}

function check_done() {
    for (i = 0; i < 10; i++) {
        if (!document.getElementById(id[i]).classList.contains('hidden')) {
            return false;
        }
    }
    return true;
}

function flip(i) {
    document.getElementById(i).src = path + card_front[i % 5];
}

function flop(toFlop, remove = false) {
    for (j = 0; j < toFlop.length; j++) {
        if (!remove) {
            document.getElementById(toFlop[j]).src = path + card_back;
        } else {
            document.getElementById(toFlop[j]).classList.toggle('hidden')
        }
    }
}
