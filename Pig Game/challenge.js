var scores, roundScores, activePlayer, gamePlaying;

init();

//init function 

function init() {
	scores = [0, 0];
	roundScores = 0;
	activePlayer = 0;
	gamePlaying=true;

	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");

}
//document.querySelector("#current-"+activePlayer).textContent=dice;
//document.querySelector("#current-"+activePlayer).innerHTML="<em>"+dice+"</em>";

var lastDice;

document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function () {
	
	if (gamePlaying){
		//1.Random number
		var dice = Math.floor(Math.random() * 6) + 1;
		
		//2.Display the result

		document.querySelector(".dice").style.display = "block";
		document.querySelector(".dice").src = "img/dice-" + dice + ".png";
		
		if (dice===6 && lastDice===6){
			scores[activePlayer]=0;
			document.querySelector(".score-"+activePlayer).textContent=0;
			nextPlayer();
		}
		//3.update the result

		else if (dice !== 1) {
			roundScores += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScores;
		} else {
			nextPlayer();
		}
		
		lastDice=dice;
	};
	
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScores = 0;

	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");

	document.querySelector(".dice").style.display = "none";

};




document.querySelector(".btn-hold").addEventListener("click", function () {
	
	if (gamePlaying){
		scores[activePlayer] += roundScores;

		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
		
		var input=document.querySelector(".final-score").value;
		
		if (input){
			var winningScore=input;
		}else {
			winningScore=100;
		}


		if (scores[activePlayer] >= winningScore) {
			document.querySelector("#name-" + activePlayer).textContent = "Winner!!!";
			document.querySelector(".dice").style.display = "none";
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
			gamePlaying=false;
		} else {
			nextPlayer();
		}
	}
	


});

//Calling New Game
document.querySelector(".btn-new").addEventListener("click", init);