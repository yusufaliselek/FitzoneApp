using Fitzone.Api.Core.Domain.Models;
using Fitzone.Api.Infrastructure.Persistence.EntityConfigurations;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Fitzone.Api.Infrastructure.Persistence.EntityConfigurations.Entities
{
    public class MemberEntityConfiguration: BaseEntityConfiguration<Member>
    {
        public override void Configure(EntityTypeBuilder<Member> builder)
        {
            base.Configure(builder);
        }
    }
}
