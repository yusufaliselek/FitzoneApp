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

        public async Task<TrainerUser> GetTrainerUserWithDetailsAsync(string trainerUserId)
        {
            return await _context.TrainerUsers.Include(x => x.TrainerClubs).Include(x => x.TrainerLicences).Include(x => x.TrainerCanEdit).Where(x => x.Id == trainerUserId).FirstOrDefaultAsync();
        }
    }
}
