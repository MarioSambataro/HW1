
const form=document.getElementById("form");
form.addEventListener("submit",cercaSede);




function onJson(json){ 
    const tab=document.getElementById('impiegati');
    tab.innerHTML="";
    const r1=document.createElement("tr");
    r1.id="r";
    const cf1=document.createElement("th");
    cf1.textContent="cf";
    const nome1=document.createElement("th");
    nome1.textContent="nome";
    const lavora1=document.createElement("th");
    lavora1.textContent="lavora";
    const inImp1=document.createElement("th");
    inImp1.textContent="inizioImpiego";
    const finImp1=document.createElement("th");
    finImp1.textContent="fineImpiego";

    tab.appendChild(r1);
        document.getElementById("r").appendChild(cf1);
        document.getElementById("r").appendChild(nome1);
        document.getElementById("r").appendChild(lavora1);
        document.getElementById("r").appendChild(inImp1);
        document.getElementById("r").appendChild(finImp1);
    for (let i = 0; i < json.length; i++){
        const r=document.createElement("tr");
        r.id="m"+i;
        const cf=document.createElement("th");
        cf.textContent=json[i].cf;
        const nome=document.createElement("th");
        nome.textContent=json[i].nome;
        const lavora=document.createElement("th");
        lavora.textContent=json[i].lavora;
        const inImp=document.createElement("th");
        inImp.textContent=json[i].inizioImpiego;
        const finImp=document.createElement("th");
        finImp.textContent=json[i].fineImpiego;

        tab.appendChild(r);
        document.getElementById("m"+i).appendChild(cf);
        document.getElementById("m"+i).appendChild(nome);
        document.getElementById("m"+i).appendChild(lavora);
        document.getElementById("m"+i).appendChild(inImp);
        document.getElementById("m"+i).appendChild(finImp);
    }
   
   
    }

function onResponse(response){
    return response.json()
}


function cercaSede(event){
    event.preventDefault();
    const formData=new FormData(document.querySelector("#form"));
    fetch("http://localhost/esame/fetchGestioneDip.php?var="+formData.get("sede")).then(onResponse).then(onJson);
}



function onJson1(json){ 

    const tab=document.getElementById('media');
    for (let i = 0; i < json.length; i++){
        const r=document.createElement("tr");
        r.id="m"+i;
        const eta=document.createElement("th");
        eta.textContent=json[i].eta;
        const stip=document.createElement("th");
        stip.textContent=json[i].mediaStipendio;

        tab.appendChild(r);
        document.getElementById("m"+i).appendChild(eta);
        document.getElementById("m"+i).appendChild(stip);
    }
   
    }

function onResponse1(response){
    return response.json()
    }


fetch("http://localhost/esame/stipMedio.php").then(onResponse1).then(onJson1);