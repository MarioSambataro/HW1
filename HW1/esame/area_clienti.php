
<?php
   session_start();
   if(!isset($_SESSION["username"])){
    header("Location: login_c.php");
    exit;
}
?>
<html>
    <head>
       
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <title>AREA-CLIENTI</title>
        <link rel="stylesheet" href="area_clienti.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@357&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Cuprum:wght@500&display=swap" rel="stylesheet">
        <script src="area_clienti.js" defer></script>
       
        
    </head>

    <body>
        <header>
            <nav> 
                <img src="http://pngimg.com/uploads/mario/mario_PNG59.png" />
                <div id='barradiricerca'>cerca<input type="text"> </div>
                <div id="links">
                    <a href="mhw3.html">Home</a>
                    <a href="logout.php">LOGOUT</a>  
                    <a href="contatti.html">Contatti</a>
                    <a id='carr' class="button">Carrello</a>
                </div>
                <div id="menu">
                    <div></div>
                    <div></div>                    
                    <div></div>
                </div>
            </nav>
            <h1>
                <strong>BENVENUTO</strong></br>
            </h1>
            <div id='carrello' class='hidden'>
                <h1>CARRELLO</h1>
                <div id='lista_carrello'>
                </div>
            </div>
        </header>
        

        <section id='listaP'>
            <div id='preferiti' class='hidden'>
                <h1>Preferiti</h1>
                <div id='lista_prodottiPref'>
                    
                </div>
            </div>
        </section>
        <section>
            <h1>PRODOTTI</h1>
            <div id='lista_prodotti'>
                
            </div>
        </section>
        <section id="modal-view" class="hidden">
            
        </section>

        <section id='acquisti'>
            <h1>I tuoi acquisti</h1>
            <div id='lista_acquisti'>

            </div>
        </section>
           
        <footer>
            <p>Mario Gabriele Sambataro</p>
            <p>O46002017</p>
        </footer>
    </body>
    
</html>