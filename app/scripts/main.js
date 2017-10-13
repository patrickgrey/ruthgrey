var unicorn = document.getElementById('unicornMoving');

var how_far = 100;
var time = 0.5;



var play_sound = function () {
	
	var sound = new Audio('sounds/unicorn.mp3');
	sound.play();
	
}



$('#unicornMoving').click(
		function (event) {
			TweenMax.to(unicorn, time, {x:'+='+how_far+'px', onStart: play_sound});
		}
);










// var maximumDistance = 700; 

// TweenMax.to(unicorn, time, {x:'+='+how_far+'px', onComplete: I_am_complete, onStart: play_sound});

/*var I_am_complete = function () {
	
	var position = unicorn.getBoundingClientRect();
  console.log(position.left);
  
};


var play_sound = function () {
	
	var sound = new Audio('sounds/unicorn.mp3');
	sound.play();
	
}*/