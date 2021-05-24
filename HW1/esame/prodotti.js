function onJson(json){ 

    const lista=document.getElementById('prodCost');
    for (let i = 0; i < json.length; i++){
        const c=document.createElement("p");
        c.textContent=json[i].codiceCopia;
        
        lista.appendChild(c);
    }
   
    }

function onResponse(response){
    return response.json()
}

fetch("http://localhost/esame/fetchGestioneProd.php").then(onResponse).then(onJson);