'use strict';

//select elements
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const guess = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const restartBtn = document.querySelector('.again');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');

// With OOP --------------------------------------------------------
class App {
	#userScore = 20;
	#userHighScore = 0;
	#secretNumber = Math.trunc(Math.random() * 20) + 1;

	constructor() {

		// get data from local storage
		this._getLocalStorage();

		// ! Attached event handler
		checkBtn.addEventListener('click', this._checkGuess.bind(this));

		restartBtn.addEventListener('click', this._restartGame.bind(this));
	}

	_checkGuess() {
		const userGuess = Number(guess.value);
		console.log(userGuess);

		if (!userGuess) {
			this._displayMessage(`No number`);

		} else if (userGuess === this.#secretNumber) {
			this._displayMessage(`🎉 CORRECT NUMBER!`);
			number.textContent = this.#secretNumber;

			// css manipulating
			document.querySelector('body').style.backgroundColor = `#54a33d`;
			number.style.backgroundColor = `#ff503f`;

			// high score control
			this._checkHighScore();

			// set local storage -> highscore
			this._setLocalStorage();

		} else if (userGuess !== this.#secretNumber) {
			if (this.#userScore > 1) {
				this._displayMessage(userGuess > this.#secretNumber ? `Too high 👍` : `Too low 👎`);
				this.#userScore--;
				score.textContent = this.#userScore;

			} else {
				this._displayMessage(`⛔ YOU LOST`);
				document.querySelector(`body`).style.backgroundColor = `#b00505`;
				score.textContent = 0;
			}
		}
	}

	_displayMessage(msg) {
		message.textContent = msg;
	}

	_checkHighScore(){
		if (this.#userScore > this.#userHighScore) {
			this.#userHighScore = this.#userScore;
			highscore.textContent = this.#userHighScore;
		}
	}

	_restartGame(){
		this.#secretNumber = Math.trunc(Math.random() * 20) + 1;
		this.#userScore = 20;

		this._displayMessage(`Start guessing...`);
		number.textContent = `?`;
		score.textContent = this.#userScore;
		guess.value = '';
	
		document.querySelector(`body`).style.backgroundColor  = `#1c1d1c`;
		number.style.backgroundColor = `#1c1d1c`;
	}

	_setLocalStorage() {
		localStorage.setItem(`highscore`, JSON.stringify(this.#userHighScore));
	}
	
	_getLocalStorage() {
		const data = JSON.parse(localStorage.getItem(`highscore`));

		if (!data) return;

		this.#userHighScore = data;
		highscore.textContent = data;
	}
}

const app = new App();


// Without OOP --------------------------------------------------------
//// initial values
//let userScore = 20;
//let userHighScore = 0;
//
//let secretNumber = Math.trunc(Math.random() * 20) + 1;
////console.log(secretNumber);
//
//// check button event
//checkBtn.addEventListener('click', function() {
//	const userGuess = Number(guess.value);
//	
//	if (!userGuess) {
//
//		displayMessage('No number!');
//
//	} else if (userGuess === secretNumber) {
//
//		displayMessage('🎉 CORRECT NUMBER!');
//		number.textContent = secretNumber;
//
//		// css manipulation
//		document.querySelector('body').style.backgroundColor = '#54a33d';
//		number.style.backgroundColor = '#ff503f';
//
//		// highscore control
//		if (userScore > userHighScore) {
//			userHighScore = userScore;
//			highscore.textContent = userHighScore;
//		}
//		
//	} else if (userGuess !== secretNumber) {
//		if (userScore >  1) {
//			displayMessage(userGuess > secretNumber ? 'Too high 👍' : 'Too low 👎');
//			userScore--;
//			score.textContent = userScore;
//		} else {
//			displayMessage('⛔ YOU LOST');
//			score.textContent = 0;
//		}
//	}
//});
//
//// JS Hoisting
//function displayMessage(msg) {
//	message.textContent = msg;
//}
//
//// again button event
//restartBtn.addEventListener('click', function() {
//	secretNumber = Math.trunc(Math.random() * 20) + 1;
//	userScore = 20;
//
//	displayMessage('Start guessing...');
//	number.textContent = '?';
//	score.textContent = userScore;
//	guess.value = '';
//
//	document.querySelector('body').style.backgroundColor  = '#1c1d1c';
//	number.style.backgroundColor = '#1c1d1c';
//});
