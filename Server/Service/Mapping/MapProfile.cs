﻿using AutoMapper;
using Core.DTOs.MemberDetailDTOs;
using Core.DTOs.TrainerDetailDTOs;
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
            CreateMap<RegisterUserDto, User>();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UpdateUserDto>().ReverseMap();
            CreateMap<User, UserChangePasswordDto>().ReverseMap();

            // Trainer Permission
            CreateMap<TrainerPermission, CreateTrainerPermissionDto>().ReverseMap();
            CreateMap<TrainerPermission, TrainerPermissionDto>().ReverseMap();

            // Trainer Detail
            CreateMap<TrainerDetail, CreateTrainerDetailDto>().ReverseMap();
            CreateMap<TrainerDetail, TrainerDetailDto>().ReverseMap();
            CreateMap<TrainerDetail, UpdateTrainerDetailDto>().ReverseMap();

            // Member Detail
            CreateMap<MemberDetail, CreateMemberDetailDto>().ReverseMap();
            CreateMap<MemberDetail, MemberDetailDto>().ReverseMap();
            CreateMap<MemberDetail, UpdateMemberDetailDto>().ReverseMap();
        }

    }
}
