$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;

function initializeApp() {
  $('.sc-cardback').click(handleCardClick);
  $('.modal-button').click(function () {
    $('.modal').addClass('hidden');
    $('.sc-cardback').removeClass('hidden');
    $('.sc-cardback').addClass('visible');
    $('.container').removeClass('avoid-clicks');
    $('.attempts-count').text(0);
    $('.accuracy-percentage').text(0);
  })
  audioCue();
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
    $('.sc-cardback').addClass('avoid-clicks');
    $('.container').css('background-color', 'rgba(0, 200, 0, 0.4');
    matches++;
    attempts++;
    displayStats();
    firstCardClicked = null;
    secondCardClicked = null;
    matchCheck();
    setTimeout(function() {
      $('.sc-cardback').removeClass('avoid-clicks');
      $('.container').css('background-color', 'rgba(0, 0, 0, 0.4');
    }, 1500);
    } else if (firstCardClicked.siblings().css('background-image') !== secondCardClicked.siblings().css('background-image')) {
      $('.sc-cardback').addClass('avoid-clicks');
      $('.container').css('background-color', 'rgba(200, 0, 0, 0.4');
      attempts++;
      displayStats();
      setTimeout(function () {
      firstCardClicked.removeClass('hidden');
      firstCardClicked = null;
      secondCardClicked.removeClass('hidden');
      secondCardClicked = null;
      $('.sc-cardback').removeClass('avoid-clicks');
      $('.container').css('background-color', 'rgba(0, 0, 0, 0.4');
    }, 1500)
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

function audioCue() {
  var cardBack = document.getElementById('click-audio');
  $('.sc-cardback').click(function() {
    cardBack.play();
  })
}

// function make_guess4() {
//   var the_guess4 = $('#guess_input4').val();
//   var youGuessedItRightImg = "<img src='./scaryimage.jpg'>";
//   var audio = new Audio("aaaah.wav");
//     else if (the_guess4 == the_number4) {
//     $('body').html(youGuessedItRightImg);
//     audio.play();
//     $('#responsive_div4').text('You Guessed it');
//   }
// }
