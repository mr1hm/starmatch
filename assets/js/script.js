$(document).ready(initializeApp);

function initializeApp() {
  $('.card').click(handleCardClick);
}

function handleCardClick(event) {
  var target = $(event.currentTarget.children[0]);
  $(target).addClass('hidden');
}
