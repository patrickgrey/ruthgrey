var unicorn = document.getElementById('unicornMoving');
var blueRectangle = document.getElementById('blueRectangle');

var how_far = 30;
var time = 0.5;

var play_sound = function() {
  var sound = new Audio('sounds/unicorn.mp3');
  sound.play();
};

$('#unicornMoving').click(function(event) {
  TweenMax.to(unicorn, time, {
    x: '+=' + how_far + 'px',
    onStart: play_sound,
    onComplete: I_am_complete
  });
});

// This is our plan!
// If unicorn is past end of blue rectangle,
// send unicorn back to start so we don't lose it.

var I_am_complete = function() {
  var position = unicorn.getBoundingClientRect();
  // console.log(position.left);
  console.log('I am unicorn and I am in position: ', position.right);

  var width_of_blue_rectangle = blueRectangle.getBoundingClientRect();

  console.log(
    'I am the blue rectangle and I am this fat: ',
    width_of_blue_rectangle.right
  );

  if (position.right > width_of_blue_rectangle.right) {
    console.log('I am too far!!!!!');
    TweenMax.to(unicorn, time, { x: 0 });
  }
};

/**/

// #ruthContainer

// var maximumDistance = 700;

// TweenMax.to(unicorn, time, {x:'+='+how_far+'px', onComplete: I_am_complete, onStart: play_sound});

/*


var play_sound = function () {
	
	var sound = new Audio('sounds/unicorn.mp3');
	sound.play();
	
}*/
