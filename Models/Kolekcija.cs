using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projekat_Backend.Models
{

    [Table("Kolekcija")]
    public class Kolekcija
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naslov")]
        [MaxLength(255)]

        public string Naziv { get; set; }


        public virtual List<Lista> Liste { get; set; }

        public virtual List<MojaBeleska> Beleske { get; set; }


    }
}