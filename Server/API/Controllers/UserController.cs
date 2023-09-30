using Core.DTOs.UserDTOs;
using Core.Services;
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
        private readonly IDocumentService _documentService;
        private string ContentPath()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        }

        public UserController(IUserService userService, IDocumentService documentService)
        {
            _userService = userService;
            _documentService = documentService;
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

    }
}
