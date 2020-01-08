$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
var isItAMatch = false;
var shuffleArray = [];

function initializeApp() {
  shuffleCards();
  $('.sc-cardback').click(handleCardClick);
  $('.modal').addClass('hidden');
  $('.modal').click(function () {
    $('.modal').addClass('hidden');
    $('.sc-cardback').removeClass('hidden');
    $('.sc-cardback').addClass('visible');
    $('.sc-cardback').next().removeClass('hidden');
    $('.game-container').removeClass('avoid-clicks');
    $('.attempts-count').text(0);
    $('.accuracy-percentage').text(0);
  })
  $('.modal-button').click(resetStats);
  audioCue();
}

function handleCardClick(event) {
  var target = $(event.currentTarget);
  $(target).addClass('hidden');
  $(target).removeClass('visible');
  cardsClicked();
}

function calculateAccuracy() {
  var percentage = matches / attempts;
  return Math.round(percentage * 100) + '%';
}

function displayStats() {
  var accuracyPercentage = calculateAccuracy();
  $('.games-played-count').text(games_played);
  $('.attempts-count').text(attempts);
  $('.accuracy-percentage').text(accuracyPercentage);
}

function matchCheck() {
  if (matches === max_matches) {
    $('.modal').removeClass('hidden');
    $('.game-container').addClass('avoid-clicks');
  }
}

function cardsClicked() {
  var target = $(event.currentTarget);
  if (firstCardClicked === null) {
    firstCardClicked = target;
    return;
  }

  secondCardClicked = target;
  if (firstCardClicked.siblings().css('background-image') === secondCardClicked.siblings().css('background-image') && firstCardClicked.parent().get(0) !== secondCardClicked.parent().get(0)) {
    $('.sc-cardback').addClass('avoid-clicks');
    $('.game-container').css('background-color', 'rgba(75, 140, 212, 0.6)');
    firstCardClicked.next().addClass('hidden');
    secondCardClicked.next().addClass('hidden');
    matches++;
    attempts++;
    isItAMatch = true;
    displayStats();
    firstCardClicked = null;
    secondCardClicked = null;
    matchCheck();
    setTimeout(function() {
      $('.sc-cardback').removeClass('avoid-clicks');
      $('.game-container').css('background-color', 'rgba(0, 0, 0, 0');
      isItAMatch = false;
    }, 2000);
    } else if (firstCardClicked.siblings().css('background-image') !== secondCardClicked.siblings().css('background-image')) {
      $('.sc-cardback').addClass('avoid-clicks');
      $('.game-container').css('background-color', 'rgba(200, 0, 0, 0.4');
      attempts++;
      displayStats();
      setTimeout(function () {
      firstCardClicked.removeClass('hidden');
      firstCardClicked = null;
      secondCardClicked.removeClass('hidden');
      secondCardClicked = null;
      $('.sc-cardback').removeClass('avoid-clicks');
      $('.game-container').css('background-color', 'rgba(0, 0, 0, 0');
    }, 2000)
  }
  if (matches === max_matches) {
    games_played++;
    displayStats();
  }
}

function resetStats() {
  shuffleCards();
  $('.sc-cardback').click(handleCardClick);
  matches = null;
  attempts = null;
}

function audioCue() {
  $('.sc-cardback').click(function() {
    playDing();
    playCardAudio(this);
  });
}

function playDing(){
  var clickAudio = new Audio('assets/sound/click-sound.wav');
  clickAudio.play();
}

function playCardAudio(clickedDiv) {
  var cardTarget = $(clickedDiv).attr('data-type');
  if (isItAMatch) {
    var targetSound2 = new Audio(`assets/sound/${cardTarget}2.wav`);
    targetSound2.play();
  } else {
    var targetSound = new Audio(`assets/sound/${cardTarget}.wav`);
    targetSound.play();
  }
}

function shuffleCards(){
  for (var i = 0; i < 18; i++){
    var card = $('.card#' + i).get(0);
    shuffleArray.push(card);
    $('div#' + i).remove();
  }
  for (var shuffleArrayIndex = 0; shuffleArrayIndex < 18; shuffleArrayIndex++) {
    var randomNum = Math.floor(Math.random() * shuffleArray.length);
    $('.game-container').append(shuffleArray[randomNum]);
    shuffleArray.splice(randomNum, 1);
  }
}
