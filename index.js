$(document).ready(function() {
  var currentQuestion;
  var timeLeft = 10;
  var interval;
  var score = 0;
  var highScore = 0;
  var rangeValue = 10; // Default range value
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        $('#time-left').text(timeLeft);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);

    if (score > highScore) {
      highScore = score;
      $('#high-score').text(highScore);
    }
  };
  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(rangeValue); // Use the range value here
    var num2 = randomNumberGenerator(rangeValue); // Use the range value here

    question.answer = num1 + num2;
    question.equation = String(num1) + ' + ' + String(num2);

    return question;
  }

  currentQuestion = questionGenerator();
  $('#equation').text(currentQuestion.equation);

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  }

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

  $('#user-input').on('keyup', function () {
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  $('#number-range').on('input', function() {
    rangeValue = parseInt($(this).val());
    $('#range-value').text(rangeValue);
  });

  renderNewQuestion();

});
