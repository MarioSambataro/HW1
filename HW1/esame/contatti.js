function onJson(json){ 
    let negozi=document.querySelector('#negozi');
    for (let i = 0; i < json.length; i++)
    {
        
        let citta = document.createElement('h1');
        let indirizzo= document.createElement('p');
        let telefono= document.createElement('p');

        citta.textContent = json[i].citta;
        indirizzo.textContent = json[i].indirizzo;
        telefono.textContent = 0+json[i].telefono;

        const negozio = document.createElement('div');
        negozio.classList.add('negozio');
        negozio.id=i;

        negozi.appendChild(negozio);
        negozio.appendChild(citta);
        negozio.appendChild(indirizzo);
        negozio.appendChild(telefono);

        
    }
}

function onResponse(response){
    return response.json()
}


fetch("http://localhost/esame/fetch_contatti.php").then(onResponse).then(onJson);