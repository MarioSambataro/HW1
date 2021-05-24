const stella="star.svg";
const chiudi='x.svg';
const iconaC='iconaCarrello.svg';
const meno="meno.png";
const iconaRimuoviC='rimuoviCarrello.svg';
const piu='piu.svg';
const listaDescr=[];
const listaBoxPref=[];
const listaCarrello=[];
const listaPref=document.querySelector('#preferiti');
const listaProdPreferiti=document.querySelector('#lista_prodottiPref');


//------------- caricamento dinamico
function onJson1(json){ 

    let negozi=document.querySelector('#lista_prodotti'); 
    for (let i = 0; i < json.length; i++)
    {
        listaDescr[i]=json[i].descrizione;
        const box=document.createElement("div");
        box.id=json[i].id;

        const tit=document.createElement("h1");
        tit.textContent=json[i].nome+" "+json[i].console;

        const pref_b=document.createElement("img");
        pref_b.id='pref_button';
        pref_b.src=stella;
        pref_b.addEventListener('click',aggPref);

        const aggC=document.createElement("img");
        aggC.id='Cbutton';
        aggC.src=iconaC;
        aggC.addEventListener('click',aggCarr);


        const img=document.createElement("img");
        img.id='immagine';
        img.src=json[i].immagine;

        const p=document.createElement("p");
        p.textContent=json[i].costo+"€";

    const dett=document.createElement("h2");
    dett.textContent="clicca qui per maggiori dettagli";
    dett.addEventListener('click',vediDett);
    
    document.getElementById("lista_prodotti").appendChild(box);
    document.getElementById(json[i].id).appendChild(tit);
    document.getElementById(json[i].id).appendChild(pref_b);
    document.getElementById(json[i].id).appendChild(aggC);
    document.getElementById(json[i].id).appendChild(img);
    document.getElementById(json[i].id).appendChild(p);
    document.getElementById(json[i].id).appendChild(dett);    
    }
}

function onResponse1(response){
    return response.json()
}



function onJson2(json){ 
    let acquisti=document.querySelector('#lista_acquisti'); // fai un'unica funzione se ci arrivi
    for (let i = 0; i < json.length; i++)
    {
        
        const box=document.createElement("div");
        box.id="a"+i;

        const tit=document.createElement("h1");
        tit.textContent=json[i].titoloG+" "+json[i].console;

        const img=document.createElement("img");
        img.id='immagine';
        img.src=json[i].immagine;

    
    
    document.querySelector('#lista_acquisti').appendChild(box);
    document.getElementById("a"+i).appendChild(tit);
    document.getElementById("a"+i).appendChild(img);
   
    }
   
}



function creaPreferito2(boxDaCopiare){
  
    const box=document.createElement("div");
        box.id=boxDaCopiare.id;

        const tit=document.createElement("h1");
        tit.textContent=boxDaCopiare.querySelector("h1").textContent;

        const pref_b=document.createElement("img");
        pref_b.id='unpref_button';
        pref_b.src=meno;
        pref_b.addEventListener('click',rimPref);

        const img=document.createElement("img");
        img.id='immagine';
        img.src=boxDaCopiare.querySelector('#immagine').src;

    const dett=document.createElement("h2");
    dett.textContent="clicca qui per maggiori dettagli";
    //dett.addEventListener('click',vediDett);
    
    document.getElementById("lista_prodottiPref").appendChild(box);
    document.getElementById(boxDaCopiare.id).appendChild(tit);
    document.getElementById(boxDaCopiare.id).appendChild(pref_b);
    document.getElementById(boxDaCopiare.id).appendChild(img);
    document.getElementById(boxDaCopiare.id).appendChild(dett);    
    
  return box;
  }

  function creaPreferito(j,json){
  
    const box=document.createElement("div");
        box.id=json[j].id;

        const tit=document.createElement("h1");
        tit.textContent=json[j].titoloG+" "+json[j].console;

        const pref_b=document.createElement("img");
        pref_b.id='unpref_button';
        pref_b.src=meno;
        pref_b.addEventListener('click',rimPref);

        const img=document.createElement("img");
        img.id='immagine';
        img.src=json[j].immagine;

    const dett=document.createElement("h2");
    dett.textContent="clicca qui per maggiori dettagli";
    //dett.addEventListener('click',vediDett);
    
    document.getElementById("lista_prodottiPref").appendChild(box);
    document.getElementById(json[j].id).appendChild(tit);
    document.getElementById(json[j].id).appendChild(pref_b);
    document.getElementById(json[j].id).appendChild(img);
    document.getElementById(json[j].id).appendChild(dett);    
    
  return box;
  }


function onJson3(json){ 
    
    
    for (let i = 0; i < json.length; i++) {  
    const boxCopiato = creaPreferito(i,json);
    
    if(listaBoxPref.length==0)
      listaPref.classList.remove('hidden');
    
    listaBoxPref.push(boxCopiato);
    listaProdPreferiti.appendChild(boxCopiato);

    }

  }
    


fetch("http://localhost/esame/fetch_areaC.php").then(onResponse1).then(onJson1);

