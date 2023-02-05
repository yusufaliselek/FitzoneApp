using Fitzone.Api.Core.Domain.Models;
using Fitzone.Api.Infrastructure.Persistence.EntityConfigurations;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Fitzone.Api.Infrastructure.Persistence.EntityConfigurations.Entities
{
    public class CoachEntityConfiguration : BaseEntityConfiguration<Coach>
    {
        public override void Configure(EntityTypeBuilder<Coach> builder)
        {
            base.Configure(builder);
        }
    }
}
