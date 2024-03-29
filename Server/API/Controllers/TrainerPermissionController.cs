﻿using Core.DTOs.TrainerPermissionDTOs;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TrainerPermissionController : CustomBaseController
    {
        private readonly ITrainerPermissionService _trainerPermissionService;

        public TrainerPermissionController(ITrainerPermissionService trainerPermissionService)
        {
            _trainerPermissionService = trainerPermissionService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTrainerPermissionDto createTrainerPermissionDto)
        {
            return ActionResultInstance(await _trainerPermissionService.CreateTrainerPermissionAsync(createTrainerPermissionDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetById(string trainerPermissionId)
        {
            return ActionResultInstance(await _trainerPermissionService.GetTrainerPermissionByIdAsync(trainerPermissionId));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return ActionResultInstance(await _trainerPermissionService.GetAllTrainerPermissionsAsync());
        }

        [HttpGet]
        public async Task<IActionResult> GetTrainersByTrainerPermissionId(string trainerPermissionId)
        {
            return ActionResultInstance(await _trainerPermissionService.GetTrainersByTrainerPermissionIdAsync(trainerPermissionId));
        }

        [HttpPut]
        public async Task<IActionResult> Update(TrainerPermissionDto updateTrainerPermissionDto)
        {
            return ActionResultInstance(await _trainerPermissionService.UpdateTrainerPermissionAsync(updateTrainerPermissionDto));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTrainer(UpdateTrainerPermissionTrainerDto updateTrainerPermissionTrainerDto)
        {
            return ActionResultInstance(await _trainerPermissionService.UpdateTrainerPermissionTrainerAsync(updateTrainerPermissionTrainerDto));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            return ActionResultInstance(await _trainerPermissionService.DeleteTrainerPermissionAsync(id));
        }

    }
}
