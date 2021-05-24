<?php
  session_start();
  $utente=$_SESSION["username"];
  $id = $_GET["var"];

  $conn = mysqli_connect("127.0.0.1","root","","esame") or die(mysqli_error($conn));
  $query = "DELETE from preferiti where nome='$utente' AND id='$id' limit 1";

  $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
  
  mysqli_close($conn);
  exit;
        
?>