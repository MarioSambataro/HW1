<?php    
session_start();

$utente=$_SESSION["username"];

$conn = mysqli_connect("127.0.0.1","root","","esame") or die(mysqli_error($conn));


$query = "SELECT p.costo,c.nome,c.id,c.quantita,g.nome as titolo,g.console,g.immagine,g.descrizione FROM (carrello c join gioco g On c.id=g.id) JOIN prodotto p ON p.id=g.id where c.nome='$utente'" ;

// Esecuzione
$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

if (mysqli_num_rows($res) > 0) {
    // Se ci sono risultati, li scorro e riempio l'array che ritornerò al frontend
    while($entry = mysqli_fetch_assoc($res)) {
        $preferiti1[] = array("username" => $entry["nome"], 
                             "id" => $entry["id"], 
                             "titoloG" => $entry["titolo"], 
                            "console" => $entry["console"],
                            "immagine" => $entry["immagine"],
                            "descrizione" => $entry["descrizione"],
                            "quantita" => $entry["quantita"],
                            "prezzo" => $entry["costo"]);
    }
    if (mysqli_num_rows($res) == 0) {
        echo json_encode("null");
        }
mysqli_close($conn);
echo json_encode($preferiti1);
exit;

}
?>