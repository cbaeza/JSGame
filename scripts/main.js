
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - ballRadius;
var dx = 2;
var dy = -2;

var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;	

function draw(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	registerButtonInteractions();
	drawBall();
	drawPaddle();

	// detect collision
	if( y + dy < ballRadius ){
		dy = -dy;
	}else if(y + dy > canvas.height - ballRadius ){
		if(x > paddleX  && x < paddleX + paddleWidth){
			dy = -dy;
		}else{
			alert('GAME OVER');
			document.location.reload();
		}
	}

	if( x + dx > canvas.width - ballRadius || x + dx < ballRadius ){
		dx = -dx;
	}
	// move paddle
	if(rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 7;
	}else if(leftPressed && paddleX > 0){
		paddleX -=7;
	}

	x += dx;
	y += dy;	
}

function registerButtonInteractions(){
	document.addEventListener('keydown', keyDownHandler);
	document.addEventListener('keyup', keyUpHandler);
}

function keyDownHandler(e){
	console.log('keydown', e);
	if(e.keyCode == 39){
		rightPressed = true;
	}else if(e.keyCode == 37){
		leftPressed = true;	
	}
}

function keyUpHandler(e){
	console.log('keyup', e);
	if(e.keyCode == 39){
		rightPressed = false;
	}else if(e.keyCode == 37){
		leftPressed = false;	
	}
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = '#ee0000';
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = '#0000FF';
	ctx.fill();
	ctx.closePath();
}

setInterval(draw, 1);
