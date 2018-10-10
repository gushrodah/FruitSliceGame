var isPlaying = false;
var score = 0;
var lives = 3;
const maxLives = 3;
var step;
var fruitNames = ['apple', 'banana', 'grapes', 'orange']
var action;

$(function(){
    $("#startButton").click(function(){
        if(isPlaying){
            location.reload();
        }
        else{
            ResetGame();
            startAction();
        }
    });
});

function AddHearts() {
    $("#livesValue").empty();
    for (var i = 0; i < lives; i++) {
        $("#livesValue").append('<img src="Images/heart.png" class="lives"></img>');
    }
}

function ResetGame() {
    isPlaying = true;
    score = 0;
    $("#scoreValue").html(score);
    lives = maxLives;
    AddHearts();
}

function startAction(){
    spawnFruit();
    // setup 
    $("#fruit1").mouseover(function(){
        console.log("hit");
        SuccessfulSlice();
    });
    // loop
    action = setInterval(function(){
        var pos = $("#fruit1").position().top + step;
        $("#fruit1").css({'top': pos});
        
        if($("#fruit1").position().top > $("#playspace").height()){
            LoseLife();
            spawnFruit();
            if(lives <= 0)
            {
                stopAction();
            }
        }
    },10);
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
    $("#endGameMsg").show();
    $("#finalScore").html(score);
}

function SuccessfulSlice(){
    score ++;
    $("#scoreValue").html(score);
    //$("#fruit1").hide("explode", 500);
    //setTimeout(spawnFruit, 500);
    spawnFruit();
}

function LoseLife(){
    lives--;
    AddHearts();
}

function spawnFruit(){
    $("#fruit1").show();
    var num = Math.round(90*Math.random());
    $("#fruit1").css({'left':num+"%", 'top':-50});
    chooseFruit();
    step = Math.round(5*Math.random()) + 1;
}

function chooseFruit(){
    $("#fruit1").attr('src', 'Images/'+ fruitNames[Math.round((fruitNames.length-1)*Math.random())] +'.png')
}