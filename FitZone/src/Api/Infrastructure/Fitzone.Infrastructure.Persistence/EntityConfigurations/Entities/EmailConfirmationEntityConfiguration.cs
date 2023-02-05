using Fitzone.Api.Core.Domain.Models;
using Fitzone.Api.Infrastructure.Persistence.EntityConfigurations;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Fitzone.Api.Infrastructure.Persistence.EntityConfigurations.Entities
{
    public class EmailConfirmationEntityConfiguration : BaseEntityConfiguration<EmailConfirmation>
    {
        public override void Configure(EntityTypeBuilder<EmailConfirmation> builder)
        {
            base.Configure(builder);
        }
    }
}
