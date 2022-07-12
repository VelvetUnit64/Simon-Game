var buttoncolors = ["red", "blue", "green", "yellow"];
var userclicked = [];
var gamepattern = [];
var level = 1;
$(document).keydown((function() {

    if (level == 1) {
        $("h1").text("Level 0");
        gamepattern = [];
        randomgenerator();
    }

}));

$(".btn").click(function() {
    var userchosencolor = this.id;
    userclicked.push(userchosencolor);
    animatepress(userchosencolor);
    playsound(userchosencolor);
    checkAnswer(userclicked.length - 1);
});

function randomgenerator() {

    var ran_no = Math.floor(3 * Math.random()) + 1;
    var randomChosenColor = buttoncolors[ran_no];
    gamepattern.push(randomChosenColor);
    $("h1").text("Level " + level);
    level++;
    animatepress(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
}

function playsound(name) {
    var audio = new Audio('sounds\\' + name + '.mp3 ');
    audio.play();
}

function animatepress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userclicked[currentLevel] === gamepattern[currentLevel]) {
        console.log("Sucess");


        if (userclicked.length === gamepattern.length) {
            userclicked = [];
            setTimeout(function() {
                randomgenerator();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        console.log("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        playsound("wrong");
        $("h1").text("Game over press any key to refresh");
        level = 1;
        userclicked = [];
    }
}