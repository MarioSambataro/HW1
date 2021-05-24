<?php
 session_start();
 if(isset($_SESSION["username"])){
    header("Location: area_clienti.php");
exit; }

    // Verifica l'esistenza di dati POST
    if (!empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["confirm_password"]))
    {
        $error = array();
        $conn = mysqli_connect("localhost", "root", "", "esame") or die(mysqli_error($conn));
        # USERNAME
        // Controlla che l'username rispetti il pattern specificato
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
            $error[] = "Username non valido";
        } else {
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            // Cerco se l'username esiste già o se appartiene a una delle 3 parole chiave indicate
            $query = "SELECT nome FROM cliente WHERE nome = '$username'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Username già utilizzato";
            }
        }
        # PASSWORD
        if (strlen($_POST["password"]) < 8) {
            $error[] = "Caratteri password insufficienti";
        } 
        # CONFERMA PASSWORD
        if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
            $error[] = "Le password non coincidono";
        }
        
        # REGISTRAZIONE NEL DATABASE
        if (count($error) == 0) {
            $nome = mysqli_real_escape_string($conn, $_POST['username']);
            $cf = mysqli_real_escape_string($conn, $_POST['cf']);
            
            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query = "INSERT INTO cliente ( nome, cf, password) VALUES('$nome', '$cf', '$password')";
            if (mysqli_query($conn, $query)) {
                $_SESSION["username"] = $_POST["username"];
                mysqli_close($conn);
                header("Location: area_clienti.php");
                exit;
            } else {
                $error[] = "Errore di connessione al Database";
            }
        }
        mysqli_close($conn);
    }
    else if (isset($_POST["username"])) {
        $error = array("Riempi tutti i campi");
    }
    print_r($error);
?>
<html>
    <head>
        
        
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <title>Iscriviti</title>
    </head>
    <body>
         <section class = "iscrizione">  
         <h1>Registrati!</h1>      
         <p>Inserisci un username valido, e una passoword</p>
            <form name='iscrizione' method='post' enctype="multipart/form-data" autocomplete="off">
                
                <div class="username">
                    <div><input type='text' name='username' placeholder="username"<?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>></div>
                   <!-- <span>username non disponibile</span> -->
                </div>
                <div class="cf">
                        <div><input type='text' name='cf' placeholder="cf" <?php if(isset($_POST["cf"])){echo "value=".$_POST["cf"];} ?> ></div>
                    </div>
               
                <div class="password">
                    <div><input type='password' name='password' placeholder="password" <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>></div>
                    <!--<span>Inserisci almeno 8 caratteri</span>-->
                </div>
                <div class="conferma_password">
                    <div><input type='password' name='confirm_password' placeholder="conferma password"<?php if(isset($_POST["confirm_password"])){echo "value=".$_POST["confirm_password"];} ?>></div>
                    <!--<span>Le password non coincidono</span>-->
                </div>
               
                <div class="submit">
                    <input type='submit' value="Registrati" id="submit">
                </div>
            </form>
            <div class="account">Hai gia' un account? </br><a href="login_c.php">Accedi</a>
            </section>
    </body>
</html>