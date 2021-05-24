<?php
 

    if (!empty($_POST["username"]) && !empty($_POST["password"]) )
    {
        // Se username e password sono stati inviati
        // Connessione al DB
        $conn = mysqli_connect("localhost", "root","","esame") or die(mysqli_error($conn));
        // Preparazione 
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);
     
        // Permette l'accesso tramite email o username in modo intercambiabile
        //$searchField = filter_var($username, FILTER_VALIDATE_EMAIL) ? "email" : "username";
        // ID e Username per sessione, password per controllo
        $query = "SELECT cf, password FROM impiegato WHERE cf = '$username' and password='$password'";
        // Esecuzione
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;

        if (mysqli_num_rows($res) > 0) {
            //if (password_verify($_POST['password'], $entry['password'])) {
            // Ritorna una sola riga, il che ci basta perché l'utente autenticato è solo uno
                $_SESSION["username"] = $entry['username'];
                header("Location: area_dipendenti.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            //}
        }
        
        // Se l'utente non è stato trovato o la password non ha passato la verifica
        $error = "Username e/o password errati.";
        }
    else if (isset($_POST["username"]) || isset($_POST["password"])) {
        // Se solo uno dei due è impostato
        $error = "Inserisci username e password.";
    }

?>


<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@357&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="login.css"/>
        <title>AREA DIPENDENTI- Accedi</title>
    </head>
    <body>
        <main class="login">
        <section class="main_left">
        </section>
        <section class="main_right">
            <h1>ACCESSO DIPENDENTI</h1>
            <?php
                // Verifica la presenza di errori
                if (isset($error)) {
                    echo "<span class='error'>$error</span>";
                }
                
            ?>
            <form name='login' method='post'>
                <!-- Seleziono il valore di ogni campo sulla base dei valori inviati al server via POST -->
                <div class="username">
                    <div><input type='text' name='username' placeholder="Username" <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>></div>
                </div>
                <div class="password">
                    <div><input type='password' name='password' placeholder="Password" <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>></div>
                </div>
                <div id='button'>
                    <input type='submit' value="Accedi">
                </div>
            </form>
        </section>
        </main>
    </body>
</html>