fetch("http://localhost/esame/fetch_acquisti.php").then(onResponse1).then(onJson2);


fetch("http://localhost/esame/caricaPref.php").then(onResponse1).then(onJson3);



function aggPref(event){
    
    const button = event.currentTarget;

    for(let i=0;i<listaBoxPref.length;i++)
      if(listaBoxPref[i].id ==button.parentElement.id)
      return;
      
      fetch("http://localhost/esame/aggPref.php?var="+button.parentElement.id);
      
    const boxDaCopiare=button.parentElement;
    const boxCopiato = creaPreferito2(boxDaCopiare);
    boxCopiato.id=boxDaCopiare.id;
  
    if(listaBoxPref.length==0)
      listaPref.classList.remove('hidden');
    
    listaBoxPref.push(boxCopiato);
    listaProdPreferiti.appendChild(boxCopiato);
    
  
  }


function rimuoviBoxPreferito(id){
    for(let i=0;i<listaBoxPref.length;i++)
      if(listaBoxPref[i].id == id){
      listaBoxPref.splice(i,1);
      break;}
}


  function rimPref(event){
    const button= event.currentTarget;  
    fetch("http://localhost/esame/rimPref.php?var="+button.parentElement.id);
    
    const idBoxDaRimuovere = button.parentElement.id;
    
    rimuoviBoxPreferito(idBoxDaRimuovere);
    button.parentElement.remove();
    
    if(listaBoxPref.length==0)
      listaPref.classList.add('hidden');
    

  }

  // mostro al click il menu

  function chiudiCarr(){
    const c=document.getElementById("carrello");
    c.classList.add('hidden');
  }

  function mostraCarr(event){
   const c=document.getElementById("carrello");
   c.classList.remove('hidden');
   if(!document.getElementById('chiudiCarrello')){
   const x=document.createElement("img");
        x.id='chiudiCarrello';
        x.src=chiudi;
        x.addEventListener('click',chiudiCarr);
        c.appendChild(x);
   }
 }



  const carrello=document.getElementById('carr');
  carrello.addEventListener('click',mostraCarr);



//-----------------GESTIONE CARRELLO





function onJson4(json){ 
  let negozi=document.querySelector('#lista_carrello');
  for (let i = 0; i < json.length; i++)
  {
      
      const box=document.createElement("div");
      box.id="c"+json[i].id;

      const testo=document.createElement("div");
      testo.id="b"+json[i].id;

      const quantita=document.createElement("div");
      //quantita.classList(".quantita")
      quantita.id="d"+json[i].id;


      const tit=document.createElement("h1");
      tit.textContent=json[i].titoloG+" "+json[i].console;

      
      const aggC=document.createElement("img");
      aggC.id='Cbutton';
      aggC.src=iconaRimuoviC;
      aggC.addEventListener('click',eliC);

      const aggQ=document.createElement("img");
      aggQ.id='+button';
      aggQ.src=piu;
      aggQ.addEventListener('click',aggQu);

      const rimQ=document.createElement("img");
      rimQ.id='-button';
      rimQ.src=meno;
      rimQ.addEventListener('click',rimQu);

      const img=document.createElement("img");
      img.id='immagine';
      img.src=json[i].immagine;

      const pre=document.createElement("p");
      pre.id="p"+json[i].id;
      pre.textContent="prezzo:"+json[i].prezzo;
      const q=document.createElement("p");
      q.id="q"+json[i].id;
      q.textContent=json[i].quantita;

      listaCarrello.push(box);


  
  document.getElementById("lista_carrello").appendChild(box);
  document.getElementById("c"+json[i].id).appendChild(testo);
  document.getElementById("c"+json[i].id).appendChild(img); 
  document.getElementById("c"+json[i].id).appendChild(quantita);
  document.getElementById("b"+json[i].id).appendChild(tit);
  document.getElementById("b"+json[i].id).appendChild(aggC);
  document.getElementById("d"+json[i].id).appendChild(aggQ);
  document.getElementById("d"+json[i].id).appendChild(q);
  document.getElementById("d"+json[i].id).appendChild(rimQ);
  document.getElementById("b"+json[i].id).appendChild(pre);
  }
}



function eliC(event){
  const button = event.currentTarget;
  let z=button.parentElement.id.charAt(1);

  eliminaCarr(button.parentElement)
  fetch("http://localhost/esame/eliminaCarrello.php?var="+z);
       
        for(let i=0;i<listaCarrello.length;i++)
        if(listaCarrello[i].id == ("c"+z)){
        listaCarrello.splice(i,1);
        break;}
        return;

}


function eliminaCarr(box1){
  let box=box1.parentElement;
  let carr= box.parentElement;
  carr.removeChild(box);
}




