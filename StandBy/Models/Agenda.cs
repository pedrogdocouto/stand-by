using System;
using System.ComponentModel.DataAnnotations;

namespace StandBy.Models
{
    public class Agenda
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [Range(0, double.MaxValue)]
        public double ValorBruto { get; set; }
        
        [Range(0, double.MaxValue)]
        public double ValorLiquido { get; set; }
        
        [Range(0, float.MaxValue)]
        public float Taxa { get; set; }
        
        [Required]
        [DataType(DataType.Date)]
        public DateTime Liquidacao { get; set; }
        
        [Required]
        [MinLength(5)]
        [MaxLength(50)]
        public string Titulo { get; set; }
        
        public int ClienteId { get; set; }

        public Cliente Cliente { get; set; }
    }
}