<?php

//echo "User name supplied: ".$_POST['userName']."<br>";
//echo "Password supplied: ".$_POST['PW']."<br>";


/*******************************************************************************
DB has 4 columns: id (INT), short_name (TEXT), long_name (TEXT), semester (TEXT)
*******************************************************************************/

if ($_GET['q'] == "showAll") {
  db_query('SELECT * FROM courses');
}

$user = parse_ini_file('config/user.ini');

if (isset($_POST['userName']) && isset($_POST['PW']) &&
  $_POST['userName'] == $user['name'] &&
  $_POST['PW'] == $user['password']) {
    echo "CORRECT!!!";
    $conn = db_connect();
  } else if (isset($_POST['userName']) && isset($_POST['PW']) &&
    $_POST['userName'] != $user['name'] &&
    $_POST['PW'] != $user['password']) {
    echo "Invalid";
  }

function db_connect() {
  $config = parse_ini_file('config/config.ini');
  static $connection;
  if (!isset($connection)) {
    @$connection = mysqli_connect('localhost', $config['username'], $config['password'], $config['dbname']);
  }
  if (!$connection) {
    echo "Something went wrong";
  }
  return $connection;
}


function db_query($query) {

  $rows = db_select($query);

  if (!$rows) {
    $error = db_error();
  } else {
    echo json_encode($rows);
  }
}



function db_error() {
  $connection = db_connect();
  return mysqli_error($connection);
}


function db_select($query) {

  $connection = db_connect();
  $result = mysqli_query($connection, $query);

  //insert commands will return true
  if ($result === false) {
    return db_error();
  } else {
    $rows = array();
    while($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row;
    }
    return $rows;
  }
}

?>
