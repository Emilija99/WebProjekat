using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Projekat_Backend.Models;

namespace Projekat_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjekatController : ControllerBase
    {
        

        public ProjekatContext Context { get; set; }

       
        public ProjekatController(ProjekatContext context)
        {
            Context=context;

        }

        [Route("PreuzmiKolekcije")]
        [HttpGet]
        public async Task<List<Kolekcija>> PreuzmiKolekcije()
        {
            return await Context.Kolekcije.Include(p=>p.Beleske).Include(p=>p.Liste).ThenInclude(l =>l.ListaStavki).ToListAsync();
        }


        [Route("UpisiKolekciju")]
        [HttpPost]

        public async Task UpisiKolekciju([FromBody] Kolekcija kol)
        {
            Context.Kolekcije.Add(kol);
           await  Context.SaveChangesAsync();

        }

        [Route("IzmeniKolekciju")]
        [HttpPut]

        public async Task IzmeniKolekciju([FromBody] Kolekcija kol)
        {
            //prvi nacin
           //var staraKolekcija=await Context.Kolekcije.FindAsync(kol.ID);
           //staraKolekcija.Naziv=kol.Naziv;

           Context.Update<Kolekcija>(kol);
           await Context.SaveChangesAsync();


        }

        [Route("IzbrisiKolekciju/{id}")]
        [HttpDelete]

        public async Task IzbrisiKolekciju(int id)
        {
           var kol=await Context.Kolekcije.FindAsync(id);
           Context.Remove(kol);
           await Context.SaveChangesAsync();

        }

        [Route("UpisBeleske/{idKolekcije}")]
        [HttpPost]

        public async Task<MojaBeleska> UpisiBelesku(int idKolekcije,[FromBody] MojaBeleska beleska)
        {
            var kol=await Context.Kolekcije.FindAsync(idKolekcije);
            beleska.KolekcijaRef=kol;
            Context.Beleske.Add(beleska);
            await Context.SaveChangesAsync();
            return await Context.Beleske.FindAsync(beleska.ID);

        }

        [Route("UpisListe/{idKolekcije}")]
        [HttpPost]

        public async Task<Lista> UpisiListu(int idKolekcije,[FromBody] Lista lis)
        {
            var kol=await Context.Kolekcije.FindAsync(idKolekcije);
            lis.KolekcijaRef=kol;
            Context.Liste.Add(lis);
            await Context.SaveChangesAsync();
            return await  Context.Liste.FindAsync(lis.ID);
        }

        [Route("UpisStavke/{idListe}")]
        [HttpPost]

        public async Task<Stavka> UpisiStavku(int idListe,[FromBody] Stavka stav)
        {
          /*  var kol=await Context.Kolekcije.FindAsync(idKolekcije);
            Lista lista=null;

           lista=await Context.Liste.Where(l => l.Naziv==nazivListe).Where(l =>l.KolekcijaRef==kol).FirstOrDefaultAsync();
            stav.ListaRef=lista;
            Context.Stavke.Add(stav);
            await Context.SaveChangesAsync();*/

            var lis=await Context.Liste.FindAsync(idListe);
            stav.ListaRef=lis;
            Context.Stavke.Add(stav);
            await Context.SaveChangesAsync();
            return await Context.Stavke.FindAsync(stav.ID);

        }

        [Route("IzmeniBelesku")]
        [HttpPut]

        public async Task IzmeniBelesku([FromBody]MojaBeleska bel)
        {
             Context.Update<MojaBeleska>(bel);
           await Context.SaveChangesAsync();
        }

       [Route("ObrisiBelesku/{idBeleske}")]
       [HttpDelete]

       public async Task ObrisiBelesku(int idBeleske)
       {
           var bel=await Context.Beleske.FindAsync(idBeleske);
           Context.Remove(bel);
           await Context.SaveChangesAsync();
       }

       [Route("ObrisiListu/{idListe}")]
       [HttpDelete]

       public async Task ObrisiListu(int idListe)
       {
            var lis=await Context.Liste.FindAsync(idListe);
           Context.Remove(lis);
           await Context.SaveChangesAsync();
       }

       [Route("ObrisiStavku/{id}")]
       [HttpDelete]

       public async Task ObrisiStavku(int id)
       {
            var stav=await Context.Stavke.FindAsync(id);
           Context.Remove(stav);
           await Context.SaveChangesAsync();
       }


        

    }
}
