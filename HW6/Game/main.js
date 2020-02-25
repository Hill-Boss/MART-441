var fields;

function getInfo() {
  fields = JSON.parse(localStorage.getItem('information'));
  console.log(fields);
}

function setInfo() {
  localStorage.setItem('information', JSON.stringify(fields));
}

function gotoPage(page) {
  setInfo()
  window.location = page;
}

card_back = '../imgs/back.png';
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
  sleep(5000);
}

function add_backs(n) {
  page = document.getElementById('cards')
  page.innerHTML = '';
  w = back_w * scale
  h = back_h * scale

  for (i = 0; i < n; i++) {
    page.innerHTML += "<img id='" + id[i] + "' onclick='flip_flop(" + id[i] + ")' src='" + card_back +
      "' width='" + w + "' height='" + h + "'>"
  }
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(Start, ms));
}

function Start() {
  for (i = 0; i < 10; i++) {
    flop(id[i]);
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
  if (flipped.length == 2) {
    flop(-1, match_check());
    fields['attempts']++;
    flipped = [];
    if (check_done()) {
        gotoPage('../Final/')
    }
  } else {
    flip(i);
    flipped[flipped.length] = i;
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
  // .src is long i.e. file:///home/cody_hill-boss/Desktop/Spring%202020/MART-441/HW5/imgs/back.png
  src = document.getElementById(i).src;
  src = src.split('/');
  src[src.length - 1] = card_front[i % 5];
  src = src.join('/');
  document.getElementById(i).src = src;
}

function flop(i, remove = false) {
  if (i <= -1) {
    for (j = 0; j < flipped.length; j++) {
      if (!remove) {
        back = card_back.split('/')
        back = back[back.length - 1]
        src = document.getElementById(flipped[j]).src;
        src = src.split('/');
        src[src.length - 1] = back;
        src = src.join('/');
        document.getElementById(flipped[j]).src = src;
      } else {
        document.getElementById(flipped[j]).classList.toggle('hidden')
      }
    }
  } else {
    back = card_back.split('/')
    back = back[back.length - 1]
    src = document.getElementById(i).src;
    src = src.split('/');
    src[src.length - 1] = back;
    src = src.join('/');
    document.getElementById(i).src = src;
  }
}
