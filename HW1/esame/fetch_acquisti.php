<?php
session_start();



$conn = mysqli_connect("localhost","root","","esame") or die(mysqli_error($conn));
$utente=$_SESSION["username"];

$query = "SELECT c.nome,a.id,g.nome as titolo, g.console, g.immagine, g.descrizione FROM (cliente c join acquistato a on c.nome=a.nome) JOIN gioco g ON g.id=a.id where a.nome='$utente' " ;

// Esecuzione
$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

if (mysqli_num_rows($res) > 0) {
    // Se ci sono risultati, li scorro e riempio l'array che ritornerò al frontend
    while($entry = mysqli_fetch_assoc($res)) {
        $acquisti[] = array( "username" => $entry["nome"], 
        "id" => $entry["id"], 
        "titoloG" => $entry["titolo"], 
       "console" => $entry["console"],
       "immagine" => $entry["immagine"],
       "descrizione" => $entry["descrizione"]);
}
    
}
mysqli_close($conn);
echo json_encode($acquisti);
exit;
?>