var started = false;
var level = 0;
var buttoncolors = ["red", "blue", "green", "yellow"];
var userclickedpattern = [];
var gamepattern = [];
var randomchosencolor;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    } 
});

// This is for the user clicking
$(".btn").on("click", function() {
    if (started) {
        var userchosencolor = $(this).attr("id");
        userclickedpattern.push(userchosencolor);
        playsound(userchosencolor);
        animatepress(userchosencolor);
        checkAnswer(userclickedpattern.length - 1);
    }
});

function nextsequence() {
    userclickedpattern = []; // Reset the user's clicked pattern
    level++;    
    $("#level-title").text("Level " + level);
    
    // Select a new random color
    var rannumber = Math.floor(Math.random() * 4);
    randomchosencolor = buttoncolors[rannumber];   
    gamepattern.push(randomchosencolor); // Add the new color to the game pattern

    setTimeout(() => {
        showpattern(gamepattern);
    }, 100); 
}

function playsound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatepress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userclickedpattern[currentLevel] === gamepattern[currentLevel]) {
        if (userclickedpattern.length === gamepattern.length) {
            setTimeout(function() {
                nextsequence();
            }, 1000);
        }
    } else {
        var a = new Audio("./sounds/wrong.mp3");
        a.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("h1").text("Game Over, Press any key to restart");
            $("body").removeClass("game-over");
        }, 200);
        startover();
    }
}

function startover() {
    level = 0;
    gamepattern = [];
    started = false;
}

function showpattern(pattern) {
    for (let i = 0; i < pattern.length; i++) {
        setTimeout(() => {
            animatepress(pattern[i]);
            playsound(pattern[i]);
        }, 600 * i);
    }
}

