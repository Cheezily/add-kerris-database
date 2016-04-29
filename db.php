<?php

//echo "User name supplied: ".$_POST['userName']."<br>";
//echo "Password supplied: ".$_POST['PW']."<br>";


/*******************************************************************************
DB has 5 columns: id (INT), short_name (TEXT), long_name (TEXT), semester (TEXT),
syllabus (TEXT)*****************************************************************
*******************************************************************************/

if (isset($_GET['q']) && $_GET['q'] == "showAll") {
  db_query('SELECT * FROM courses');
}

$user = parse_ini_file('config/user.ini');

if (isset($_POST['userName']) && isset($_POST['PW']) &&
  $_POST['userName'] == $user['name'] &&
  $_POST['PW'] == $user['password']) {
    //$conn = db_connect();
    action_router($_POST);
  } else if (isset($_POST['userName']) && isset($_POST['PW']) &&
    $_POST['userName'] != $user['name'] &&
    $_POST['PW'] != $user['password']) {
    echo "Invalid Username or Password";
  }


function action_router($Action) {
  //echo "Action sent was ".$Action['Action'];
  $sql = '';
  $skipQuery = false;

  if ($Action['Action'] == 'Login') {
    echo 'Logged In';
    $skipQuery = true;
  }

  if ($Action['Action'] == 'Remove') {
    $sql = 'DELETE FROM courses WHERE id = '.$Action['id'].';';
  }

  if ($Action['Action'] == 'Insert') {
    $sql = 'INSERT INTO courses (short_name, long_name, semester, syllabus_link)'
      .' VALUES ("'.$Action['short'].'", "'.$Action['long'].'", "'
      .$Action['semester'].'", "'.$Action['syllabus'].'");';
  }

  //echo "SQL: ".$sql;

  if ($sql) {
    $connection = db_connect();
    mysqli_query($connection, $sql);
  }
  if ($skipQuery === false) {
    db_query('SELECT * FROM courses');
  }


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

  if (count($result) == 0) {
    echo "NO RECORDS";
  } else {
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

}

?>
