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

<<<<<<< HEAD
        public async Task<TrainerUser> GetTrainerUserWithDetailsAsync(string trainerUserId)
        {
            return await _context.TrainerUsers.Include(x => x.TrainerClubs).Include(x => x.TrainerLicences).Include(x => x.TrainerCanEdit).Where(x => x.Id == trainerUserId).FirstOrDefaultAsync();
=======
        public async Task<TrainerUser> GetTrainerWithDetailsAsync(string trainerUserId)
        {
            return await _context.TrainerUsers.Include(x => x.TrainerCanEdit).Include(x => x.TrainerClubs).Include(x => x.TrainerLicences).Where(x => x.Id == trainerUserId).SingleOrDefaultAsync();
>>>>>>> 30a289e61f5cef803b73e7a62669c2360f635691
        }
    }
}
