using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Text.Json.Serialization;

namespace Projekat_Backend.Models
{
 [Table("MojaBeleska")]
public class MojaBeleska
{
    [Key]
    public int ID { get; set; }

    [MaxLength(255)]
    
    public string Naziv { get; set; }

    public string Tekst { get; set; }

    
    public DateTime DatumModifikacije { get; set; }

    [JsonIgnore]
    public Kolekcija KolekcijaRef { get; set; }

}
}