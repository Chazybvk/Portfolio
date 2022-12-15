var prev = document.querySelector('.previous');
var next = document.querySelector('.next');
var first = document.querySelector('.firstSlide');
var second = document.querySelector('.secondSlide');
var third = document.querySelector('.thirdSlide');
var fourth = document.querySelector('.fourthSlide');
var descrTitleFirst = document.querySelector('.descrTitleFirst');
var descrTextFirst = document.querySelector('.descrTextFirst');
var descrTitleSecond = document.querySelector('.descrTitleSecond');
var descrTextSecond = document.querySelector('.descrTextSecond');
var descrTitleThird = document.querySelector('.descrTitleThird');
var descrTextThird = document.querySelector('.descrTextThird');
var descrTitleFourth = document.querySelector('.descrTitleFourth');
var descrTextFourth = document.querySelector('.descrTextFourth');

var itterationCount = 2;
	
	function changeCount(){
		if (itterationCount < 1) {
			itterationCount = 4;
		}
		else if (itterationCount > 4) {
			itterationCount = 1;
		}
		else {
			itterationCount = itterationCount;
		}
		count();
	}

function count(){
	if (itterationCount == 1) {
		first.style = "transform: translateX(0%);";
		first.style.scale = "1.2";
		first.style.zIndex = "2";

		second.style = "transform: translateX(100%);";
		second.style.scale = "0.8";
		second.style.zIndex = "1";

		third.style = "transform: translateX(200%);";
		third.style.scale = "0.8";
		third.style.zIndex = "1";

		fourth.style = "transform: translateX(200%);";
		fourth.style.scale = "0.8";
		fourth.style.zIndex = "1";

		descrTitleFirst.style = "display: flex;";
		descrTextFirst.style = "display: flex;";

		descrTitleSecond.style = "display: none;";
		descrTextSecond.style = "display: none;";

		descrTitleThird.style = "display: none;";
		descrTextThird.style = "display: none;"; 

		descrTitleFourth.style = "display: none;";
		descrTextFourth.style = "display: none;"; 
	}
	else if (itterationCount == 2) {
		first.style = "transform: translateX(-100%);";
		first.style.scale = "0.8";
		first.style.zIndex = "1";

		second.style = "transform: translateX(0%);";
		second.style.scale = "1.2";
		second.style.zIndex = "2";

		third.style = "transform: translateX(100%);";
		third.style.scale = "0.8";
		third.style.zIndex = "1";

		fourth.style = "transform: translateX(200%);";
		fourth.style.scale = "0.8";
		fourth.style.zIndex = "1";

		descrTitleFirst.style = "display: none;";
		descrTextFirst.style = "display: none;";

		descrTitleSecond.style = "display: flex;";
		descrTextSecond.style = "display: flex;";

		descrTitleThird.style = "display: none;";
		descrTextThird.style = "display: none;";

		descrTitleFourth.style = "display: none;";
		descrTextFourth.style = "display: none;"; 
	}
	else if (itterationCount == 3) {
		first.style = "transform: translateX(-200%);";
		first.style.scale = "0.8";
		first.style.zIndex = "1";

		second.style = "transform: translateX(-100%);";
		second.style.scale = "0.8";
		second.style.zIndex = "1";

		third.style = "transform: translateX(0%);";
		third.style.scale = "1.2";
		third.style.zIndex = "2";

		fourth.style = "transform: translateX(100%);";
		fourth.style.scale = "0.8";
		fourth.style.zIndex = "1";

		descrTitleFirst.style = "display: none;";
		descrTextFirst.style = "display: none;";

		descrTitleSecond.style = "display: none;";
		descrTextSecond.style = "display: none;";

		descrTitleThird.style = "display: flex;";
		descrTextThird.style = "display: flex;";

		descrTitleFourth.style = "display: none;";
		descrTextFourth.style = "display: none;";
	}

	else if (itterationCount == 4) {
		first.style = "transform: translateX(-200%);";
		first.style.scale = "0.8";
		first.style.zIndex = "1";

		second.style = "transform: translateX(-200%);";
		second.style.scale = "0.8";
		second.style.zIndex = "1";

		third.style = "transform: translateX(-100%);";
		third.style.scale = "0.8";
		third.style.zIndex = "1";

		fourth.style = "transform: translateX(0%);";
		fourth.style.scale = "1.2";
		fourth.style.zIndex = "2";

		descrTitleFirst.style = "display: none;";
		descrTextFirst.style = "display: none;";

		descrTitleSecond.style = "display: none;";
		descrTextSecond.style = "display: none;";

		descrTitleThird.style = "display: none;";
		descrTextThird.style = "display: none;";

		descrTitleFourth.style = "display: flex;";
		descrTextFourth.style = "display: flex;";
	}
}

function previousSlide(){
	itterationCount = itterationCount -1;
	changeCount();
}	

function nextSlide(){
	itterationCount = itterationCount +1;
	changeCount();
}

prev.addEventListener('click', function () {
	previousSlide();
}
);

next.addEventListener('click', function () {
	nextSlide();
}
);

count();