function rimQu(event){
  const button = event.currentTarget;
  let z=button.parentElement.id.charAt(1);
  let b="d"+z;
  let d="q"+z;
    
      let box=document.getElementById(b);
      let q= document.getElementById(d);
      let x=q.textContent;
      box.removeChild(q);
      let y=parseInt(x)-1;

      if(y==0){
        eliminaCarr(button.parentElement);
        fetch("http://localhost/esame/eliminaCarrello.php?var="+z);
       
        for(let i=0;i<listaCarrello.length;i++)
        if(listaCarrello[i].id == ("c"+z)){
        listaCarrello.splice(i,1);
        break;}
        return;
      }


      const qa=document.createElement("p");
      qa.id="q"+z;
      qa.textContent=y;
      document.getElementById("d"+z).appendChild(qa);

      fetch("http://localhost/esame/aggiornaCarrello.php?var1="+y+"&var2="+z);
      return;
    }


function aggQu(event){
  const button = event.currentTarget;
  let z=button.parentElement.id.charAt(1);
  let b="d"+z;
    
      let box=document.getElementById(b);
      let q= document.getElementById("q"+z);
      let x=q.textContent;
      box.removeChild(q);
      let y=parseInt(x)+1;
      

      const qa=document.createElement("p");
      qa.id="q"+z;
      qa.textContent=y;
      document.getElementById("d"+z).appendChild(qa);

      fetch("http://localhost/esame/aggiornaCarrello.php?var1="+y+"&var2="+z);
      return;
    }
  






fetch("http://localhost/esame/caricaCarrello.php").then(onResponse1).then(onJson4);


function creaCarr(box){
  const box1=document.createElement("div");
      box1.id="c"+box.id;

      const testo=document.createElement("div");
      testo.id="b"+box.id;

      const quantita=document.createElement("div");
      quantita.id="d"+box.id;



      const tit=document.createElement("h1");
      tit.textContent=box.querySelector("h1").textContent;

      
      const aggC=document.createElement("img");
      aggC.id='Cbutton';
      aggC.src=iconaRimuoviC;
      aggC.addEventListener('click',eliC);

      const aggQ=document.createElement("img");
      aggQ.id='+button';
      aggQ.src=piu;
      aggQ.addEventListener('click',aggQu);

      const rimQ=document.createElement("img");
      rimQ.id='-button';
      rimQ.src=meno;
      rimQ.addEventListener('click',rimQu);


      const img=document.createElement("img");
      img.id='immagine';
      img.src=box.querySelector("#immagine").src;

      const pre=document.createElement("p");
      let pr="p"+box.id;
      pre.id=pr;
      pre.textContent=box.querySelector("p").textContent;
      const q=document.createElement("p");
      q.textContent="1";
      q.id="q"+box.id;

  document.getElementById("lista_carrello").appendChild(box1);
  document.getElementById("c"+box.id).appendChild(testo);
  document.getElementById("b"+box.id).appendChild(tit);
  document.getElementById("c"+box.id).appendChild(img); 
  document.getElementById("c"+box.id).appendChild(quantita);
  document.getElementById("b"+box.id).appendChild(aggC);
  document.getElementById("d"+box.id).appendChild(aggQ);
  document.getElementById("d"+box.id).appendChild(q);
  document.getElementById("d"+box.id).appendChild(rimQ);
  document.getElementById("b"+box.id).appendChild(pre);

  return box1;
}


function aggCarr(event){
  const button = event.currentTarget;

    for(let i=0;i<listaCarrello.length;i++){
      if(listaCarrello[i].id =="c"+button.parentElement.id){
        
      let box=document.getElementById("d"+button.parentElement.id);
      let q= document.getElementById("q"+button.parentElement.id);
      let x=q.textContent;
      box.removeChild(q);
      let y=parseInt(x)+1;
      

      const qa=document.createElement("p");
      qa.id="q"+button.parentElement.id;
      qa.textContent=y;
      document.getElementById("d"+button.parentElement.id).appendChild(qa);

      fetch("http://localhost/esame/aggiornaCarrello.php?var1="+y+"&var2="+button.parentElement.id);
      return;
      }
    }

      
      
     fetch("http://localhost/esame/aggCarrello.php?var="+button.parentElement.id);
      
    const boxDaCopiare=button.parentElement;
    const boxCopiato = creaCarr(boxDaCopiare);
    
    
    listaCarrello.push(boxCopiato);
    

}



//-------------------------MODALE


function vediDett(event){
  const button=event.currentTarget.parentElement;
  let i=parseInt(button.id)-1;

  const box= document.createElement("div");
  box.id="m";

  const testi= document.createElement("div");
  testi.id="t"

  const image =document.createElement("img");
  image.src=button.querySelector('#immagine').src;

  const tit=document.createElement("h1");
  tit.textContent=button.querySelector("h1").textContent;
  
  const de=document.createElement("p");
  de.textContent=listaDescr[i];
  
  document.body.classList.add('no-scroll');
  modalView.style.top = window.pageYOffset + 'px';

  modalView.appendChild(box);
  modalView.appendChild(testi);
  document.getElementById("m").appendChild(image);
  
  document.getElementById("t").appendChild(tit);
  document.getElementById("t").appendChild(de);

  modalView.classList.remove('hidden');
}


function onModalClick() {
  document.body.classList.remove('no-scroll');
  modalView.classList.add('hidden');
  modalView.innerHTML = '';
}

const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);