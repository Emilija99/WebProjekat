using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekat_Backend.Models
{

    [Table("Lista")]
    public class Lista
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        public virtual List<Stavka> ListaStavki { get; set; }

        [JsonIgnore]
        public Kolekcija KolekcijaRef { get; set; }



    }
}