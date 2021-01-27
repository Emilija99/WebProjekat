using Microsoft.EntityFrameworkCore;

namespace Projekat_Backend.Models
{

  
    public class ProjekatContext :DbContext
    {
          public DbSet<Kolekcija> Kolekcije{get; set;}
          public DbSet<Lista> Liste{get;set;}
          public DbSet<MojaBeleska> Beleske{get;set;}

          public DbSet<Stavka> Stavke{get;set;}

          public ProjekatContext(DbContextOptions options):base(options)
          {

          }

    }
}