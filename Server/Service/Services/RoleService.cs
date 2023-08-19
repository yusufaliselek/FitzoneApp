using AutoMapper;
using Core.DTOs;
using Core.DTOs.RoleDTOs;
using Core.Models;
using Core.Services;
using Server.Core.Repositories;
using Server.Core.Services;
using Server.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class RoleService : IRoleService
    {
        private readonly IMapper _mapper;
        private readonly IGenericService<Role> _genericService;

        public RoleService(IMapper mapper, IUnitOfWork unitOfWork, IGenericService<Role> genericService)
        {
            _mapper = mapper;
            _genericService = genericService;
        }

        public async Task<CustomResponseDto<CreateRoleDto>> CreateRoleAsync(CreateRoleDto createRoleDto)
        {
            var role = _mapper.Map<Role>(createRoleDto);
            await _genericService.AddAsync(role);
            return CustomResponseDto<CreateRoleDto>.Success(200);
        }

        public async Task<CustomResponseDto<List<RoleDto>>> GetAllRoleAsync()
        {
            var result = await _genericService.GetAllAsync();
            return CustomResponseDto<List<RoleDto>>.Success(200, _mapper.Map<List<RoleDto>>(result));
        }


        public async Task<CustomResponseDto<RoleDto>> GetRoleByIdAsync(string roleId)
        {
            var result = await _genericService.GetByIdAsync(roleId);
            var role = _mapper.Map<RoleDto>(result);
            return CustomResponseDto<RoleDto>.Success(200, role);
        }

        public async Task<CustomResponseDto<RoleDto>> UpdateRoleAsync(UpdateRoleDto updateRoleDto)
        {
            var role = await _genericService.GetByIdAsync(updateRoleDto.Id);
            if (role == null)
            {
                return CustomResponseDto<RoleDto>.Fail(404, "Role is not defined");
            }
            var updateRole = _mapper.Map(updateRoleDto, role);
            await _genericService.UpdateAsync(updateRole);
            return CustomResponseDto<RoleDto>.Success(200);
        }
    }
}
