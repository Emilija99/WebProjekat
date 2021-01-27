import {Stavka} from "./Stavka.js"
export class Lista
{
    constructor(id,naziv)
    {
        this.id=id;
        this.naslov=naziv;
        this.listaStavki=[];

    }

    DodajStavku(stavka)
    {
        this.listaStavki.push(stavka);
    }

    crtaj(host)
    {
        const el=document.createElement("div");
        host.appendChild(el);
        const labelica=document.createElement("h3");
        labelica.className="naslovListe";
        el.appendChild(labelica);
        labelica.innerHTML=this.naslov;
     

      // this.OsveziListu(el);
        const dodavanje=document.createElement("div");
      
        el.appendChild(dodavanje);
        let unos=document.createElement("label");
        dodavanje.appendChild(unos);
        unos.innerHTML="Dodaj stavku:";
        unos.className="dodavanjeStavka";
        const polje=document.createElement("input");
        dodavanje.appendChild(polje);
        polje.className="dodavanjeStavka";
        let dugme1=document.createElement("button");
        dugme1.innerHTML="Dodaj stavku";
        dugme1.className="dodavanjeStavka";
        dodavanje.appendChild(dugme1);
        dugme1.onclick=(ev)=>{
            let podatak=polje.value;
           // podatak.id=

           fetch("https://localhost:5001/Projekat/UpisStavke/" +this.id,{

            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },

            body: JSON.stringify({

               
                podatak: podatak
                
            })
       }).then(response=>response.json()).then(p=>{
           console.log(p);
          // console.log(p.status);
           let stavka=new Stavka(p.id,p.podatak);
           console.log(p.id);
           console.log(p.podatak);

           this.DodajStavku(stavka);
           this.OsveziListu(el);
        
           this.OsveziCombo(brisanje);
          
       });
           
          



        }
       const brisanje=document.createElement("div");
       el.appendChild(brisanje);

       const labBrisanje=document.createElement("label");
       labBrisanje.className="brisanje";
       brisanje.appendChild(labBrisanje);
       labBrisanje.innerHTML="Obrisi stavku: ";
       this.OsveziCombo(brisanje);

       const btn2=document.createElement("button");
       btn2.innerHTML="Obrisi";
       btn2.className="brisanje";
       brisanje.appendChild(btn2);
       btn2.onclick=(ev)=>{
           const c=brisanje.getElementsByClassName("cmb");
           const indeks=c[0].value;
           const stavka=this.listaStavki[indeks-1];
           this.listaStavki.splice(indeks-1,1);
           this.OsveziListu(el);
           this.OsveziCombo(brisanje);
          
           console.log(stavka.id);

           fetch("https://localhost:5001/Projekat/ObrisiStavku/"+stavka.id,{
               method: "DELETE"
           }).then(p=>{
                console.log(p.status);
               // alert(p.bo)
            })
       }

       this.OsveziListu(el);

     //host.appendChild(el);

    }

    OsveziListu(host)
    {
        const l1=host.getElementsByClassName("lista");
        let lista=l1[0];
        if(!lista)
        {
             lista=document.createElement("ol");
            host.appendChild(lista);
            lista.className="lista"
          

        }
        else
        {
           while(lista.firstChild)
           lista.removeChild(lista.firstChild);

        }
        this.listaStavki.forEach((el)=>{
                let stavka=document.createElement("li");
                lista.appendChild(stavka);
                stavka.innerHTML=el.podatak;
            })
    }

    OsveziCombo(host)
    {
        const h1=host.getElementsByClassName("cmb");
        let combo=h1[0];
        if(!combo)
        {
            combo=document.createElement("select");
            host.appendChild(combo);
            combo.className="cmb"
          

        }
        else
        {
           while(combo.firstChild)
           combo.removeChild(combo.firstChild);

        }

        for(let i=0;i<this.listaStavki.length;i++)
        {
            let opcija=document.createElement("option");
            opcija.value=i+1;
            combo.appendChild(opcija);
            opcija.innerHTML=i+1;
 
 
        }
 

    }

   
}