using Core.DTOs;
using Core.DTOs.UserDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IUserService
    {
        Task<CustomResponseDto<UserDto>> CreateUserAsync(CreateUserDto createUserDto);
        Task<CustomResponseDto<UserDto>> UpdateUserAsync(UpdateUserDto updateUserDto);
        Task<CustomResponseDto<UserDto>> ChangePasswordAsync(UserChangePasswordDto userChangePasswordDto);

    }
}
