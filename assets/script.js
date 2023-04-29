var startbtn = document.querySelector("button");
var timer = document.querySelector(".timer");
var mainHeading = document.querySelector("#main-heading");
var text = document.querySelector("#text");
var guide = document.querySelector("#guide");
var container = document.querySelector(".container");
var form = document.querySelector("form");
var answer = document.querySelector("#answer");
var input = document.querySelector("input");
var link = document.querySelector("a");
var backsubmit = document.querySelector(".backsubmit");
var highScoresArray = [];

function wrongAnswer() {
  answer.innerHTML = "Wrong answer!";
}
function correctAnswer() {
  answer.innerHTML = "Correct!";
}
function question1() {
  text.style.display = "none";
  guide.style.display = "none";
  startbtn.style.display = "none";

  container.setAttribute("style", "align-items: center;");
  mainHeading.innerHTML =
  "Which of these is the correct way in which we can call the JavaScript code?";
  createButton("Triggering Event", tick10);
  createButton("Preprocessor", tick10);
  createButton("Function/Method", question2);
  createButton("RMI", tick10);
}
function question2() {
  correctAnswer();
  mainHeading.innerHTML =
  "The ” var” and “function” are known as _____________?";
  clearButtons();

  createButton('Data types', tick10);
  createButton('Keywords', tick10);
  createButton('Prototypes', tick10);
  createButton('Declaration statements', question3);
}
function question3() {
  correctAnswer();
  mainHeading.innerHTML = "Which of these operators are used for checking if a specific property exists?";
  clearButtons();
  createButton("in", question4);
  createButton("within", tick10);
  createButton("exit", tick10);
  createButton(" exits", tick10);
}

function question4() {
  correctAnswer();

  mainHeading.innerHTML =
    "Which of these is known as the Equality operator used for checking whether both the values are equal? ";
  clearButtons();
  createButton("=", tick10);
  createButton("==", tick10);
  createButton("===", question5);
  createButton("&&", tick10);
}
function question5() {
  correctAnswer();

  mainHeading.innerHTML =
    "WLook at the snippets given below and check the one in which the variable “a” isn't equal to the “NULL”"
  clearButtons();
  createButton('if (a!)', tick10);
  createButton('if(a!=null)', question6);
  createButton('if(a!==null)', tick10);
  createButton("if(a!null)", tick10);
}
function question6() {
  correctAnswer();

  mainHeading.innerHTML =
    'If you type the following code in the console window, what result will you get '
    "3 > 2 > 1 === false;"
  clearButtons();
  createButton('True', getHighScore);
  createButton('False', tick10);
  
}

function startGame(e) {
  e.preventDefault();
  clock = setInterval(tick, 1000);
  question1();
}

startbtn.addEventListener("click", startGame);
link.addEventListener("click", function (event) {
  event.preventDefault();
  highScores();
});
toggleForm(form.getAttribute("state"));

function loseGame() {
  clearInterval(clock);
  clearButtons();
  timer.innerHTML = 0;
  mainHeading.innerHTML =
    "Time Up!.Do you want to Restart";
  container.setAttribute("style", "align-items: center;");
  answer.style.display = "none";

  createButton("Play Again", function () {
    document.location.href = "./index.html";
  });
}
//  keep decrement time when 0 time is over 
function tick() {
  if (timer.innerHTML > 0) {
    timer.innerHTML -= 1;
  } else {
    getHighScore()
  }
}
// to minu 10 sec 
function tick10() {
  if (timer.innerHTML >= 10) {
    timer.innerHTML -= 10;
    wrongAnswer();
  } else {
     getHighScore()
//     loseGame();
  }
}
//Creates a button &callback function on click
function createButton(text, callback) {
  var button = document.createElement("button");
  button.innerHTML = text;
  button.addEventListener("click", callback);
  container.appendChild(button);
}
//Hides all buttons
function clearButtons() {
  var buttons = document.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
}
function toggleForm(state) {
  if (state === "show") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}
//Sorting function 
function compare(a, b) {
  if (a.time > b.time) return -1;
  if (a.time < b.time) return 1;
  return 0;
}
function saveScore() {
  if (localStorage.getItem("scores")) {
    highScoresArray = JSON.parse(localStorage.getItem("scores"));
  }
  highScoresArray.push({
    initials: input.value.toUpperCase().slice(0, 2),
    time: timer.innerHTML,
  });
  localStorage.setItem("scores", JSON.stringify(highScoresArray.sort(compare)));
  highScores();
}
function renderScores(scores) {
  if (scores) {
    for (i = 0; i < scores.length; i++) {
      var initials = document.createElement("span");
      var time = document.createElement("span");
      initials.innerHTML = scores[i].initials;
      time.innerHTML = scores[i].time + "s";
      var containerScores = document.createElement("div");
      containerScores.setAttribute("class", ".container-scores");
      document.querySelector(".container-scores").appendChild(containerScores);
      containerScores.appendChild(initials);
      containerScores.appendChild(time);
    }
  } else {
    document.querySelector(".container-scores").remove();
  }
}

function highScores() {
  container.setAttribute("style", "align-items: center;");
  text.setAttribute("style", "display: none");
  guide.setAttribute("style", "display: none");
  answer.innerHTML = "";
  mainHeading.innerHTML = "HIGH SCORES";
  document.querySelector("a").remove();
  document.querySelector("p").style.display = "none";
  clearButtons();

  form.setAttribute("state", "hidden");
  toggleForm(form.getAttribute("state"));

  var a = document.createElement("a");
  a.innerHTML = "Take Quiz";
  a.setAttribute("href", "./index.html");
  document.querySelector("header").appendChild(a);

  //Renders high scores to the page in local storage 
  renderScores(JSON.parse(localStorage.getItem("scores")));

  //Clears high scores 
  createButton("Clear Scores", function () {
    localStorage.clear();
    renderScores(localStorage.getItem("scores"));
  });
//  Go back to quiz 
  createButton("Go Back", function () {
    document.location.href = "./index.html";
  });
}

function getHighScore() {
  answer.innerHTML = "";
  mainHeading.innerHTML = `Your Score is: ${timer.innerHTML}s`;
  text.innerHTML = "Enter your initials and click Submit.";
  text.setAttribute("style", "display: contents");
  container.setAttribute("style", "align-items: center;");
  clearButtons();
  clearInterval(clock);

  // form for initials
  form.setAttribute("state", "show");
  toggleForm(form.getAttribute("state"));

  //Creates button to go back to home page
  var back = document.createElement("button");
  back.innerHTML = "Go Back";
  back.addEventListener("click", function () {
    document.location.href = "./index.html";
  });
  backsubmit.appendChild(back);

  //Creates button to submit form and save high score to local storage
  var submit = document.createElement("button");
  submit.innerHTML = "Submit";
  submit.addEventListener("click", function (event) {
    //Prevents page refresh on click
    event.preventDefault();
    saveScore();
  });
  backsubmit.appendChild(submit);

  //Saves high score to local storage 
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      saveScore();
    }
  });
}



