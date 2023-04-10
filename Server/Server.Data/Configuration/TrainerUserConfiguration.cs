using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Core.Models;

namespace Server.Data.Configuration
{
    internal class TrainerUserConfiguration : IEntityTypeConfiguration<TrainerUser>
    {
        public void Configure(EntityTypeBuilder<TrainerUser> builder)
        {
        }
    }
}
