using Core.DTOs.UserDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Core.Models;
using Server.Core.Services;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : CustomBaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateUserDto createUserDto)
        {
            return ActionResultInstance(await _userService.CreateUserAsync(createUserDto));
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateUserDto updateUserDto)
        {
            return ActionResultInstance(await _userService.UpdateUserAsync(updateUserDto));
        }

        [HttpPut]
        public async Task<IActionResult> ChangePassword(UserChangePasswordDto userChangePasswordDto)
        {
            return ActionResultInstance(await _userService.ChangePasswordAsync(userChangePasswordDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetById(string userId)
        {
            return ActionResultInstance(await _userService.GetUserByIdAsync(userId));
        }

        [HttpGet]
        public async Task<IActionResult> GetRegisterUsers()
        {
            return ActionResultInstance(await _userService.GetRegisterUsersAsync());
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserRole(string userId, string role)
        {
            return ActionResultInstance(await _userService.UpdateUserRole(userId, role));
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            return ActionResultInstance(await _userService.RegisterUserAsync(registerUserDto));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string userId)
        {
            return ActionResultInstance(await _userService.DeleteUserAsync(userId));
        }

        // Trainers
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllActiveTrainers()
        {
            return ActionResultInstance(await _userService.GetAllActiveTrainers());
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllPassiveTrainers()
        {
            return ActionResultInstance(await _userService.GetAllPassiveTrainers());
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteTrainer(string trainerId)
        {
            return ActionResultInstance(await _userService.DeleteTrainerAsync(trainerId));
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> FreezeTrainer(string trainerId)
        {
            return ActionResultInstance(await _userService.FreezeTrainer(trainerId));
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UnfreezeTrainer(string trainerId)
        {
            return ActionResultInstance(await _userService.UnfreezeTrainer(trainerId));
        }

        [HttpGet]
        public async Task<IActionResult> GetTrainersWithTrainerPermissions()
        {
            return ActionResultInstance(await _userService.GetTrainersWithTrainerPermissionsAsync());
        }

        [HttpGet]
        public async Task<IActionResult> GetTrainersWithPermissionIncludeNoOtherIdByPermissionIdAsync(string permissionId)
        {
            return ActionResultInstance(await _userService.GetTrainersWithPermissionIncludeNoOtherIdByPermissionIdAsync(permissionId));
        }

        // Members
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllActiveMembers()
        {
            return ActionResultInstance(await _userService.GetAllActiveMembers());
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllPassiveMembers()
        {
            return ActionResultInstance(await _userService.GetAllPassiveMembers());
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteMember(string memberId)
        {
            return ActionResultInstance(await _userService.DeleteMemberAsync(memberId));
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> FreezeMember(string memberId)
        {
            return ActionResultInstance(await _userService.FreezeMember(memberId));
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UnfreezeMember(string memberId)
        {
            return ActionResultInstance(await _userService.UnfreezeMember(memberId));
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetMemberById(string memberId)
        {
            return ActionResultInstance(await _userService.GetUserByIdAsync(memberId));
        }

    }
}
