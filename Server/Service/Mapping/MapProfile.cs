using AutoMapper;
using Core.DTOs.RoleDTOs;
using Core.DTOs.TrainerPermissionDTOs;
using Core.DTOs.UserDTOs;
using Core.Models;
using Server.Core.Models;

namespace Service.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            // User
            CreateMap<User, CreateUserDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UpdateUserDto>().ReverseMap();
            CreateMap<User, UserChangePasswordDto>().ReverseMap();

            // Role
            CreateMap<Role, CreateRoleDto>().ReverseMap();
            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<Role, UpdateRoleDto>().ReverseMap();

            // Trainer Permission
            CreateMap<TrainerPermission, CreateTrainerPermissionDto>().ReverseMap();
            CreateMap<TrainerPermission, TrainerPermissionDto>().ReverseMap();
        }

    }
}
