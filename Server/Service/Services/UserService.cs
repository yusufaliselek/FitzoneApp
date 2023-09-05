using AutoMapper;
using Core.DTOs;
using Core.DTOs.UserDTOs;
using Core.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Services;

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
            var userWithSameEmail = await _userManager.FindByEmailAsync(createUserDto.Email);
            var userWithSameUserName = await _userManager.FindByNameAsync(createUserDto.UserName);
            if (userWithSameEmail != null)
            {
                return CustomResponseDto<UserDto>.Fail(400, "Bu email alınamaz!");
            }
            if (userWithSameUserName != null)
            {
                return CustomResponseDto<UserDto>.Fail(400, "Bu kullanıcı adı alınamaz!");
            }

            var result = await _userManager.CreateAsync(user, createUserDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();

                return CustomResponseDto<UserDto>.Fail(400, errors);
            }

            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }

        public async Task<CustomResponseDto<UserDto>> RegisterUserAsync(RegisterUserDto registerUserDto)
        {
            var user = new User { Email = registerUserDto.Email, UserName = registerUserDto.UserName, IsActive = false, Role = "" };
            var userWithSameEmail = await _userManager.FindByEmailAsync(registerUserDto.Email);
            var userWithSameUserName = await _userManager.FindByNameAsync(registerUserDto.UserName);
            if (userWithSameEmail != null)
            {
                return CustomResponseDto<UserDto>.Fail(400, "Bu email alınamaz!");
            }
            if (userWithSameUserName != null)
            {
                return CustomResponseDto<UserDto>.Fail(400, "Bu kullanıcı adı alınamaz!");
            }

            var result = await _userManager.CreateAsync(user, registerUserDto.Password);

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
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
            }

            var result = await _userManager.UpdateAsync(_mapper.Map(updateUserDto, user));
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
            }

            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));

        }

        public async Task<CustomResponseDto<List<UserDto>>> GetRegisterUsersAsync()
        {
            var users = await _userManager.Users.Where(x => x.IsActive == false && x.Role == "").ToListAsync();
            if (users == null)
            {
                return CustomResponseDto<List<UserDto>>.Fail(404, "Register users not found!");
            }
            return CustomResponseDto<List<UserDto>>.Success(200, _mapper.Map<List<UserDto>>(users));
        }

        public async Task<CustomResponseDto<UserDto>> ChangePasswordAsync(UserChangePasswordDto userChangePasswordDto)
        {
            var user = _userManager.Users.SingleOrDefault(x => x.Id == userChangePasswordDto.Id);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
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
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
            }
            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }

        public async Task<CustomResponseDto<List<UserDto>>> GetAllActiveTrainers()
        {
            var users = await _userManager.Users.Where(x => x.Role == "trainer" && x.IsActive == true).ToListAsync();
            if (users == null)
            {
                return CustomResponseDto<List<UserDto>>.Fail(404, "Active trainers not found!");
            }
            return CustomResponseDto<List<UserDto>>.Success(200, _mapper.Map<List<UserDto>>(users));
        }

        public async Task<CustomResponseDto<List<UserDto>>> GetAllPassiveTrainers()
        {
            var users = await _userManager.Users.Where(x => x.Role == "trainer" && x.IsActive == false).ToListAsync();
            if (users == null)
            {
                return CustomResponseDto<List<UserDto>>.Fail(404, "Passive trainers not found!");
            }
            return CustomResponseDto<List<UserDto>>.Success(200, _mapper.Map<List<UserDto>>(users));
        }

        public async Task<CustomResponseDto<UserDto>> DeleteTrainerAsync(string trainerId)
        {
            var user = await _userManager.FindByIdAsync(trainerId);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
            }
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
            }
            return CustomResponseDto<UserDto>.Success(200, new UserDto());
        }

        public async Task<CustomResponseDto<UserDto>> FreezeTrainer(string trainerId)
        {
            var user = await _userManager.FindByIdAsync(trainerId);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
            }
            user.IsActive = false;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
            }
            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }

        public async Task<CustomResponseDto<UserDto>> UnfreezeTrainer(string trainerId)
        {
            var user = await _userManager.FindByIdAsync(trainerId);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
            }
            user.IsActive = true;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
            }
            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }

        public async Task<CustomResponseDto<List<UserDto>>> GetAllActiveMembers()
        {
            var users = await _userManager.Users.Where(x => x.Role == "member" && x.IsActive == true).ToListAsync();
            if (users == null)
            {
                return CustomResponseDto<List<UserDto>>.Fail(404, "Active users not found!");
            }
            return CustomResponseDto<List<UserDto>>.Success(200, _mapper.Map<List<UserDto>>(users));
        }

        public async Task<CustomResponseDto<List<UserDto>>> GetAllPassiveMembers()
        {
            var users = await _userManager.Users.Where(x => x.Role == "member" && x.IsActive == false).ToListAsync();
            if (users == null)
            {
                return CustomResponseDto<List<UserDto>>.Fail(404, "Passive users not found!");
            }
            return CustomResponseDto<List<UserDto>>.Success(200, _mapper.Map<List<UserDto>>(users));
        }

        public async Task<CustomResponseDto<UserDto>> DeleteMemberAsync(string memberId)
        {
            var member = await _userManager.FindByIdAsync(memberId);
            if (member == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
            }
            var result = await _userManager.DeleteAsync(member);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
            }
            return CustomResponseDto<UserDto>.Success(200, new UserDto());
        }

        public async Task<CustomResponseDto<UserDto>> FreezeMember(string memberId)
        {
            var user = await _userManager.FindByIdAsync(memberId);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
            }
            user.IsActive = false;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
            }
            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }

        public async Task<CustomResponseDto<UserDto>> UnfreezeMember(string memberId)
        {
            var user = await _userManager.FindByIdAsync(memberId);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
            }
            user.IsActive = true;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
            }
            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }


    }
}
