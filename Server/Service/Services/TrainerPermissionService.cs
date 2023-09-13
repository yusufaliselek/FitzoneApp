using AutoMapper;
using Core.DTOs;
using Core.DTOs.TrainerPermissionDTOs;
using Core.DTOs.UserDTOs;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
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
        private readonly IGenericService<TrainerDetail> _genericServiceTrainerDetail;
        private readonly UserManager<User> _userManager;

        public TrainerPermissionService(IMapper mapper, IGenericService<TrainerPermission> genericService, UserManager<User> userManager, IGenericService<TrainerDetail> genericServiceTrainerDetail)
        {
            _mapper = mapper;
            _genericService = genericService;
            _userManager = userManager;
            _genericServiceTrainerDetail = genericServiceTrainerDetail;
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

        public async Task<CustomResponseDto<List<UserDto>>> GetTrainersByTrainerPermissionIdAsync(string trainerPermissionById)
        {
            var trainerDetails = await _genericServiceTrainerDetail.Where(item => item.TrainerPermissionId == trainerPermissionById).ToListAsync();
            if (trainerDetails == null)
            {
                return CustomResponseDto<List<UserDto>>.Success(200, new List<UserDto>());
            }
            var trainers = new List<User>();
            for (int i = 0; i < trainerDetails.Count; i++)
            {
                trainers.Add(await _userManager.FindByIdAsync(trainerDetails[i].TrainerId));
            }
            return CustomResponseDto<List<UserDto>>.Success(200, _mapper.Map<List<UserDto>>(trainers));
            
        }

        public async Task<CustomResponseDto<TrainerPermissionDto>> UpdateTrainerPermissionAsync(TrainerPermissionDto updateTrainerPermissionDto)
        {
            var trainerPermissionUpdate = _mapper.Map(updateTrainerPermissionDto, await _genericService.GetByIdAsync(updateTrainerPermissionDto.Id));
            await _genericService.UpdateAsync(trainerPermissionUpdate);
            return CustomResponseDto<TrainerPermissionDto>.Success(200, _mapper.Map<TrainerPermissionDto>(trainerPermissionUpdate));
        }

        public async Task<CustomResponseDto<TrainerPermissionDto>> UpdateTrainerPermissionTrainerAsync(UpdateTrainerPermissionTrainerDto updateTrainerPermissionTrainerDto)
        {
            var trainerPermission = await _genericService.GetByIdAsync(updateTrainerPermissionTrainerDto.PermissionId);
            var trainer = await _userManager.FindByIdAsync(updateTrainerPermissionTrainerDto.TrainerId);
            var trainerDetail = await _genericServiceTrainerDetail.Where(item => item.TrainerId == updateTrainerPermissionTrainerDto.TrainerId).FirstOrDefaultAsync();
            if (trainerDetail == null)
            {
                var trainerDetailNew = new TrainerDetail
                {
                    Id = Guid.NewGuid().ToString(),
                    TrainerId = updateTrainerPermissionTrainerDto.TrainerId,
                    TrainerPermissionId = updateTrainerPermissionTrainerDto.PermissionId
                };
                await _genericServiceTrainerDetail.AddAsync(trainerDetailNew);
                return CustomResponseDto<TrainerPermissionDto>.Success(200, _mapper.Map<TrainerPermissionDto>(trainerPermission));
            }
            trainerDetail.TrainerPermissionId = updateTrainerPermissionTrainerDto.PermissionId;
            await _genericServiceTrainerDetail.UpdateAsync(trainerDetail);
            return CustomResponseDto<TrainerPermissionDto>.Success(200, _mapper.Map<TrainerPermissionDto>(trainerPermission));
        }
    }
}
