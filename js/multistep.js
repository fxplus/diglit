var responses = new Array();
var responsecat = new Array();
// var qcount;

$( document ).ready(function() {
  $("#main-content .question").first().addClass('active');
  $("a.answer").click(collectResponse);
  $("a.pager").click(pager);
  // $("a.answer").click(function() { alert($(this).data('response')); });
  // $("a.answer").data( "response", 52 );
});

function collectResponse() {
  var response = $(this).data("response");
  var step = $(this).parent().parent().parent().data("step");
  var qcat = $(this).parent().parent().parent().data("category");
  responses[step] = response;
  responsecat[step] = qcat;
  console.log(responsecat);
  nextQuestion(step);
  collateScores();
}

function pager(action) {
  var step = $(".question.active").data("step")
  action = $(this).data("action");
  switch(action) {
    case 'previous':
      prevQuestion(step);
      break;
    case 'next':
      nextQuestion(step);
      break;
  }
}

function collateScores() {
  var scores = new Array();
  var i = 0;
  console.log(responses);
  for (i = 0; i < responses.length; ++i) {
    scores[responses[i]] = !(responses[i] in scores) ? 1 : scores[responses[i]]+1;
    console.log(responses[i]);
  }
  return scores;
}

function collateScoresByCategory() {
  var scores = new Array();
  var catscores = new Array();
  var i = 0;
  console.log(responses);
  for (i = 0; i < responses.length; ++i) {

    scores[responses[i]] = !(responses[i] in scores) ? 1 : scores[responses[i]]+1;
    console.log(responses[i]);
  }
  return scores;
}

function listScores() {
  scores = collateScores();
  var scorelist = "";
  for (var answer in scores) {
    scorelist += '<li>'+answer+' '+scores[answer]+'</li>';
  }
  $("#scores").html(scorelist);
}

function nextQuestion(step) { 
  if (step < qcount-1) {
    $('#question' + step).removeClass('active').next().addClass('active');
  } else {
    $('#question' + step).removeClass('active');
    $('#scorecard').addClass('active');
    createProfile();
  }
}
function prevQuestion(step) {
  if (step >= qcount) {
    $('#question' + step).removeClass('active');
    $('#scorecard').addClass('active');
    return
  }
  if (step > 0) {
    $('#question' + step).removeClass('active').prev().addClass("active");
  }
}
function debug(message) {
  $("#message").html(message);
}

function collateScoresByCategory() {
  scores = collateScores();


  $("#scores").html("You are a tech god");
}
