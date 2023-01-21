using Microsoft.EntityFrameworkCore;

namespace FitzoneWebApi.Data
{
    public class FitzoneDbContext : DbContext
    {
        public FitzoneDbContext(DbContextOptions options) : base(options)
        {

        }
    }
}
