using Core.DTOs.TrainerUserDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Core.Models;
using Server.Core.Services;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TrainerUserController : CustomBaseController
    {
        private readonly IUserService _userService;

        public TrainerUserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateUserDto createUserDto)
        {
            return ActionResultInstance(await _userService.CreateUserAsync(createUserDto));
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return ActionResultInstance(await _userService.GetUserByNameAsync(HttpContext.User.Identity.Name));
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            return ActionResultInstance(await _userService.GetAllUsers());
        }

        [HttpPut]
        public async Task<IActionResult> UpdateById(TrainerUserWithDetailsDto trainerUserDto)
        {
            return ActionResultInstance(await _userService.UpdateUser(trainerUserDto));
        }


    }
}
