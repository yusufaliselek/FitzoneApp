using FitzoneWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FitzoneWebApi.Data
{
    public class FitzoneDbContext : DbContext
    {
        public FitzoneDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Coach> Coaches{ get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Training> Trainings { get; set; }

    }
}
