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
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }

    }
}
