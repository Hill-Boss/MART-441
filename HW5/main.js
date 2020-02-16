

card_back = './imgs/back.png';
back_w = 459;
back_h = 588;
scale = 0.5;

// len should be n
card_front = ['front1.jpg',
              'front2.jpg',
              'front3.png',
              'front4.png',
              'front5.jpg'];

id = [1,2,3,4,5,6,7,8,9,10];

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
var shuffle = function (array) {
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
    flop(-1);
    flipped = [];
  } else if (flipped.includes(i)) {
    if (flipped[0] == i) {
      flipped[0] = flipped[1];
      flipped.pop();
    } else {
      flipped.pop();
    }
    flop(i);
  } else {
    flip(i);
    flipped[flipped.length] = i;
  }
}

function flip(i) {
  // .src is long
  // file:///home/cody_hill-boss/Desktop/Spring%202020/MART-441/HW5/imgs/back.png
  src = document.getElementById(i).src;
  src = src.split('/');
  src[src.length-1] = card_front[i%5];
  src = src.join('/');
  document.getElementById(i).src = src;
}

function flop(i) {
  if (i == -1) {
    for (i = 0; i < flipped.length; i++) {
      back = card_back.split('/')
      back = back[back.length-1]
      src = document.getElementById(flipped[i]).src;
      src = src.split('/');
      src[src.length-1] = back;
      src = src.join('/');
      document.getElementById(flipped[i]).src = src;
    }
  } else {
    back = card_back.split('/')
    back = back[back.length-1]
    src = document.getElementById(i).src;
    src = src.split('/');
    src[src.length-1] = back;
    src = src.join('/');
    document.getElementById(i).src = src;
  }
}

function add_backs(n) {
  page = document.getElementById('cards')
  page.innerHTML = '';
  w=back_w*scale
  h=back_h*scale

  for (i = 0; i < n; i++) {
    page.innerHTML += "<img id='" + id[i] + "' onclick='flip_flop(" + id[i] + ")' src='" + card_back
                    + "' width='" + w + "' height='" + h + "'>"
  }
}

function Restart(n) {
  shuffle(id);
  add_backs(n);
  document.getElementById('restart').style.display = 'none';
}
