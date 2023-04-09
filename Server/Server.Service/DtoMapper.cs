using AutoMapper;
using Server.Core.DTOs;
using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service
{
    internal class DtoMapper : Profile
    {
        public DtoMapper()
        {
            CreateMap<TrainerUser, TrainerUserDto>().ReverseMap();
            CreateMap<TrainerUser, TrainerUserWithDetailsDto>();
            CreateMap<TrainerCanEdit, TrainerCanEditDto>().ReverseMap();
            CreateMap<TrainerClub,  TrainerClubDto>().ReverseMap();
            CreateMap<TrainerLicence, TrainerLicenceDto>().ReverseMap();

        }
    }
}
