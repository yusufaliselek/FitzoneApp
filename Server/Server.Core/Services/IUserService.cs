using Server.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IUserService
    {
        Task<Response<TrainerUserDto>> CreateUserAsync(CreateUserDto createUserDto);

        Task<Response<TrainerUserDto>> GetUserByNameAsync(string userName);
    }
}
