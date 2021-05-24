<?php
  session_start();
  $utente=$_SESSION["username"];
  $q = $_GET["var1"];
  $id = $_GET["var2"];

  print_r($q);

  $conn = mysqli_connect("127.0.0.1","root","","esame") or die(mysqli_error($conn));
  $query = "UPDATE carrello SET quantita='$q' WHERE nome='$utente' AND id='$id'";

  $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
  
  mysqli_close($conn);
  exit;
        
?>