using Microsoft.AspNetCore.Identity;
using Server.Core.DTOs;
using Server.Core.Models;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<TrainerUser> _userManager;
        public UserService(UserManager<TrainerUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task<Response<TrainerUserDto>> CreateUserAsync(CreateUserDto createUserDto)
        {
            var user = new TrainerUser { Email = createUserDto.Email, UserName = createUserDto.UserName };

            var result = await _userManager.CreateAsync(user, createUserDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();

                return Response<TrainerUserDto>.Fail(new ErrorDto(errors, true), 400);
            }

            return Response<TrainerUserDto>.Success(ObjectMapper.Mapper.Map<TrainerUserDto>(user), 200);
        }

        public async Task<Response<TrainerUserDto>> GetUserByNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return Response<TrainerUserDto>.Fail("UserName not found", 404, true);
            }

            return Response<TrainerUserDto>.Success(ObjectMapper.Mapper.Map<TrainerUserDto>(user), 200);
        }
    }
}
