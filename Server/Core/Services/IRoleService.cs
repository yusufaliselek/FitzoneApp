using Core.DTOs;
using Core.DTOs.RoleDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface IRoleService
    {
        Task<CustomResponseDto<CreateRoleDto>> CreateRoleAsync(CreateRoleDto createRoleDto);
        Task<CustomResponseDto<List<RoleDto>>> GetAllRoleAsync();
        Task<CustomResponseDto<RoleDto>> GetRoleByIdAsync(string roleId);
        Task<CustomResponseDto<RoleDto>> UpdateRoleAsync(UpdateRoleDto updateRoleDto);
    }
}
