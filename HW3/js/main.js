// The story will start the first choice will  be to run, hide, fight or other
// more story happend the choice2
//
//
//


Uchoice = [-1,-1,-1];
Rchoice = [-1,-1,-1];

i = 0;

function rand_choice() {
  return Math.floor(Math.random() * 3);
}



function choice(choice) {
    if (choice == 'fight') {
      Uchoice[i] = 0;
    } else if (choice == 'hide') {
      Uchoice[i] = 0;
    } else if (choice == 'run') {
      Uchoice[i] = 0;
    } else {
      Uchoice[i] = rand_choice();
    }
    Rchoice[i] = rand_choice();
    i++;
    update_story()
}

function update_story() {
  story = document.getElementById('Story');
  story.innerHTML += "HELLO \n this is me\n\n hhh"
}
