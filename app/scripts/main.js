var unicorn = document.getElementById('unicornMoving');

unicorn.addEventListener('click', function (event) {
	TweenMax.to(unicorn, 2, {x:'+=200px'});
})