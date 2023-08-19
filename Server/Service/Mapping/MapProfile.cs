using AutoMapper;
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



            // Trainer Permission
            CreateMap<TrainerPermission, CreateTrainerPermissionDto>().ReverseMap();
            CreateMap<TrainerPermission, TrainerPermissionDto>().ReverseMap();
        }

    }
}
