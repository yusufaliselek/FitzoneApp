using AutoMapper;
using Core.DTOs;
using Core.DTOs.TrainerPermissionDTOs;
using Core.Models;
using Core.Services;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class TrainerPermissionService : ITrainerPermissionService
    {
        private readonly IMapper _mapper;
        private readonly IGenericService<TrainerPermission> _genericService;

        public TrainerPermissionService(IMapper mapper, IGenericService<TrainerPermission> genericService)
        {
            _mapper = mapper;
            _genericService = genericService;
        }


        public async Task<CustomResponseDto<TrainerPermissionDto>> CreateTrainerPermissionAsync(CreateTrainerPermissionDto createTrainerPermissionDto)
        {
            var trainerPermission = _mapper.Map<TrainerPermission>(createTrainerPermissionDto);
            trainerPermission.Id = Guid.NewGuid().ToString();
            await _genericService.AddAsync(trainerPermission);
            return CustomResponseDto<TrainerPermissionDto>.Success(200,_mapper.Map<TrainerPermissionDto>(trainerPermission));
        }

        public async Task<CustomResponseDto<string>> DeleteTrainerPermissionAsync(string trainerPermissionById)
        {
            var trainerPermission = await _genericService.GetByIdAsync(trainerPermissionById);
            await _genericService.RemoveAsync(trainerPermission);
            return CustomResponseDto<string>.Success(200, "Trainer Permission Deleted");

        }

        public async Task<CustomResponseDto<List<TrainerPermissionDto>>> GetAllTrainerPermissionsAsync()
        {
            return CustomResponseDto<List<TrainerPermissionDto>>.Success(200, _mapper.Map<List<TrainerPermissionDto>>(await _genericService.GetAllAsync()));
        }

        public async Task<CustomResponseDto<TrainerPermissionDto>> GetTrainerPermissionByIdAsync(string getTrainerPermissionByIdDto)
        {
            return CustomResponseDto<TrainerPermissionDto>.Success(200, _mapper.Map<TrainerPermissionDto>(await _genericService.GetByIdAsync(getTrainerPermissionByIdDto)));
        }

        public async Task<CustomResponseDto<TrainerPermissionDto>> UpdateTrainerPermissionAsync(TrainerPermissionDto updateTrainerPermissionDto)
        {
            var trainerPermissionUpdate = _mapper.Map(updateTrainerPermissionDto, await _genericService.GetByIdAsync(updateTrainerPermissionDto.Id));
            await _genericService.UpdateAsync(trainerPermissionUpdate);
            return CustomResponseDto<TrainerPermissionDto>.Success(200, _mapper.Map<TrainerPermissionDto>(trainerPermissionUpdate));
        }
    }
}
