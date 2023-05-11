using AutoMapper;
using Core.DTOs;
using Core.DTOs.TrainerUserDTOs;
using Core.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Services;

namespace Server.Service.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<TrainerUser> _userManager;
        private readonly ITrainerUserRepository _trainerUserRepository;
        private readonly IMapper _mapper;
        public UserService(UserManager<TrainerUser> userManager, IMapper mapper, ITrainerUserRepository trainerUserRepository)
        {
            _userManager = userManager;
            _mapper = mapper;
            _trainerUserRepository = trainerUserRepository;
        }
        public async Task<CustomResponseDto<TrainerUserDto>> CreateUserAsync(CreateUserDto createUserDto)
        {
            var user = new TrainerUser { Email = createUserDto.Email, UserName = createUserDto.UserName };

            var result = await _userManager.CreateAsync(user, createUserDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();

                return CustomResponseDto<TrainerUserDto>.Fail(400, errors);
            }

            return CustomResponseDto<TrainerUserDto>.Success(200, _mapper.Map<TrainerUserDto>(user));
        }

        public async Task<CustomResponseDto<TrainerUserWithDetailsDto>> GetUserByNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return CustomResponseDto<TrainerUserWithDetailsDto>.Fail(404, "UserName not found");
            }

            return CustomResponseDto<TrainerUserWithDetailsDto>.Success(200, _mapper.Map<TrainerUserWithDetailsDto>(user));
        }

        public async Task<CustomResponseDto<List<TrainerUserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var usersDto = _mapper.Map<List<TrainerUserDto>>(users);
            return CustomResponseDto<List<TrainerUserDto>>.Success(200, usersDto);
        }

        public async Task<CustomResponseDto<TrainerUserWithDetailsDto>> UpdateUser(TrainerUserWithDetailsDto userDTO)
        {
            var userDetail = await _trainerUserRepository.GetTrainerUserWithDetailsAsync(userDTO.Id);
            if (userDetail == null)
            {
                return CustomResponseDto<TrainerUserWithDetailsDto>.Fail(404, "User not found");
            }
            if (userDTO.TrainerLicences != null && userDTO.TrainerLicences.Count() != 0)
            {
                if (userDetail.TrainerLicences.Count() != 0)
                {
                    foreach (var item in userDetail.TrainerLicences)
                    {
                        var isCurrent = userDTO.TrainerLicences.Where(x => x.Id == item.Id).FirstOrDefault();
                        if (isCurrent == null)
                        {
                            userDetail.TrainerLicences.Add(_mapper.Map<TrainerLicence>(item));
                        }
                        else
                        {
                            _mapper.Map(item, isCurrent);
                        }
                    }
                }
                else
                {
                    userDetail.TrainerLicences = _mapper.Map<List<TrainerLicence>>(userDTO.TrainerLicences);
                }
  
            }
            if (userDTO.TrainerClubs != null && userDTO.TrainerClubs.Count() != 0)
            {
                if (userDetail.TrainerClubs.Count() != 0)
                {
                    foreach (var item in userDetail.TrainerClubs)
                    {
                        var isCurrent = userDTO.TrainerClubs.Where(x => x.Id == item.Id).FirstOrDefault();
                        if (isCurrent == null)
                        {
                            userDetail.TrainerClubs.Add(_mapper.Map<TrainerClub>(item));
                        }
                        else
                        {
                            _mapper.Map(item, isCurrent);
                        }
                    }
                }
                else
                {
                    userDetail.TrainerClubs = _mapper.Map<List<TrainerClub>>(userDTO.TrainerClubs);
                }
            }
            if (userDTO.TrainerCanEdit != null)
            {
                _mapper.Map(userDetail.TrainerCanEdit, userDTO.TrainerCanEdit);
            }

            userDetail.Biography = userDTO.Biography;
            userDetail.FirstName = userDTO.FirstName;
            userDetail.LastName = userDTO.LastName;
            userDetail.PhoneNumber = userDTO.PhoneNumber;
            userDetail.TCKN = userDTO.TCKN;
            userDetail.Profession = userDTO.Profession;
            userDetail.Qualification = userDTO.Qualification;
            userDetail.Location = userDTO.Location;
            userDetail.BirthdayDate = userDTO.BirthdayDate;
            userDetail.Gender = userDTO.Gender;
            userDetail.UpdatedAt = DateTime.Now;

            var result = await _userManager.UpdateAsync(userDetail);

            // Hata yoksa başarılı yanıt döndür
            if (result.Succeeded)
            {
                 return CustomResponseDto<TrainerUserWithDetailsDto>.Success(200, _mapper.Map<TrainerUserWithDetailsDto>(userDetail));
            }

            //Hata varsa hata mesajlarıyla hata yanıtı döndür
            var errors = result.Errors.Select(x => x.Description).ToList();
            return CustomResponseDto<TrainerUserWithDetailsDto>.Fail(400, errors);
        }
    }
}
