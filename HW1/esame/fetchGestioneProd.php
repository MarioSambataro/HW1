<?php

$conn = mysqli_connect("localhost","root","","esame") or die(mysqli_error($conn));


$query = "CALL p1();" ;

// Esecuzione
$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

if (mysqli_num_rows($res) > 0) {
    // Se ci sono risultati, li scorro e riempio l'array che ritornerò al frontend
    while($entry = mysqli_fetch_assoc($res)) {
        $copie[] = array( "codiceCopia" => $entry["ncopia"]);
    }
}
mysqli_close($conn);
echo json_encode($copie);
exit;
?>