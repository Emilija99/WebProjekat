import {MojaBeleska} from "./MojaBeleska.js"
import {Kolekcija} from "./Kolekcija.js"
import {Lista} from "./Lista.js"
import {Stavka} from "./Stavka.js"
/*const prva=new MojaBeleska("Neki citati","Ovo su neki citati");

const kol=new Kolekcija("kol1");
kol.dodajBelesku(prva);


    const l1=new Lista("Prva");
    l1.DodajStavku("prva stavka");
    l1.DodajStavku("druga stavka");
    l1.DodajStavku("treca stavka");

    kol.dodajListu(l1);
    kol.crtaj(document.body);*/

    //fetch je za poziv servisa
    //fetch ocekuje da mu prosledimo adresu

    fetch("https://localhost:5001/Projekat/PreuzmiKolekcije").then(p=>{

            p.json().then(data =>{
                data.forEach(kol => {
                    //alert(kol.naziv);
                    const kolekcija=new Kolekcija(kol.id,kol.naziv);
                   

                    kol.beleske.forEach((p,indeks) =>{
                        let b1=new MojaBeleska(p.id,p.naziv,p.tekst,p.datumModifikacije);
                        kolekcija.dodajBelesku(b1);

                    });

                    kol.liste.forEach((p,indeks)=>{
                        let l1=new Lista(p.id,p.naziv);
                        kolekcija.dodajListu(l1);

                        p.listaStavki.forEach(s=>{

                            let nova=new Stavka(s.id,s.podatak);
                            
                            l1.DodajStavku(nova);

                            

                        });

                    });
                    kolekcija.crtaj(document.body);
                    
                });

            });
    });