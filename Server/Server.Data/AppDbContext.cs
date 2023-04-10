using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection.Emit;
using System.Reflection;

namespace Server.Data
{
    public class AppDbContext : IdentityDbContext<TrainerUser, IdentityRole, string>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }
        public DbSet<TrainerUser> TrainerUsers { get; set; }
        public DbSet<TrainerCanEdit> TrainerCanEdits { get; set; }
        public DbSet<TrainerLicence> TrainerLicences { get; set; }
        public DbSet<TrainerClub> TrainerClubs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(GetType().Assembly);


            base.OnModelCreating(builder);
        }
    }
}
