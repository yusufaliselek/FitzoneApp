using Core.DTOs;
using Core.DTOs.TrainerDetailDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface ITrainerDetailService
    {
        Task<CustomResponseDto<TrainerDetailDto>> CreateTrainerDetailAsync(CreateTrainerDetailDto trainerDetailDto);
        Task<CustomResponseDto<TrainerDetailDto>> GetTrainerDetailByIdAsync(string trainerDetailId);
        Task<CustomResponseDto<TrainerDetailDto>> GetTrainerDetailByTrainerIdAsync(string trainerId);
        Task<CustomResponseDto<UpdateTrainerDetailDto>> UpdateTrainerDetailAsync(UpdateTrainerDetailDto trainerDetailDto);
        Task<CustomResponseDto<string>> DeleteTrainerDetailAsync(string trainerDetailId);
        Task<CustomResponseDto<string>> DeleteByTrainerIdAsync(string trainerId);
    }
}
