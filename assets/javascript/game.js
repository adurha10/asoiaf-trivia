
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var currentQuestion = {};
var timer = 0;
var timerIntervalId;
var newQuestionId;
var questionIndex = 0;
var usedQuestions = [];

var dispObject = [

		q1 = {

			questionDisplay: "Who did Robert Baratheon famously kill in single combat at the Trident?",

			answerDisplay: ["Ned Stark", "Aerys Targaryen", "Rhaegar Targaryen", "Luke Skywalker"],

			answerIs: 2
		},

		q2 = {

			questionDisplay: "What is the name of the cryptic advisor to Daenerys who always wears a red lacquered mask?",

			answerDisplay: ["Varys", "Quaithe", "Drogo", "Jorrah"],

			answerIs: 1
		},

		q3 = {

			questionDisplay: "Which of the following is not a name of one of the Stark children's direwolves?",

			answerDisplay: ["Shaggy Dog", "Summer", "Lady", "The Hound"],

			answerIs: 3
		},

		q4 = {

			questionDisplay: "Who is the father of Jorrah Mormont?",

			answerDisplay: ["Jeor - Lord Commander of the Night's Watch", "Maester Aemon", "Walder Frey", "Mance Rayder"],

			answerIs: 0
		},

		q5 = {

			questionDisplay: "Which of the following is not a child of Cirsei Lannister?",

			answerDisplay: ["Tommen", "Renly", "Jeoffery", "Myracella"],

			answerIs: 1
		},

		q6 = {

			questionDisplay: "What is the name of Jon Snow's Valyrian steel sword?",

			answerDisplay: ["Ice", "OathKeeper", "Longclaw", "Heartsbane"],

			answerIs: 2
		},

		q7 = {

			questionDisplay: "Which is not the name of one of Daenerys' dragons?",

			answerDisplay: ["Balerion", "Viserion", "Rhaegal", "Drogon"],

			answerIs: 0
		},

		q8 = {

			questionDisplay: "What are the words of house Lannister?",

			answerDisplay: ["A Lannister always pays his debts.", "Ours is the fury", "Hear me roar", "Unbowed, Unbent, Unbroken"],

			answerIs: 2
		},

		q9 = {

			questionDisplay: "How do the Maesters signal the start of winter?",

			answerDisplay: ["A great winter feast is held and all lords invited", "White ravens are sent to each lordly house. ", "A sacrificial ox is burned in the night. ", "Each Maester must inform their lord privately. "],

			answerIs: 1
		},

		q10 = {

			questionDisplay: "Which city is Melisandre from?",

			answerDisplay: ["Ashai", "Bravos", "Valyria", "Dorne"],

			answerIs: 0
		}
	];


function refreshScreen(){
		$("#question-display").empty();
		$("#answer-display").empty();
		// if (dispObject[dispObj].timerUsed === true){
		timer = 30;
		timerIntervalId = setInterval(updateTimer, 1000);
		// };

		// $("#question-display").html(dispObject[dispObj].questionDisplay);
		// // if (dispObj === 0){
		// // 	$("#answer-display").html(dispObj.answerDisplay);
		// // } else if (dispObj === 1){
		// // 	$("#answer-display").empty();
		// } else {
		$("#question-display").html(currentQuestion.questionDisplay);
		console.log(currentQuestion);
			for (var i = 0; i < currentQuestion.answerDisplay.length; i++) {
				var answerChoice = $("<p>");
				answerChoice.addClass("answers");
				answerChoice.attr("id", i);
				answerChoice.on("click", checkAnswer);
				answerChoice.text(currentQuestion.answerDisplay[i]);
				console.log(answerChoice);
				$("#answer-display").append(answerChoice);
			};
		//};
};

function updateTimer(){
		$("#timer-display").text(timer);
		if (timer <= 0){
			clearInterval(timerIntervalId);
			unanswered++;
			$("#question-display").html("Time's up!");
			$("#answer-display").html("The correct answer was " + currentQuestion.answerDisplay[currentQuestion.answerIs]);
			newQuestionId = setInterval(chooseQuestion, 4*1000);
		}
		timer--;
};

function chooseQuestion(){
	
		clearInterval(newQuestionId);
	 	questionIndex = Math.floor(Math.random() * dispObject.length);
	 	if (usedQuestions.length<dispObject.length){
		 	while (usedQuestions.indexOf(questionIndex) !== -1){
		 		questionIndex = Math.floor(Math.random() * dispObject.length);
		 	}
		 	usedQuestions.push(questionIndex);
			currentQuestion = dispObject[questionIndex];
			console.log(questionIndex);
					console.log(currentQuestion);

			refreshScreen();
	 	} else {
	 		gameOver()
	 	};
};

function checkAnswer(){
	console.log(this.id);
	console.log(currentQuestion.answerIs);
		if (this.id == currentQuestion.answerIs){
			$("#answer-display").html("Great job! You got it right!");
			correct++;
		} else {
			$("#answer-display").html("Sorry the correct answer was " + currentQuestion.answerDisplay[currentQuestion.answerIs]);
			incorrect++;
		}
	clearInterval(timerIntervalId);

	newQuestionId = setInterval(chooseQuestion, 4*1000);
};

function gameOver(){
		$("#question-display").html("Here are your final results: ");
		$("#answer-display").empty();
		$("#answer-display").append("<br><p> Correct answers: " + correct);
		$("#answer-display").append("<br><p> Incorrect answers: " + incorrect);
		$("#answer-display").append("<br><p> Unanswered: " + unanswered); 
		startBtn = $("<button>");
		startBtn.addClass("btn");
		startBtn.addClass("btn-primary");
		startBtn.addClass("btn-block");
		startBtn.text("Start")
		startBtn.on("click", chooseQuestion);
		$("#answer-display").append(startBtn);
		resetVars();
};


function resetVars(){
		correct = 0;
		incorrect = 0;
		unanswered = 0
		currentQuestion = {};
		usedQuestions = [];
};

function innitScreen(){
		$("#question-display").html("Welcome to 'A Quiz of Ice and Fire.' Click 'Start' to begin your trial by questions.");
		startBtn = $("<button>");
		startBtn.addClass("btn");
		startBtn.addClass("btn-primary");
		startBtn.addClass("btn-block");
		startBtn.text("Start")
		startBtn.on("click", chooseQuestion);
		$("#answer-display").append(startBtn);
};

innitScreen();