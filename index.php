<?php
require_once("includes/questions.class.php");
require_once("includes/krumo/class.krumo.php");

$questions = new Questions("questions.csv");
$questionlist = $questions->shuffleQuestions();
?>

<!DOCTYPE html>
<html>
  <head>
    <title>iTest</title>
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script>var qcount = <?php echo count($questionlist); ?>;</script>
    <script src="js/multistep.js"></script>
    <link rel="stylesheet" type="text/css" href="view/style.css" media="screen">
  </head>
  <body>
    <div id="main-content">
      <span id="message"></span>
      <div id="questions">
        <?php foreach($questionlist as $step => $question) { ?>
          <div data-step="<?php echo $step; ?>" data-category="<?php echo $question['cat']; ?>" id="question<?php echo $step; ?>" class="question">
            <h1><?php echo $question['q']; ?></h1>
            <ul>
              <li><a class="btn answer" data-response="No">Not really</a></li>
              <li><a class="btn answer" data-response="Sometimes">Sometimes</a></li>
              <li><a class="btn answer" data-response="Yes">Yep</a></li>
            </ul>
          </div>
        <?php }; ?>
      </div>
      <div id="scorecard">
        <h1>And here are the scores with George Doors!</h1>
        <ul id="scores">
        </ul>
      </div>
      <div id="pager">
        <ul>
          <li><a class="btn pager" data-action="previous">previous</a></li>
          <li><a class="btn pager" data-action="next">next</a></li>
        </ul>
      </div>
    </div>
  </body>
</html>