using Microsoft.EntityFrameworkCore;
using StandBy.Models;

namespace StandBy.Data
{
    public class StandBy : DbContext
    {
        public StandBy(DbContextOptions<StandBy> options) : base(options)
        {
        }

        public DbSet<Cliente> Clientes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Cliente>().HasIndex(u => u.Cnpj).IsUnique();
        }
    }
}