const stella="star.svg";
const meno="meno.png"
const l= titoli.length;
const listaBoxPref=[];
var nbox=1+listaBoxPref.length;

function createImage(src){
    const image = document.createElement('img');
    image.src= src;
    return image;
  }



function rimuoviBoxPreferito(id2){

    for(let i=0;i<nbox-1;i++)
      if(listaBoxPref[i].id == id2){
      listaBoxPref.splice(i,1);
      break;}
    nbox-=1;
  
  }
  
  function RimuoviPreferiti(event){
   
    const button=event.currentTarget;  
    const idBoxDaRimuovere = button.parentElement.id;
    
    rimuoviBoxPreferito(idBoxDaRimuovere);
    button.parentElement.remove();
    
    if(listaBoxPref.length==0)
      listaPref.classList.add('hidden');
    
    
  }
  
  function creaPreferito(boxDaCopiare){
  
    const box = document.createElement('div');
    
  
    const tit = document.createElement('h1');
    tit.textContent = boxDaCopiare.querySelector('h1').textContent;
  
    const unlike_button = createImage(meno);
    unlike_button.id='unpref_button';
    unlike_button.addEventListener('click',RimuoviPreferiti);
  
    const img = createImage(boxDaCopiare.querySelector('#immagine').src);
    img.id='immagine';
  
  
    box.appendChild(tit);
    box.appendChild(unlike_button);
    box.appendChild(img);
    
    return box;
  
  }
  
  function aggPref(event){
    
    const button = event.currentTarget;
    
    for(let i=0;i<listaBoxPref.length;i++)
      if(listaBoxPref[i].id == button.parentElement.id)
      return;
    
    const boxDaCopiare=button.parentElement;
    const boxCopiato = creaPreferito(boxDaCopiare);
    boxCopiato.id=boxDaCopiare.id;
  
    if(listaBoxPref.length==0)
      listaPref.classList.remove('hidden');
    
    listaBoxPref.push(boxCopiato);
    listaProdPreferiti.appendChild(boxCopiato);
    nbox+=1;

  }


  

function menoDett(event){
    const mdett=event.currentTarget;
    mdett.parentElement.querySelector("h2").classList.remove("hidden");
    mdett.classList.add("hidden");
}

function vediDett(event){
    const pdett= event.currentTarget;
    const descrizione=pdett.parentElement.querySelector("p");
    pdett.classList.add("hidden");
    descrizione.classList.remove("hidden");
    descrizione.addEventListener("click",menoDett);

}


function ricerca(event){
    const barra=event.currentTarget;
    var x;

    for(let i=0;i<l;i++){
        if(listaTitoli[i].textContent.search(barra.value)!==-1){
            x=listaTitoli[i].parentElement;
            x.classList.remove("hidden");
        }

        else{
            x=listaTitoli[i].parentElement;
            x.classList.add("hidden");
        }
    }

}




for(let i=0;i<l;i++){
    const box=document.createElement("div");
    box.id='box'+i;

    const tit=document.createElement("h1");
    tit.textContent=titoli[i]+'-'+piattaforma[i];

    const pref_b=document.createElement("img");
    pref_b.id='pref_button';
    pref_b.src=stella;
    pref_b.addEventListener('click',aggPref);

    const img=document.createElement("img");
    img.id='immagine';
    img.src=immagini[i];

    const dett=document.createElement("h2");
    dett.textContent="clicca qui per maggiori dettagli";
    dett.addEventListener('click',vediDett);
    
    const descr=document.createElement("p");
    descr.textContent=descrizioni[i];
    descr.className="hidden";

    document.getElementById("lista_prodotti").appendChild(box);
    document.getElementById("box"+i).appendChild(tit);
    document.getElementById("box"+i).appendChild(pref_b);
    document.getElementById("box"+i).appendChild(img);
    document.getElementById("box"+i).appendChild(dett);
    document.getElementById("box"+i).appendChild(descr);
};


const listaPref=document.querySelector('#preferiti');
const listaProdPreferiti=document.querySelector('#lista_prodottiPref');
const listaTitoli=document.querySelectorAll("#lista_prodotti div h1");
const barraDiRicerca=document.querySelector('input[type="text"]');
barraDiRicerca.addEventListener("keyup",ricerca);