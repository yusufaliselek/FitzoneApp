using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Core.Services;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TrainerController : CustomBaseController
    {
        private readonly IUserService _userService;
        private readonly IDocumentService _documentService;
        private string ContentPath()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        }

        public TrainerController(IUserService userService, IDocumentService documentService)
        {
            _userService = userService;
            _documentService = documentService;
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

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteTrainerPermissionFromTrainer(string permissionId, string trainerId)
        {
            return ActionResultInstance(await _userService.DeleteTrainerPermissionFromTrainerAsync(permissionId, trainerId));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddTrainerPermissionToTrainer(string permissionId, string trainerId)
        {
            return ActionResultInstance(await _userService.AddTrainerPermissionToTrainerAsync(permissionId, trainerId));
        }

        [Authorize]
        [HttpPost("{trainerId}")]
        public async Task<IActionResult> CreatePhoto(IFormFile file, string trainerId)
        {
            return ActionResultInstance(await _documentService.CreateTrainerPhotoAsync(file, trainerId, ContentPath()));
        }

        [HttpGet("{trainerId}")]
        public Task<IActionResult> Photo(string trainerId)
        {
            return _documentService.GetTrainerPhotoByIdAsync(trainerId, ContentPath());
        }

        [Authorize]
        [HttpPut("{trainerId}")]
        public async Task<IActionResult> UpdatePhoto(IFormFile file, string trainerId)
        {
            return ActionResultInstance(await _documentService.UpdateTrainerPhotoAsync(file, trainerId, ContentPath()));
        }

        [Authorize]
        [HttpDelete("{trainerId}")]
        public async Task<IActionResult> DeletePhoto(string trainerId)
        {
            return ActionResultInstance(await _documentService.DeleteTrainerPhotoAsync(trainerId, ContentPath()));
        }


    }
}
