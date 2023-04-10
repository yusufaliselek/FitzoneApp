using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Core.DTOs;
using Server.Core.Services;

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainerUserController : CustomBaseController
    {
        private readonly IUserService _userService;

        public TrainerUserController(IUserService userService)
        {
            _userService = userService;
        }

        //api/user -> create user when you use post
        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserDto createUserDto)
        {
            //   throw new CustomException("Veri tabanı ile alakalı bir hata meydana geldi!"); bu şekilde customexception u deneyebiliriz.
            return ActionResultInstance(await _userService.CreateUserAsync(createUserDto));
        }


        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            return ActionResultInstance(await _userService.GetUserByNameAsync(HttpContext.User.Identity.Name));
        }
    }
}
