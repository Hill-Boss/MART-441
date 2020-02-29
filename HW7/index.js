var objects = [];

class MyObject {

    constructor(Title, Image, Description, Author, ImageYear) {
        this.Title = Title;
        this.Image = Image;
        this.Description = Description;
        this.Author = Author;
        this.ImageYear = ImageYear;

    }
}

// All information from https://www.boredpanda.com/famous-artists-last-works/?utm_source=google&utm_medium=organic&utm_campaign=organic
var Titles = ["Claude Monet: Water Lilies Murals (1926)",
              "Keith Haring: Unfinished Painting (1990)",
              "Pablo Picasso's Last Self-Portrait (1972)",
              "Vincent Van Gogh: Tree Roots (1890)",
              "Jean-Michel Basquiat: Riding With Death (1988)"
             ]
var Images = ["https://static.boredpanda.com/blog/wp-content/uploads/2016/12/famous-artists-last-works-8-5847e73c15e34__605.jpg",
              "https://static.boredpanda.com/blog/wp-content/uploads/2016/12/famous-artists-last-works-32-58480f4ea56bb__605.jpg",
              "https://static.boredpanda.com/blog/wp-content/uploads/2016/12/famous-artists-last-works-17-58480fb7c8308__605.jpg",
              "https://static.boredpanda.com/blog/wp-content/uploads/2016/12/famous-artists-last-works-7-5847e73a53f26__605.jpg",
              "https://static.boredpanda.com/blog/wp-content/uploads/2016/12/famous-artists-last-works-20-58480d5c58ab8__605.jpg"
             ]
var Descriptions = ["The Grandes Décorations (1920/26) are a collection or murals that comprise Claude Monet's last works." +
                    " They depict his beloved water lilies and he painted them when both his eyesight and health were failing. " +
                    " As his sight worsened due to cataracts, his works turned from fresh, bright colours to blurred visions of heavy browns and reds. " +
                    " He wrote letters to friends, how colors were getting dull, and it was hard to tell them apart, and how he had to label tubes of paint. " +
                    " Monet specified that when he died he wanted to be buried like \"a local man,\" adding " +
                    "\"“Above all, remember I want neither flowers nor wreaths. Those are vain honors. It would be a sacrilege to plunder the flowers of my garden for an occasion such as this.”\"",
                    "Keith Allen Haring was an American artist and social activist whose work expressed concepts of birth, death, sexuality, and war. " +
                    " His work was often political, and his style is highly distinctive. " +
                    " One of his last works was finished shortly before the artist died from AIDS-related complications in 1990. " +
                    " The painting serves as a poignant statement about a life cut short at the age of thirty-one.",
                    "Picasso's last well-known self portrait is called, somewhat aptly, Self Portrait Facing Death. " +
                    " He drew it with crayon on paper in 1972, less than a year before his death. " +
                    " Picasso worked right up until the day he died, aged 91, painting until 3am on Sunday, April 8th, just hours before he passed away.",
                    "Wheatfield With Crows (1890) is often considered to be Vincent van Gogh's last work," +
                    " perhaps because the ominous setting was in fact the place he chose in real life for his final, successful suicide attempt." +
                    " It is however more likely that his final work was Tree Roots, painted in Auvers-sur-Oise, France," +
                    " shortly after he left an asylum in Saint-Rémy.",
                    "Whether or not Riding With Death (1988) is Jean-Michel Basquiat’s final painting is still up for debate." +
                    " The work certainly has a morbid quality about it that evokes a sense of an ending," +
                    " and Basquiat painted it shortly before his own death from a heroin overdose in 1988."
                   ]
var Authors = ["Claude Monet",
               "Keith Haring",
               "Pablo Picasso",
               "Vincent Van Gogh",
               "Jean-Michel Basquiat"
              ]
var ImageYears = ["1926",
                  "1990",
                  "1972",
                  "1890",
                  "1988"
                 ]


function createObjects() {
    for (var i = 0; i < Titles.length; i++) {
        objects.push(new MyObject(Titles[i], Images[i], Descriptions[i], Authors[i], ImageYears[i]))
    }
}

function getObject() {
    paintings = objects[parseInt(Math.random()*100, 10)%5];
    document.getElementById('object-Title').innerHTML = paintings.Title;
    document.getElementById('object-Img').src = paintings.Image;
    document.getElementById('object-Desc').innerHTML = paintings.Description;
    document.getElementById('object-Auth').innerHTML += paintings.Author;
    document.getElementById('object-Year').innerHTML += paintings.ImageYear;

    document.getElementById('object').classList.toggle('hide');
}
