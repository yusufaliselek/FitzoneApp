using AutoMapper;
using Server.Core.DTOs;
using Server.Core.Models;

namespace Service.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<TrainerUser, TrainerUserDto>().ReverseMap();
            CreateMap<TrainerUser, TrainerUserWithDetailsDto>();
            CreateMap<TrainerCanEdit, TrainerCanEditDto>().ReverseMap();
            CreateMap<TrainerClub, TrainerClubDto>().ReverseMap();
            CreateMap<TrainerLicence, TrainerLicenceDto>().ReverseMap();
        }

    }
}
