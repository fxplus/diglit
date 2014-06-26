
var responses = new Array();
var responsecat = new Array();
// var qcount;
// var categories;

$( document ).ready(function() {
  $("#main-content .question").first().addClass('active');
  $("a.answer").click(collectResponse);
  $("a.pager").click(pager);
});

function getProfile() {
  categoryScores = categoryScores();
  console.log();
  var profile="";
  // for (var key in categoryScores) {
  //   console.log(key);
  //   profile += '<li>'+key+' '+categoryScores[key]+'</li>';
  // }

  profile += '<li>Digital Guru score <span>'+categoryScores["cat1"]+'</span></li>';
  profile += '<li>Digital Guru score <span>'+categoryScores["cat2"]+'</span></li>';
  profile += '<li>Digital Guru score <span>'+categoryScores["cat3"]+'</span></li>';
  profile += '<li>Digital Guru score <span>'+categoryScores["cat4"]+'</span></li>';
  profile += '<li>Digital Guru score <span>'+categoryScores["cat5"]+'</span></li>';
  profile += '<li>Digital Guru score <span>'+categoryScores["cat6"]+'</span></li>';

  $("#scores").html(profile);
}

function collectResponse() {
  var response = $(this).data("response");
  var step = $(this).parent().parent().parent().data("step");
  var qcat = $(this).parent().parent().parent().data("category");
  responses[step] = response;
  responsecat[step] = qcat;
  nextQuestion(step);
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
  for (i = 0; i < responses.length; ++i) {
    scores[responses[i]] = !(responses[i] in scores) ? 1 : scores[responses[i]]+1;
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

function categoryScores() {
  var scores = new Array();
  var catscores = new Array();
  var i = 0;
  for (i = 0; i < categories.length; ++i) {
    catscores[categories[i]] = 0;
  }
  var i = 0;
  for (i = 0; i < responses.length; ++i) {
    console.log(responses[i]);
    switch (responses[i]) {
      case "No":
        catscores[responsecat[i]] += 1;
        break;
      case "Sometimes":
        catscores[responsecat[i]] += 2;
        break;
      case "Yes":
        catscores[responsecat[i]] += 3;
        break;
      default:
        catscores[responsecat[i]] += 0;
    }
  }  
  return catscores.sort();
}

function nextQuestion(step) { 
  if (step < qcount-1) {
    $('#question' + step).removeClass('active').next().addClass('active');
  } else {
    $('#question' + step).removeClass('active');
    $('#scorecard').addClass('active');
    getProfile();
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

