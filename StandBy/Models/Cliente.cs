using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StandBy.Models
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MinLength(14)]
        [MaxLength(14)]
        public string Cnpj { get; set; }
        
        [Required]
        [MinLength(5)]
        [MaxLength(50)]
        public string RazaoSocial { get; set; }
        
        [Required]
        [DataType(DataType.Date)]
        public DateTime Fundacao { get; set; }
        
        [Required]
        [Range(0, double.MaxValue)]
        public double Capital { get; set; }
        
        [Required]
        [MaxLength(1)]
        public char Classificacao { get; set; }
        
        [Required]
        public bool Quarentena { get; set; }
        
        [Required]
        public bool Status { get; set; }
        
        public List<Agenda> Agendas { get; set; }
    }
}