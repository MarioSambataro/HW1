<?php

$conn = mysqli_connect("localhost","root","","esame") or die(mysqli_error($conn));


$query = "CALL P4()" ;

// Esecuzione
$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

if (mysqli_num_rows($res) > 0) {
    // Se ci sono risultati, li scorro e riempio l'array che ritornerò al frontend
    while($entry = mysqli_fetch_assoc($res)) {
        $ris[] = array( "eta" => $entry["anno"], 
                            "mediaStipendio" => $entry["mediaStipendio"]);
    }
}
mysqli_close($conn);
echo json_encode($ris);
exit;
?>