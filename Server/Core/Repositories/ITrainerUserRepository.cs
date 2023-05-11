using Server.Core.Models;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
<<<<<<< HEAD
    public interface ITrainerUserRepository : IGenericRepository<TrainerUser>
    {
        Task<TrainerUser> GetTrainerUserWithDetailsAsync(string trainerUserId);

    }
=======
       public interface ITrainerUserRepository : IGenericRepository<TrainerUser>
       {
            Task<TrainerUser> GetTrainerWithDetailsAsync(string trainerUserId);


       }

>>>>>>> 30a289e61f5cef803b73e7a62669c2360f635691
}
