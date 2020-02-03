// The story will start the first choice will  be to run, hide, fight or other
// more story happend the choice2
//
//
//

results = {'1G':'You stick with your fellow soldiers and fight alongside them, the battle is long but your side is victorious.',
           '1M':'You run ahead straight at the enemy, somehow you manage to fight and stay alive long enough for some of your fellow soldiers to back you up.',
           '1B':'You hide in some shrubs and your commanding officer orders someone to execute you for being a coward.',
           '2G':'You manage to hide behind a shield and survive the volley.',
           '2M':'You charge forward as the arrows fall behind you.',
           '2B':'You try to cut the arrows as the fly toward you, you do not succeed.',
           '3G':'You run in the opossite direction and manage to make it to a nearby forest, you aviod capture.',
           '3M':'You hide in the sewer and the gaurds cannot find you.',
           '3B':'You try to fight the gaurds head on, only to be quickly captured. The other men with you all escape.',
}

next = ['Once upon a time, there lived a King who only knew war. '+
        'For as long as he reigned, his nation was at war with at least three others. '+
        'You have been conscripted into his royal army. '+
        'You have been marching for months towards your first battle. '+
        'Once the battle starts, ', // next[0] is not used yet
        '<br>'+
        'After your first experience with war, you find yourself still alive even if only barely. '+
        'Next, you will siege a castle. '+
        'Once the battle begins you are barraged with arrows. ',
        '<br>'+
        'The siege fails, you and a few dozen soldiers are captured. '+
        'One of the other men makes a run for it giving you only seconds to decide what to do. ',
]


Uchoice = [-1,-1,-1]; // this array holds the users choices
Gchoice = [0,2,1]; // this array is the good choice for each stage
Bchoice = [2,0,0]; // this array is the bad choice for each stage

i = 0;

function rand_choice() {
  return Math.floor(Math.random() * 3);
}

function choice(choice) {
    if (i <= 2) {
        if (choice == 'fight') {
            Uchoice[i] = 0;
        } else if (choice == 'run') {
            Uchoice[i] = 1;
        } else if (choice == 'hide') {
            Uchoice[i] = 2;
        } else {
            Uchoice[i] = rand_choice();
        }
        if (Uchoice[i] == Gchoice[i]) {
            update_story(true);
        } else if (Uchoice[i] == Bchoice[i]) {
            update_story(false);
        } else {
            update_story('meh');
        }
        i++;
    }
}

function update_story(qual) {
  story = document.getElementById('Story');
  if (qual == true) { // good choice
      story.innerHTML += results[''.concat((i+1), 'G')];

  } else if (qual == false) { // bad choice
      story.innerHTML += results[''.concat((i+1), 'B')];
  } else { // meh choice
      story.innerHTML += results[''.concat((i+1), 'M')];
  }
  if (qual != false && i <= 1) {
      story.innerHTML += next[i+1];
  } else {
      end_story();
  }


}

function end_story() {
    story = document.getElementById('Story');
    story.innerHTML += '<h3>The End!</h3>';
    document.getElementById('choices').style.display = 'none';

}
