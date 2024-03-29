﻿using Core.DTOs;
using Core.DTOs.TrainerPermissionDTOs;
using Core.DTOs.UserDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IUserService
    {
        Task<CustomResponseDto<UserDto>> CreateUserAsync(CreateUserDto createUserDto);
        Task<CustomResponseDto<UserDto>> RegisterUserAsync(RegisterUserDto registerUserDto);
        Task<CustomResponseDto<UserDto>> UpdateUserAsync(UpdateUserDto updateUserDto);
        Task<CustomResponseDto<UserDto>> ChangePasswordAsync(UserChangePasswordDto userChangePasswordDto);
        Task<CustomResponseDto<UserDto>> GetUserByIdAsync(string userId);
        Task<CustomResponseDto<List<UserDto>>> GetRegisterUsersAsync();
        Task<CustomResponseDto<UserDto>> DeleteUserAsync(string userId);
        Task<CustomResponseDto<UserDto>> UpdateUserRole(string userId, string role);

        // Trainers
        Task<CustomResponseDto<List<UserDto>>> GetAllActiveTrainers();
        Task<CustomResponseDto<List<UserDto>>> GetAllPassiveTrainers();
        Task<CustomResponseDto<UserDto>> DeleteTrainerAsync(string trainerId);
        Task<CustomResponseDto<UserDto>> FreezeTrainer(string trainerId);
        Task<CustomResponseDto<UserDto>> UnfreezeTrainer(string trainerId);
        Task<CustomResponseDto<List<TrainerWithPermissionDto>>> GetTrainersWithTrainerPermissionsAsync();
        Task<CustomResponseDto<List<TrainerWithPermissionDto>>> GetTrainersWithPermissionIncludeNoOtherIdByPermissionIdAsync(string permissionId);
        Task<CustomResponseDto<List<TrainerWithPermissionDto>>> DeleteTrainerPermissionFromTrainerAsync(string permissionId, string trainderId);
        Task<CustomResponseDto<List<TrainerWithPermissionDto>>> AddTrainerPermissionToTrainerAsync(string permissionId, string trainderId);


        // Members
        Task<CustomResponseDto<List<UserDto>>> GetAllActiveMembers();
        Task<CustomResponseDto<List<UserDto>>> GetAllPassiveMembers();
        Task<CustomResponseDto<UserDto>> DeleteMemberAsync(string memberId);
        Task<CustomResponseDto<UserDto>> FreezeMember(string memberId);
        Task<CustomResponseDto<UserDto>> UnfreezeMember(string memberId);
    }
}
