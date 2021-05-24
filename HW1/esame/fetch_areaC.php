<?php

$conn = mysqli_connect("localhost","root","","esame") or die(mysqli_error($conn));


$query = "SELECT g.id,g.nome,g.console,g.immagine,p.costo,g.descrizione FROM gioco g join prodotto p on p.id=g.id" ;

// Esecuzione
$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

if (mysqli_num_rows($res) > 0) {
    // Se ci sono risultati, li scorro e riempio l'array che ritornerò al frontend
    while($entry = mysqli_fetch_assoc($res)) {
        $giochi[] = array( "id" => $entry["id"], 
                            "nome" => $entry["nome"], "console" => $entry["console"], "immagine" => $entry["immagine"],"costo" => $entry["costo"],"descrizione" => $entry["descrizione"]);
    }
}
mysqli_close($conn);
echo json_encode($giochi);
exit;
?>