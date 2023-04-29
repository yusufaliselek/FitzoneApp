using AutoMapper;
using AutoMapper.Internal.Mappers;
using Core.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly IMapper _mapper;
        public UserService(UserManager<TrainerUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }
        public async Task<CustomResponseDto<TrainerUserDto>> CreateUserAsync(CreateUserDto createUserDto)
        {
            var user = new TrainerUser { Email = createUserDto.Email, UserName = createUserDto.UserName };

            var result = await _userManager.CreateAsync(user, createUserDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();

                return CustomResponseDto<TrainerUserDto>.Fail(400, errors);
            }

            return CustomResponseDto<TrainerUserDto>.Success(200, _mapper.Map<TrainerUserDto>(user));
        }

        public async Task<CustomResponseDto<TrainerUserDto>> GetUserByNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return CustomResponseDto<TrainerUserDto>.Fail(404, "UserName not found");
            }

            return CustomResponseDto<TrainerUserDto>.Success(200, _mapper.Map<TrainerUserDto>(user));
        }

        public async Task<CustomResponseDto<List<TrainerUserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var usersDto = _mapper.Map<List<TrainerUserDto>>(users);
            return CustomResponseDto<List<TrainerUserDto>>.Success(200, usersDto);
        }

    }
}
