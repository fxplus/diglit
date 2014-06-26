<?php

class Questions
{
  public function __construct($filename)
  {
    $this->csv = $filename;
    $this->counter = 0;
    $csvpath = "data/$filename";
    if (($handle = fopen($csvpath, "r")) !== FALSE) {
      while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
        $rowsarray[] = $data;
      }
      fclose($handle);
    }
    $this->rows = $rowsarray;
    // $this->questions = $this->getCSVColumn(2);
    $this->questions = $this->parseQuestions();
    $this->categories = $this->parseCategories();
  }

  private function parseQuestions() {
    foreach($this->rows as $row) {
      $list[] = array('q' => $row[2], 'cat' => $row[1]);
    }
    return $list;
  }
  private function parseCategories() {
    foreach($this->questions as $question) {
      $cat = trim($question['cat']);
      $categories[$cat] = $cat;
    }
    return $categories;
  }

  private function getCSVColumn($col_n = 2) {
    foreach($this->rows as $row) {
      $column[] = $row[$col_n];
    }
    return $column;
  }

  public function nextQuestion() {
    $nextqtext = $this->questions[$counter];
    $this->counter ++;
    return $nextqtext;
  }

  public function getQuestions() {
    return $this->questions;
  }

  public function getCategories() {
    return $this->categories;
  }

  public function count() {
    return count($this->rows);
  }

  public function shuffleQuestions() {
    shuffle($this->questions);
    return $this->questions;
  }

  // remove word formatting characters
  private function strip_format($string) {
    return preg_replace('/[^(\x20-\x7F)\x0A]*/','', $string);
  }


}
