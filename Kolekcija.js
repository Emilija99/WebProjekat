import {MojaBeleska} from "./MojaBeleska.js"
import {Lista} from "./Lista.js"
import {Stavka} from "./Stavka.js"

export class Kolekcija
{
    constructor(id,ime)
    {
        this.id=id;
        this.ime=ime;
        this.nizBeleski=[];
        this.nizListi=[];


    }

    dodajListu(lista)
    {
        this.nizListi.push(lista);
    }

    dodajBelesku(beleska)
    {
        this.nizBeleski.push(beleska);
    }

    

    crtaj(host)
    {
        const kontejner=document.createElement("div");
        host.appendChild(kontejner);
        kontejner.className="Kolekcija";

        const divForma=document.createElement("div");
        const divEdit=document.createElement("div");
        divEdit.className="editovanje";
        divForma.className="forma";
        kontejner.appendChild(divForma);
        kontejner.appendChild(divEdit);
        this.crtajFormu(divForma);
        this.crtajProzorZaEditovanje(divEdit);

    }

    crtajFormu(host)
    {
        host.className="forma";
        const divBeleske=document.createElement("div");
        host.appendChild(divBeleske);
    
       const  divListe=document.createElement("div");
       host.appendChild(divListe);

       let labNaslov=document.createElement("label");
       divBeleske.appendChild(labNaslov);
       labNaslov.innerHTML="VASE BELESKE";

       labNaslov=document.createElement("label");
       divListe.appendChild(labNaslov);
       labNaslov.innerHTML="VASE LISTE";

   

       this.osveziNiz(divBeleske,"prikazBeleski");
       this.osveziNiz(divListe,"prikazListi");


    }

    osveziNiz(host,nazivVrste)
    {
        const b=host.getElementsByClassName(nazivVrste);
        let divBl=b[0];
        if(!divBl)
        {
             divBl=document.createElement("div");
             //divBl.style.backgroundColor="transparent";
            host.appendChild(divBl);
            divBl.className=nazivVrste;
        }
        else
        {
            while(divBl.firstChild)
             divBl.removeChild(divBl.firstChild);
        }

        let niz;
        if(nazivVrste=="prikazBeleski")
           niz=this.nizBeleski;
        else niz=this.nizListi;

          niz.forEach((el,indeks)=>{
            const d=document.createElement("div");
            divBl.appendChild(d);
            d.className="elKont";
            let id;
            if(nazivVrste=="prikazBeleski")
               id=indeks+1;
            else id=-(indeks+1);
            d.value=id;
            
         

            const divEl=document.createElement("div");
            divEl.className="elB";
            const naslov=document.createElement("label");
            d.appendChild(naslov);
            naslov.innerHTML=el.naslov;
            d.appendChild(divEl);
           // divEl.innerHTML=el.naslov;
            const slikaI=document.createElement("img");
            slikaI.src="beleska.png";
            divEl.appendChild(slikaI);
            slikaI.className="slikaB";

            const kanta=document.createElement("div");
            d.appendChild(kanta);
            kanta.className="kanta";
           // dugme.innerHTML="Edit";
            //dugme.value=indeks;
            const slika=document.createElement("img");
            kanta.appendChild(slika);
            slika.src="kanta5.png";
            slika.className="slikaK";

            d.onmouseover=(ev)=>{
               // divEl.style.border="2px solid purple";
               d.style.opacity="0.6";
               d.style.border="3px solid black";
            }

            d.onmouseleave=(ev)=>
            {
                //divEl.style.border="1px solid grey"
                d.style.opacity="1";
                d.style.border="2px solid white";
            }

            divEl.onclick=(ev)=>
            {
               /* const polje=document.querySelector(".polje");
                while(polje.firstChild)
                polje.removeChild(polje.firstChild);
                el.crtaj(polje);*/

                this.nacrtajPolje(el,d.value);

            }

            slika.onclick=(ev)=>{
                let zaBrisanje=niz[indeks];
                niz.splice(indeks,1);
                divBl.removeChild(d);
                const p=document.querySelector(".polje");
                console.log(d.value);
                console.log(p.value);

                if(nazivVrste=="prikazBeleski")
                {

                fetch("https://localhost:5001/Projekat/ObrisiBelesku/"+zaBrisanje.id,{
                    method: "DELETE"
                }).then(p=>{
                     console.log(p.status);
                    // alert(p.bo)
                 })
                }

                else
                {
                    fetch("https://localhost:5001/Projekat/ObrisiListu/"+zaBrisanje.id,{
                        method: "DELETE"
                    }).then(p=>{
                         console.log(p.status);
                        // alert(p.bo)
                     })
                }



                if(p.value==d.value)
                {

                    while(p.firstChild)
                    p.removeChild(p.firstChild);
                    
                }

            }

        })

    }

