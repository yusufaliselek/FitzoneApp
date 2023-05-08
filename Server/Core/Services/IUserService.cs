using Core.DTOs;
using Core.DTOs.TrainerUserDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IUserService
    {
        Task<CustomResponseDto<TrainerUserDto>> CreateUserAsync(CreateUserDto createUserDto);

        Task<CustomResponseDto<TrainerUserWithDetailsDto>> GetUserByNameAsync(string userName);

        Task<CustomResponseDto<List<TrainerUserDto>>> GetAllUsers();

        Task<CustomResponseDto<TrainerUserWithDetailsDto>> UpdateUser(TrainerUserWithDetailsDto user);

    }
}
