using Fitzone.Api.Core.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Fitzone.Api.Infrastructure.Persistence.Context
{
    public class FitzoneDbContext : DbContext
    {
        public const string DEFAULT_SCEMA = "dbo";

        public FitzoneDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Coach> Coaches { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Training> Trainings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly()); 
        }

        public override int SaveChanges()
        {
            OnBeforeSave();
            return base.SaveChanges();
        }
        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSave();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            OnBeforeSave();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            OnBeforeSave();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void OnBeforeSave()
        {
            var addedEntities = ChangeTracker.Entries()
                .Where(o => o.State == EntityState.Added)
                .Select(i => (BaseEntity)i.Entity);

            PrepareAddedEntities(addedEntities);
        }

        private void PrepareAddedEntities(IEnumerable<BaseEntity> entities)
        {
            foreach (var entity in entities)
            {
                if(entity.CreateTime == DateTime.MinValue)
                entity.CreateTime = DateTime.Now;
            }
        }

    }
}
