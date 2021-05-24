<?php
    session_start();
   
    if (!empty($_POST["idGioco"]) )
    {
        // Se username e password sono stati inviati
        // Connessione al DB
        $conn = mysqli_connect("localhost", "root","","esame") or die(mysqli_error($conn));
        // Preparazione 
        $id = mysqli_real_escape_string($conn, $_POST['idGioco']);
        
    
        $query = "CALL p3($id);";
        // Esecuzione
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;

    }
        // Se l'utente non è stato trovato o la password non ha passato la verifica
        $error = "ID non inserito.";
     
    

?>








<!DOCTYPE html>
<html>
    <head>
       
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <title>AREA-DIPENDENTI</title>
        <link rel="stylesheet" href="prodotti.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@357&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Cuprum:wght@500&display=swap" rel="stylesheet">
        <script src="prodotti.js" defer></script>
    </head>

    <body>
        <header>
            <nav> 
                <img src="http://pngimg.com/uploads/mario/mario_PNG59.png" />
                
                <div id="links">
                    <a href="area_dipendenti.php">INDIETRO</a>
                    <a href="logout.php">LOGOUT</a>  
                </div>
                <div id="menu">
                    <div></div>
                    <div></div>                    
                    <div></div>
                </div>
            </nav>
        </header>

        <section>
        <h1>Prodotti più costosi</h1>
        <div id="prodCost">
        <h2>codici delle copie</h2>
        </div>
        </section>

        <section>
        <h1>SCONTI</h1>
        <?php
                // Verifica la presenza di errori
                if (isset($error)) {
                    echo "<span class='error'>$error</span>";
                }
                
            ?>
        <form name='iscrizione' method='post'>
                    <div class="idGioco">
                    <div><input type='text' name='idGioco' placeholder="idGioco"<?php if(isset($_POST["idGioco"])){echo "value=".$_POST["idGioco"];} ?>></div>
                    </div>
                    <div class="submit">
                    <input type='submit' value="applica Sconto" id="submit">
                    </div>
            </form>
            <p>INSERISCI L’ID DI UN PRODOTTO PER APPLICARE UNO SCONTO DEL 15% SE IL PRODOTTO COSTA DAI 40 AI 70 EURO O DEL 30% SE SUPERIORE AI 70 EURO
</p>
        </section>

        <footer>
            <p>Mario Gabriele Sambataro</p>
            <p>O46002017</p>
        </footer>
    </body>
</html>