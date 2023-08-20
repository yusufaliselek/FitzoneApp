using Core.DTOs;
using Core.DTOs.TrainerPermissionDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface ITrainerPermissionService
    {
        Task<CustomResponseDto<TrainerPermissionDto>> CreateTrainerPermissionAsync(CreateTrainerPermissionDto createTrainerPermissionDto);
        Task<CustomResponseDto<TrainerPermissionDto>> GetTrainerPermissionByIdAsync(string trainerPermissionById);
        Task<CustomResponseDto<List<TrainerPermissionDto>>> GetAllTrainerPermissionsAsync();
        Task<CustomResponseDto<TrainerPermissionDto>> UpdateTrainerPermissionAsync(TrainerPermissionDto updateTrainerPermissionDto);
        Task<CustomResponseDto<string>> DeleteTrainerPermissionAsync(string trainerPermissionById);
    }
}
