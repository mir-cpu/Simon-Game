var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
// random number generator code
$(document).keypress(function(event){
if(!started){
  $("#level-title").text("Level " + level);
  nextSequence();
  started=true;
}
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var n=Math.random()*4;
  var randomNumber=Math.floor(n);
 var randomChoosenColor=buttonColors[randomNumber];
 gamePattern.push(randomChoosenColor);
 $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChoosenColor);
}
// mouse click eventlisterner code
$(".btn").click(function(){
  var userChoosenColor=$(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  // console.log(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// button_sound code
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
// Animation when a click is received
function animatePress(currentcolor){
$("#" + currentcolor).addClass("pressed");
setTimeout(function(){
  $("#" + currentcolor).removeClass("pressed");
},100);
}
function checkAnswer(currentlevel){
  if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
    console.log("success");

    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
      }
}
  else{
    $("#level-title").text("Try Again");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
  }
}
