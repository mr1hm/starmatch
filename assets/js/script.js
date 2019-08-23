$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;

function initializeApp() {
  $('.lfz-card').click(handleCardClick);
  $('.modal-button').click(function () {
    $('.modal').addClass('hidden');
    $('.lfz-card').removeClass('hidden');
    $('.container').removeClass('avoid-clicks');
    $('.attempts-count').text(0);
    $('.accuracy-percentage').text(0);
  })
}

function handleCardClick(event) {
  var target = $(event.currentTarget);
  $(target).addClass('hidden');
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
    $('.container').addClass('avoid-clicks');
  }
}

function cardsClicked() {
  var target = $(event.currentTarget);
  if (firstCardClicked === null) {
    firstCardClicked = target;
    return;
  }
    secondCardClicked = target;

  if (firstCardClicked.siblings().css('background-image') === secondCardClicked.siblings().css('background-image')) {
    console.log('cards match');
    $('.lfz-card').addClass('avoid-clicks');
    $('.container').css('background-color', 'rgba(0, 200, 0, 0.4');
    matches++;
    attempts++;
    displayStats();
    firstCardClicked = null;
    secondCardClicked = null;
    matchCheck();
    setTimeout(function() {
      $('.lfz-card').removeClass('avoid-clicks');
      $('.container').css('background-color', 'rgba(0, 0, 0, 0.4');
    }, 750);
    } else if (firstCardClicked.siblings().css('background-image') !== secondCardClicked.siblings().css('background-image')) {
      $('.lfz-card').addClass('avoid-clicks');
      $('.container').css('background-color', 'rgba(200, 0, 0, 0.4');
      attempts++;
      displayStats();
      setTimeout(function () {
      firstCardClicked.removeClass('hidden');
      firstCardClicked = null;
      secondCardClicked.removeClass('hidden');
      secondCardClicked = null;
      $('.lfz-card').removeClass('avoid-clicks');
      $('.container').css('background-color', 'rgba(0, 0, 0, 0.4');
    }, 750)
  }
  if (matches === max_matches) {
    games_played++;
    displayStats();
    resetStats();
  }
  // IF TWO CARDS DON'T MATCH, YOU CAN FREELY CHECK OTHER CARDS, AND WHEN THEY MATCH, IT WILL KEEP THE UNMATCHED CARDS REVEALED!!
  // MAYBE WE CAN USE A clearTimeout FUNCTION HERE TO PREVENT CHEATING!!!
  // INSTEAD OF A clearTimeout, I ended up adding a class called avoid-clicks and using (pointer events: none) in CSS.
    // This will prevent any pointer events such as clicks to not register.
}

function resetStats() {
  matches = null;
  attempts = null;
}
