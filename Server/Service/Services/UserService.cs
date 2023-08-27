using AutoMapper;
using Core.DTOs;
using Core.DTOs.UserDTOs;
using Core.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Services;
using System.Collections.Generic;

namespace Server.Service.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public UserService(UserManager<User> userManager, IMapper mapper, IUserRepository userRepository)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<CustomResponseDto<UserDto>> CreateUserAsync(CreateUserDto createUserDto)
        {
            var user = new User { Email = createUserDto.Email, UserName = createUserDto.UserName, Role = createUserDto.Role };

            var result = await _userManager.CreateAsync(user, createUserDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();

                return CustomResponseDto<UserDto>.Fail(400, errors);
            }

            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }

        public async Task<CustomResponseDto<UserDto>> UpdateUserAsync(UpdateUserDto updateUserDto)
        {
            var user = _userManager.Users.SingleOrDefault(x => x.Id == updateUserDto.Id);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found");
            }

            var result = await _userManager.UpdateAsync(_mapper.Map(updateUserDto, user));
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
            }

            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));

        }



        public async Task<CustomResponseDto<UserDto>> ChangePasswordAsync(UserChangePasswordDto userChangePasswordDto)
        {
            var user = _userManager.Users.SingleOrDefault(x => x.Id == userChangePasswordDto.Id);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found");
            }

            var result = await _userManager.ChangePasswordAsync(user, userChangePasswordDto.CurrentPassword, userChangePasswordDto.NewPassword);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
            }
            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }

        public async Task<CustomResponseDto<UserDto>> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found");
            }
            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }

        public async Task<CustomResponseDto<List<UserDto>>> GetAllTrainers()
        {
            var users = await _userManager.Users.Where(x => x.Role == "trainer").ToListAsync();
            if (users == null)
            {
                return CustomResponseDto<List<UserDto>>.Success(200, new List<UserDto>());
            }
            return CustomResponseDto<List<UserDto>>.Success(200, _mapper.Map<List<UserDto>>(users));
        }


    }
}
