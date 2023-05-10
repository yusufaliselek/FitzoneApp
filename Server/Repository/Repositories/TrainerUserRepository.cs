using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Data;
using Server.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class TrainerUserRepository : GenericRepository<TrainerUser>, ITrainerUserRepository
    {
        public TrainerUserRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<TrainerUser> GetTrainerWithDetailsAsync(string trainerUserId)
        {
            return await _context.TrainerUsers.Include(x => x.TrainerCanEdit).Include(x => x.TrainerClubs).Include(x => x.TrainerLicences).Where(x => x.Id == trainerUserId).SingleOrDefaultAsync();
        }
    }
}
