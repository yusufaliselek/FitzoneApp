using AutoMapper;
using Core.DTOs;
using Core.DTOs.TrainerPermissionDTOs;
using Core.DTOs.UserDTOs;
using Core.Models;
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
        private readonly IGenericService<TrainerPermission> _genericServiceTrainerPermission;
        private readonly IGenericService<TrainerDetail> _genericServiceTrainerDetail;
        public UserService(UserManager<User> userManager, IMapper mapper, IUserRepository userRepository, IGenericService<TrainerPermission> genericServiceTrainerPermission, IGenericService<TrainerDetail> genericServiceTrainerDetail)
        {
            _userManager = userManager;
            _mapper = mapper;
            _genericServiceTrainerPermission = genericServiceTrainerPermission;
            _genericServiceTrainerDetail = genericServiceTrainerDetail;
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

        public async Task<CustomResponseDto<UserDto>> DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
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
            return CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user));
        }

        public async Task<CustomResponseDto<UserDto>> UpdateUserRole(string userId, string role)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return CustomResponseDto<UserDto>.Fail(404, "User not found!");
            }
            user.Role = role;
            user.IsActive = true;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return CustomResponseDto<UserDto>.Fail(400, errors);
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

        public async Task<CustomResponseDto<List<TrainerWithPermissionDto>>> GetTrainersWithTrainerPermissionsAsync()
        {
            var trainers = await _userManager.Users.Where(x => x.Role == "trainer" && x.IsActive == true).ToListAsync();
            var trainerDetails = await _genericServiceTrainerDetail.GetAllAsync();
            var trainerPermissions = await _genericServiceTrainerPermission.GetAllAsync();
            var trainerWithPermissions = new List<TrainerWithPermissionDto>();
            for (int i = 0; i < trainers.Count; i++)
            {
                var trainer = trainers[i];
                var trainerDetail = trainerDetails.Where(item => item.TrainerId == trainer.Id).FirstOrDefault();
                var trainerPermissionId = "";
                var trainerPermissionName = "";
                if (trainerDetail != null && trainerDetail.TrainerPermissionId != null)
                {
                    trainerPermissionId = trainerPermissions.Where(item => item.Id == trainerDetail.TrainerPermissionId).FirstOrDefault().Id;
                    trainerPermissionName = trainerPermissions.Where(item => item.Id == trainerDetail.TrainerPermissionId).FirstOrDefault().Name;
                }
                var trainerWithPermission = new TrainerWithPermissionDto
                {
                    Id = trainer.Id,
                    UserName = trainer.UserName,
                    Email = trainer.Email,
                    TrainerPermissionId = trainerPermissionId,
                    TrainerPermissionName = trainerPermissionName
                };
                trainerWithPermissions.Add(trainerWithPermission);
            }
            return CustomResponseDto<List<TrainerWithPermissionDto>>.Success(200, trainerWithPermissions);
        }

        public async Task<CustomResponseDto<List<TrainerWithPermissionDto>>> GetTrainersWithPermissionIncludeNoOtherIdByPermissionIdAsync(string permissionId)
        {
            var trainers = await _userManager.Users.Where(x => x.Role == "trainer" && x.IsActive == true).ToListAsync();
            // if have another id dont add but if dont have id add
            var trainerDetails = await _genericServiceTrainerDetail.GetAllAsync();
            var trainerPermissions = await _genericServiceTrainerPermission.GetAllAsync();
            var trainerWithPermissions = new List<TrainerWithPermissionDto>();
            for (int i = 0; i < trainers.Count; i++)
            {
                var trainer = trainers[i];
                var trainerDetail = trainerDetails.Where(item => item.TrainerId == trainer.Id).FirstOrDefault();
                var trainerPermissionId = "";
                var trainerPermissionName = "";
                if (trainerDetail != null && trainerDetail.TrainerPermissionId != null && trainerDetail.TrainerPermissionId != "")
                {
                    trainerPermissionId = trainerPermissions.Where(item => item.Id == trainerDetail.TrainerPermissionId).FirstOrDefault().Id;
                    trainerPermissionName = trainerPermissions.Where(item => item.Id == trainerDetail.TrainerPermissionId).FirstOrDefault().Name;
                }
                var trainerWithPermission = new TrainerWithPermissionDto
                {
                    Id = trainer.Id,
                    UserName = trainer.UserName,
                    Email = trainer.Email,
                    TrainerPermissionId = trainerPermissionId,
                    TrainerPermissionName = trainerPermissionName
                };
                if (trainerPermissionId == permissionId || trainerPermissionId == "")
                {
                    trainerWithPermissions.Add(trainerWithPermission);
                }
            }
            trainerWithPermissions.Sort((x, y) => string.Compare(x.UserName, y.UserName));
           
            return CustomResponseDto<List<TrainerWithPermissionDto>>.Success(200, trainerWithPermissions);
        }

        public async Task<CustomResponseDto<List<TrainerWithPermissionDto>>> DeleteTrainerPermissionFromTrainerAsync(string permissionId, string trainerId)
        {
            var trainerDetail = await _genericServiceTrainerDetail.Where(x => x.TrainerId == trainerId).FirstOrDefaultAsync();
            if (trainerDetail != null)
            {
                trainerDetail.TrainerPermissionId = "";
                await _genericServiceTrainerDetail.UpdateAsync(trainerDetail);
            }
            return await GetTrainersWithPermissionIncludeNoOtherIdByPermissionIdAsync(permissionId);
        }

        public async Task<CustomResponseDto<List<TrainerWithPermissionDto>>> AddTrainerPermissionToTrainerAsync(string permissionId, string trainerId)
        {
            var trainerDetail = await _genericServiceTrainerDetail.Where(x => x.TrainerId == trainerId).FirstOrDefaultAsync();
            if (trainerDetail != null)
            {
                trainerDetail.TrainerPermissionId = permissionId;
                await _genericServiceTrainerDetail.UpdateAsync(trainerDetail);
            }
            return await GetTrainersWithPermissionIncludeNoOtherIdByPermissionIdAsync(permissionId);
        }

        // Member

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
