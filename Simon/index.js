var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
// keep track if game is started and level counter
var started = false;
var level = 0;

// webpage awaits for user to start the game with any keystroke 
$(document).keypress(function(){			
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});


    // Add click listener to all buttons with (class = .btn)
$(".btn").click(function() {				
    var userChosenColor = $(this).attr('id')
    // console.log(userChosenColor);                                      -> TEST : WHAT DID THE USER SELECT
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})


function restartGame(){
    level = 0
    started = false
    gamePattern = []
}

function checkAnswer(level){
    // compares the last index of both arrays
    if (gamePattern[level] === userClickedPattern[level]){
        //console.log("MATCH")                                          -> TEST : DID USER SELECT RIGHT COLOR
        //console.log(userClickedPattern)                               -> TEST : ALL THE USER'S SELECTED COLORS
        
        // once they are the same length it means the user has entered all colors
        if (userClickedPattern.length === gamePattern.length)
        setTimeout(function () {
            //console.log(userClickedPattern)                             -> TEST : ALL THE USER'S SELECTED COLORS
            nextSequence();
          }, 1000);
    }

    else{
        // console.log("WRONG")                                         -> TEST :  DID THE USER GET IT WRONG

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 300);

          $("#level-title").text("Game Over, Press Any Key to Restart ");
          var loseAudio = new Audio("sounds/wrong.mp3")
          loseAudio.play();
          restartGame();
    }  
}


function nextSequence(){
    // clear user array each time to check each input
    userClickedPattern = [];
    // Increment level and update scoretracker each time func is called
    level++;
    $("#level-title").text("Level " + level);
    // Generate random color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    console.log("#" + randomChosenColor)
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor)
}

function playSound(color){
  // jQuery to select the chosen color and play corresponding sound
  var audio = new Audio('sounds/' + color + '.mp3');
  audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");

    // Remove .pressed animation after 100ms
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
      }, 100);
}

