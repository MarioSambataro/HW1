<?php
session_start();

$conn = mysqli_connect("localhost","root","","esame") or die(mysqli_error($conn));
$sede = $_GET["var"];

$query = "CALL p2('$sede');" ;

// Esecuzione
$res = mysqli_query($conn, $query) or die(mysqli_error($conn));
if (mysqli_num_rows($res) > 0) {
    // Se ci sono risultati, li scorro e riempio l'array che ritornerò al frontend
    while($entry = mysqli_fetch_assoc($res)) {
        $impieghi[] = array("cf" => $entry["cf"],"nome" => $entry["nome"],"lavora" => $entry["lavora"],"inizioImpiego" => $entry["inizioimpiego"],"fineImpiego" => $entry["fineimpiego"]);
    }
}
mysqli_close($conn);
echo json_encode($impieghi);
exit;
?>