using AutoMapper;
using Core.DTOs;
using Core.DTOs.TrainerDetailDTOs;
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
    public class TrainerDetailService : ITrainerDetailService
    {
        private IMapper _mapper;
        private IGenericService<TrainerDetail> _genericService;

        public TrainerDetailService(IMapper mapper, IGenericService<TrainerDetail> genericService)
        {
            _mapper = mapper;
            _genericService = genericService;
        }

        public async Task<CustomResponseDto<TrainerDetailDto>> CreateTrainerDetailAsync(CreateTrainerDetailDto createTrainerDetailDto)
        {
            var trainerDetail = _mapper.Map<TrainerDetail>(createTrainerDetailDto);
             await _genericService.AddAsync(trainerDetail);
            return CustomResponseDto<TrainerDetailDto>.Success(200, _mapper.Map<TrainerDetailDto>(createTrainerDetailDto));
        }
        
        public async Task<CustomResponseDto<string>> DeleteTrainerDetailAsync(string trainerDetailId)
        {
            var trainerDetail = await _genericService.GetByIdAsync(trainerDetailId);
            await _genericService.RemoveAsync(trainerDetail);
            return CustomResponseDto<string>.Success(200, "Trainer detail deleted!");
        }

        public async Task<CustomResponseDto<List<TrainerDetailDto>>> GetAllTrainerDetailsAsync()
        {
            var trainerDetails = await _genericService.GetAllAsync();
            return CustomResponseDto<List<TrainerDetailDto>>.Success(200, _mapper.Map<List<TrainerDetailDto>>(trainerDetails));
        }

        public async Task<CustomResponseDto<TrainerDetailDto>> GetTrainerDetailByIdAsync(string trainerDetailId)
        {
            var trainerDetail = await _genericService.GetByIdAsync(trainerDetailId);
            return CustomResponseDto<TrainerDetailDto>.Success(200, _mapper.Map<TrainerDetailDto>(trainerDetail));
        }

        public async Task<CustomResponseDto<UpdateTrainerDetailDto>> UpdateTrainerDetailAsync(UpdateTrainerDetailDto trainerDetailDto)
        {
            await _genericService.UpdateAsync(_mapper.Map<TrainerDetail>(trainerDetailDto));

            return CustomResponseDto<UpdateTrainerDetailDto>.Success(200, trainerDetailDto);
        }
    }
}
