$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
var isItAMatch = false;

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
  // $('.card').shuffle();
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
    console.log(firstCardClicked.siblings().css('background-image'));
    $('.sc-cardback').addClass('avoid-clicks');
    $('.container').css('background-color', 'rgba(75, 140, 212, 0.6)');
    matches++;
    attempts++;
    isItAMatch = true;
    displayStats();
    firstCardClicked = null;
    secondCardClicked = null;
    matchCheck();
    setTimeout(function() {
      $('.sc-cardback').removeClass('avoid-clicks');
      $('.container').css('background-color', 'rgba(0, 0, 0, 0.4');
      isItAMatch = false;
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
  //$('.sc-cardback').removeClass('visible');
  // $('.card').shuffle();
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
  console.log(cardTarget);
  if (isItAMatch) {
    var targetSound2 = new Audio(`assets/sound/${cardTarget}2.wav`);
    targetSound2.play();
  } else {
    var targetSound = new Audio(`assets/sound/${cardTarget}.wav`);
    targetSound.play();
  }
}

// function shuffleCards(){
//   for (var i = 0; i < 18; i++){
//     var randomNum = Math.floor(Math.random() * 18);
//     if ($('.card').index() !== randomNum) {
//       $('.card').index(randomNum)
//     } else {
//       $('.card').index()
//     }

//   }
// }

// (function($){
//   $.fn.shuffle = function() {
//     var allElements = this.get(),
//         getRandom = function(max) {
//           console.log(max);
//           return Math.floor(Math.random() * max);
//         },
//         shuffled = $.map(allElements, function(){
//           var random = getRandom(allElements.length),
//               randomElement = $(allElements[random]).clone(true)[0];
//               console.log(randomElement);
//           allElements.splice(random, 1);
//           return randomElement;
//         });
//       this.each(function(i){
//         $(this).replaceWith($(shuffled[i]));
//       });
//       return $(shuffled);
//   };
// })(jQuery);
