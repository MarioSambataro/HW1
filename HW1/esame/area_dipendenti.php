<!DOCTYPE html>
<html>
    <head>
       
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <title>AREA-DIPENDENTI</title>
        <link rel="stylesheet" href="area_dipendenti.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@357&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Cuprum:wght@500&display=swap" rel="stylesheet">
        <script src="area_dipendenti.js" defer></script>
    </head>

    <body>
        <header>
            <nav> 
                <img src="http://pngimg.com/uploads/mario/mario_PNG59.png" />
                <div id="links">
                    <a href="mhw3.html">Home</a>
                    <a id='menu1'>MENU</a>
                    <a href="logout.php">LOGOUT</a>  
                </div>
                <div id="menu">
                    <div></div>
                    <div></div>                    
                    <div></div>
                </div>
            </nav>
            <div id='MENU' class='hidden'>
            <a href="prodotti.php">Gestisci Sconti</a>
            <a href="dipendenti.php">info Dipendenti</a>
            </div>
        </header>
        
        <h1>AREA DIPENDENTI</h1>
        <section>

        <h1>MAGAZZINO</h1>
        <input type="text" id="ricerca"  onkeyup="cerca()" name="ricerca" placeholder="Cerca..."><br/><br/>   

        <table id="magazzino">
        <tr>
        <th>Nome</th>
        <th>Console</th>
        <th>ID</th>
        <th>Codice copia</th>
        </tr>
        </table>
        </section>
        <footer>
            <p>Mario Gabriele Sambataro</p>
            <p>O46002017</p>
        </footer>
    </body>
</html>