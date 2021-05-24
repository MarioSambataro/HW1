<?php

$conn = mysqli_connect("localhost","root","","esame") or die(mysqli_error($conn));

// Permette l'accesso tramite email o username in modo intercambiabile
// $searchField = filter_var($username, FILTER_VALIDATE_EMAIL) ? "email" : "username";
// ID e Username per sessione, password per controllo
$query = "SELECT s.citta, n.telefono, n.indirizzo FROM negozi n join sede s on n.id_negozio=s.codice" ;

// Esecuzione
$res = mysqli_query($conn, $query) or die(mysqli_error($conn));
//$lezione = array();
if (mysqli_num_rows($res) > 0) {
    // Se ci sono risultati, li scorro e riempio l'array che ritornerò al frontend
    while($entry = mysqli_fetch_assoc($res)) {
        $lezione[] = array( "citta" => $entry["citta"], 
                            "telefono" => $entry["telefono"], "indirizzo" => $entry["indirizzo"]);
    }
}
mysqli_close($conn);
echo json_encode($lezione);
exit;
?>