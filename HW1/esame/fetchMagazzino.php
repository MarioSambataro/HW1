<?php

$conn = mysqli_connect("localhost","root","","esame") or die(mysqli_error($conn));


$query = "SELECT g.id,g.nome,g.console,c.codice FROM gioco g join copia c on c.gioco=g.id" ;

// Esecuzione
$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

if (mysqli_num_rows($res) > 0) {
    // Se ci sono risultati, li scorro e riempio l'array che ritornerò al frontend
    while($entry = mysqli_fetch_assoc($res)) {
        $copie[] = array( "id" => $entry["id"], 
                            "nome" => $entry["nome"], "console" => $entry["console"], "codice" => $entry["codice"]);
    }
}
mysqli_close($conn);
echo json_encode($copie);
exit;
?>