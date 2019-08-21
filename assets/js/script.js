$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function initializeApp() {
  $('.lfz-card').click(handleCardClick);
}

function handleCardClick(event) {
  var target = $(event.currentTarget);
  $(target).addClass('hidden');
  cardsClicked();
}

function cardsClicked() {
  var target = $(event.currentTarget);
  if (firstCardClicked === null) {
    firstCardClicked = target;
  } else if (firstCardClicked) {
    secondCardClicked = target;
  }
  if (firstCardClicked.siblings().css('background-image') === secondCardClicked.siblings().css('background-image')) {
    console.log('cards match');
    $('.lfz-card').addClass('avoid-clicks');
    $('.container').css('background-color', 'white');
    matches++;
    firstCardClicked = null;
    secondCardClicked = null;
    setTimeout(function() {
      $('.lfz-card').removeClass('avoid-clicks');
      $('.container').css('background-color', 'rgba(200, 0, 0, 0.4)');
    }, 1500);
    } else if (firstCardClicked.siblings().css('background-image') !== secondCardClicked.siblings().css('background-image')) {
      $('.lfz-card').addClass('avoid-clicks');
      $('.container').css('background-color', 'white');
      setTimeout(function () {
      firstCardClicked.removeClass('hidden');
      firstCardClicked = null;
      secondCardClicked.removeClass('hidden');
      secondCardClicked = null;
      $('.lfz-card').removeClass('avoid-clicks');
      $('.container').css('background-color', 'rgba(200, 0, 0, 0.4)');
    }, 1500)
  }
  // IF TWO CARDS DON'T MATCH, YOU CAN FREELY CHECK OTHER CARDS, AND WHEN THEY MATCH, IT WILL KEEP THE UNMATCHED CARDS REVEALED!!
  // MAYBE WE CAN USE A clearTimeout FUNCTION HERE TO PREVENT CHEATING!!!
  // INSTEAD OF A clearTimeout, I ended up adding a class called avoid-clicks and using (pointer events: none) in CSS.
    // This will prevent any pointer events such as clicks to not register.
}
