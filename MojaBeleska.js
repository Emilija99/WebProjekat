
export class MojaBeleska
{
    constructor(id,naslov,tekst,datum)
    {
        this.id=id;
        this.naslov=naslov;
        this.tekst=tekst;
       // this.datumModifikacije=datumModifikacije;
     //  this.datumModifikacije = new Date().toLocaleString(); 
    // this.datumModifikacije=datum;
    this.datumModifikacije=new Date(datum).toLocaleString();
      /* new Date().toLocaleString();
this.datumModifikacije = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();*/

        
        this.host=null;
    }

    crtaj(host)
    {
        if(host)
        {
            const el=document.createElement("div");
            host.appendChild(el);

            const labNaslov=document.createElement("h3");
            el.appendChild(labNaslov);
            labNaslov.innerHTML=this.naslov;

            const divEl=document.createElement("div");
           // divEl.className="be";

            const labDatum=document.createElement("label");
            divEl.appendChild(labDatum);
            el.appendChild(divEl);
            labDatum.innerHTML="Datum poslednje modifikacije: "+this.datumModifikacije;
            labDatum.className="be";


            const sadrzaj=document.createElement("textarea");
            el.appendChild(sadrzaj);
            sadrzaj.rows=26;
            sadrzaj.cols=60;
            sadrzaj.innerHTML=this.tekst;

            const divD=document.createElement("div");
            divEl.appendChild(divD);

            const dugme=document.createElement("button");
            dugme.innerHTML="Save tekst";
            dugme.className="be";
            divD.appendChild(dugme);

            dugme.onclick=(ev)=>
            {
                this.tekst=sadrzaj.value;
                this.datumModifikacije=new Date().toLocaleString();
                labDatum.innerHTML="Datum poslednje modifikacije: "+this.datumModifikacije;
               // console.log(sadrzaj.value);
               const date=new Date();
               const jsonDate=new Date(date.getTime()-(date.getTimezoneOffset()*60000)).toJSON();


               fetch("https://localhost:5001/Projekat/IzmeniBelesku",{

                    method: "PUT",
                    headers: {
                        "Content-Type" : "application/json"
                    },

                    body: JSON.stringify({

                        id: this.id,
                        naziv: this.naslov,
                        tekst: this.tekst,
                        datumModifikacije: jsonDate
                    })
               }).then(p=>{
                   console.log(p.status);
                  
               });
            }

            
            
        }
    }
}