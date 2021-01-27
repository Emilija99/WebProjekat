using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekat_Backend.Models
{

    [Table("Stavka")]
    public class Stavka
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Podatak")]
        public string Podatak { get; set; }

        
        [JsonIgnore]
        public Lista ListaRef { get; set; }

    }
}