    nacrtajPolje(element,ind)
    {
        const polje=document.querySelector(".polje");
        
        while(polje.firstChild)
                polje.removeChild(polje.firstChild);
         element.crtaj(polje);
         polje.value=ind;
    }
   

    crtajProzorZaEditovanje(host)
    {

        const polje=document.createElement("div");
        host.appendChild(polje);
        polje.className="polje";

        const dugmici=document.createElement("div");
        host.appendChild(dugmici);
        dugmici.className="glDugmici"

        const dugme1=document.createElement("button");
        dugmici.appendChild(dugme1);
        dugme1.innerHTML="Kreiraj novu belesku";
        dugme1.className="dugmeE";

        const dugme2=document.createElement("button");
        dugmici.appendChild(dugme2);
        dugme2.innerHTML="Kreiraj novu listu";
        dugme2.className="dugmeE";

       

        dugme1.onclick=(ev)=>{

            let naziv='';

            while(naziv==='')
            {
                 naziv=prompt("Unesite naziv beleske");
                 if(naziv==='')
                    alert("Morate uneti naziv!");
            }

            
            if (naziv===null)
               return;
           else{
               const vreme=new Date().toLocaleString();
               
           /* const novaBeleska=new MojaBeleska(naziv,"",vreme);
            this.dodajBelesku(novaBeleska);
            
            this.osveziNiz(document.querySelector(".prikazBeleski").parentNode,"prikazBeleski");

           
            this.nacrtajPolje(novaBeleska,this.nizBeleski.length);*/

           // alert(this.id);
            const date=new Date();
            const jsonDate=new Date(date.getTime()-(date.getTimezoneOffset() * 60000)).toJSON();

            fetch("https://localhost:5001/Projekat/UpisBeleske/"+this.id,{

                   method: "POST",
                   headers: {
                       "Content-Type" : "application/json"

                   },

                   body: JSON.stringify({
                       naziv: naziv,
                       tekst: "",
                       datumModifikacije: jsonDate



                   })


            }).then(response=>response.json()).then(p=>{
                //novaBeleska.id=p.id;
                const novaBeleska=new MojaBeleska(p.id,naziv,"",vreme);
                this.dodajBelesku(novaBeleska);
                
                this.osveziNiz(document.querySelector(".prikazBeleski").parentNode,"prikazBeleski");
    
               
                this.nacrtajPolje(novaBeleska,this.nizBeleski.length);
            });
                
            


        }


        }

        dugme2.onclick=(ev)=>
        {
            let naziv='';

            while(naziv==='')
            {
                 naziv=prompt("Unesite naziv liste");
                 if(naziv==='')
                    alert("Morate uneti naziv!");
            }

            if(naziv!=null)
            {
               
           

            fetch("https://localhost:5001/Projekat/UpisListe/"+this.id,{

                   method: "POST",
                   headers: {
                       "Content-Type" : "application/json"

                   },

                   body: JSON.stringify({
                       naziv: naziv,
                       



                   })


            }).then(data=>data.json()).then(p=>{

                const NovaLista=new Lista(p.id,naziv);
                this.dodajListu(NovaLista);
    
                this.osveziNiz(document.querySelector(".prikazListi").parentNode,"prikazListi");
    
              
    
                this.nacrtajPolje(NovaLista,-(this.nizListi.length));


            });
            }


        }




    }
}