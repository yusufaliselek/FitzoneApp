using Server.Core.Models;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface ITrainerUserRepository : IGenericRepository<TrainerUser>
    {
        Task<TrainerUser> GetTrainerUserWithDetailsAsync(string trainerUserId);

    }
}
