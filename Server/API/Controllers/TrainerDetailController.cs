using Core.DTOs.TrainerDetailDTOs;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TrainerDetailController : CustomBaseController
    {
        private readonly ITrainerDetailService _trainerDetailService;
        public TrainerDetailController(ITrainerDetailService trainerDetailService)
        {
            _trainerDetailService = trainerDetailService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTrainerDetailDto createTrainerDetailDto)
        {
            return ActionResultInstance(await _trainerDetailService.CreateTrainerDetailAsync(createTrainerDetailDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetTrainerDetailById(string trainerDetailId)
        {
            return ActionResultInstance(await _trainerDetailService.GetTrainerDetailByIdAsync(trainerDetailId));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTrainerDetails()
        {
            return ActionResultInstance(await _trainerDetailService.GetAllTrainerDetailsAsync());
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTrainerDetail(UpdateTrainerDetailDto updateTrainerDetailDto)
        {
            return ActionResultInstance(await _trainerDetailService.UpdateTrainerDetailAsync(updateTrainerDetailDto));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTrainerDetail(string trainerDetailId)
        {
            return ActionResultInstance(await _trainerDetailService.DeleteTrainerDetailAsync(trainerDetailId));
        }

    }
}
