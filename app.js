var state = {
	questions: [
	{
	q: "What is bubble milk tea?",
	choices: ["A tea latte topped with foam",
	"A tea with milk and art foam of bubbles",
	"A tea with milk and chewy tapiocas",
	"A tea with milk that has bubble gum flavor"],
	correctIndex: 2
}, {
	q: "What is bubble made of?",
	choices: ["Starch",
	"Gelatin",
	"Pudding",
	"Honey"],
	correctIndex: 0
}, {
	q: "What is the texture of the bubbles?",
	choices: ["Jelly Beans",
	"Sour Patch",
	"Starburst",
	"Gummy Bears"],
	correctIndex: 3
}, {
	q: "How do you make bubbles?",
	choices: ["Microwave it",
	"Boil it",
	"Bake it",
	"Slow cook it"],
	correctIndex: 1
}, {
	q: "What types of tea is usually used to make bubble milk tea?",
	choices: ["Green tea",
	"Black tea",
	"Green tea and black tea",
	"Fermented tea"],
	correctIndex: 2
}, {
	q: "Where is bubble milk tea originated from?",
	choices: ["Singapore",
	"Thailand",
	"China",
	"Taiwan"],
	correctIndex: 3
}, {
	q: "What type of milk can be used to make bubble milk tea?",
	choices: ["Milk (fatfree or whole milk)",
	"Creamer",
	"Soymilk",
	"All of the above"],
	correctIndex: 3
}, {
	q: "Can you drink it hot or cold?",
	choices: ["Both hot and cold",
	"Hot only",
	"Cold only",
	"Luke warm only"],
	correctIndex: 0
}, {
	q: "Is it caffeinated?",
	choices: ["No, they're all decaffeinated",
	"Yes, they're all caffeinated",
	"Only certain teas are caffeinated",
	"None of the above"],
	correctIndex: 2
}, {
	q: "How many sizes do bubbles come in?",
	choices: ["1",
	"2",
	"3",
	"4"],
	correctIndex: 1
}], 
	approval: [
	"Woohoo! You are correct!", "B I N G O!", "Well done!"],
	disapproval: [
	"Uh Oh! That is incorrect!", "Oh no! That doesn't seem right.", "FALSE!"],

	score: 0,
	currentQuestionIndex: 0,
	route: 'start',
	lastCorrectAnswer: false,
	feedbackRandom: 0
};

// state modification


function setRoute(state, route) {
	state.route = route;
}


function answerQuestion(state, answer) {
	var currentQuestion = state.questions[state.currentQuestionIndex];
	state.lastCorrectAnswer = currentQuestion.correctIndex === answer;
	if (state.lastCorrectAnswer) {
		state.score++;
	}
	selectFeedback(state);
	setRoute(state, 'answer-feedback');
}

function selectFeedback(state) {
	state.feedbackRandom = Math.random();
}

function advance(state) {
	state.currentQuestionIndex++;
	if (state.currentQuestionIndex === state.questions.length) {
		setRoute(state, 'final-feedback');
	}
	else {
		setRoute(state, 'question');
	}
}

function resetQuiz(state) {
	state.score = 0;
	state.currentQuestionIndex = 0;
	setRoute(state, 'start');
}

// render functions


function renderApp(state, elements) {
	Object.keys(elements).forEach(function(route) {
		elements[route].hide();
	});
	elements[state.route].show();

	if (state.route === 'start') {
		renderWelcomePage(state, elements[state.route]);
	}
	else if (state.route === 'question') {
		renderQuestionPage(state, elements[state.route]);
	}
	else if (state.route === 'answer-feedback') {
		renderAnswerFeedbackPage(state, elements[state.route]);
	}
	else if (state.route === 'final-feedback') {
		renderFinalFeedbackPage(state, elements[state.route]);
	}
}


function renderWelcomePage(state, element) {

}


function renderQuestionPage(state, element) {
	renderQuestionCount(state, element.find('.question-count'));
	renderQuestion(state, element.find('.quiz-question'));
	renderChoices(state, element.find('.choices'));
}


function renderAnswerFeedbackPage(state, element) {
	renderAnswerFeedbackText(state, element.find('.feedback-text'));
	renderNextButton(state, element.find('.next'));
}


function renderFinalFeedbackPage(state, element) {
	renderFinalFeedbackText(state, element.find('.quiz-results'));
}


function renderQuestionCount(state, element) {
	var text = (state.currentQuestionIndex + 1) + ' out of ' +
	state.questions.length + ' questions: ';

	element.text(text);
}

function renderQuestion(state, element) {
	var currentQuestion = state.questions[state.currentQuestionIndex];
	element.text(currentQuestion.q);
}


function renderChoices(state, element) {
	var currentQuestion = state.questions[state.currentQuestionIndex];
	var choices = currentQuestion.choices.map(function(choice, index) {
		return ('<li>' + '<input type="radio" name="user-answer" value="'
			+ index + '" required>' + 
			'<label>' + ' ' + choice + '</label>' + '</li>');
	});
	element.html(choices);
}



function renderAnswerFeedbackText(state, element) {
	var choices = state.lastCorrectAnswer ?
	state.approval : state.disapproval;
	var text = choices[Math.floor(state.feedbackRandom * choices.length)];

	element.text(text);
}


function renderNextButton(state, element) {
	var text = state.currentQuestionIndex < state.questions.length - 1 ?
	"Next" : "Show results";

	element.text(text);
}


function renderFinalFeedbackText(state, element) {
	var text = "Your score is: " + state.score + " out of " +
	state.questions.length + " questions correct.";

	element.text(text);
}


// event listeners


var pageElements = {
	'start': $('.welcome-page'),
	'question': $('.QA-page'),
	'answer-feedback': $('.feedback-page'),
	'final-feedback': $('.final-feedback-page')
}


$('.welcome-page-form').submit(function(event) {
	event.preventDefault();
	setRoute(state, 'question');
	renderApp(state, pageElements);
});


$('.submit-answer').submit(function(event) {
	event.preventDefault();
	var answer = $('input[name="user-answer"]:checked').val();
	answer = parseInt(answer, 10);
	answerQuestion(state, answer);
	renderApp(state, pageElements);
});


$('.feedback-form').submit(function(event) {
  event.preventDefault();
	advance(state);
	renderApp(state, pageElements);
});

$(".reset-quiz").click(function(event) {
	event.preventDefault();
	resetQuiz(state);
	renderApp(state, pageElements);
});


$(function() {
	renderApp(state, pageElements);
});


































