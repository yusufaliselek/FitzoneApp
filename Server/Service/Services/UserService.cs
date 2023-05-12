using AutoMapper;
using Core.DTOs;
using Core.DTOs.TrainerUserDTOs;
using Core.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Repositories;
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
            var userWithoutDetails = await _userManager.FindByNameAsync(userName);
            if (userWithoutDetails == null)
            {
                return CustomResponseDto<TrainerUserWithDetailsDto>.Fail(404, "UserName not found");
            }

            var user = await _trainerUserRepository.GetTrainerUserWithDetailsAsync(userWithoutDetails.Id);

            return CustomResponseDto<TrainerUserWithDetailsDto>.Success(200, _mapper.Map<TrainerUserWithDetailsDto>(user));
        }

        public async Task<CustomResponseDto<List<TrainerUserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var usersDto = _mapper.Map<List<TrainerUserDto>>(users);
            return CustomResponseDto<List<TrainerUserDto>>.Success(200, usersDto);
        }

        public async Task<CustomResponseDto<TrainerUserWithDetailsDto>> UpdateUser(TrainerUserWithDetailsDto userDto)
        {
            var user = await _trainerUserRepository.GetTrainerUserWithDetailsAsync(userDto.Id);
            if (user == null)
            {
                return CustomResponseDto<TrainerUserWithDetailsDto>.Fail(404, "User not found");
            }


            // Trainer Club Infos
            var newTrainerClubs = userDto.TrainerClubs;
            var oldTrainerClubs = user.TrainerClubs;
            var pushTrainerClubs = new List<TrainerClub>();
            if (newTrainerClubs != null && newTrainerClubs.Count() != 0)
            {
                if(oldTrainerClubs != null && oldTrainerClubs.Count() != 0)
                {
                    foreach (var trainerClubDto in newTrainerClubs)
                    {
                        var currentTrainerClub = oldTrainerClubs.FirstOrDefault(x => x.Id == trainerClubDto.Id);
                        if (currentTrainerClub == null)
                        {
                            var newTrainerClub = new TrainerClub();
                            newTrainerClub.TrainerUserId = trainerClubDto.TrainerUserId;
                            newTrainerClub.Role = trainerClubDto.Role;
                            newTrainerClub.Description = trainerClubDto.Description;
                            newTrainerClub.LeaveDate = trainerClubDto.LeaveDate;
                            newTrainerClub.EntryDate = trainerClubDto.EntryDate;
                            newTrainerClub.Name = trainerClubDto.Name;
                            newTrainerClub.CreatedAt = DateTime.Now;
                            newTrainerClub.UpdatedAt = DateTime.Now;
                            pushTrainerClubs.Add(newTrainerClub);
                        }
                        else
                        {
                            currentTrainerClub.EntryDate = trainerClubDto.EntryDate;
                            currentTrainerClub.LeaveDate = trainerClubDto.LeaveDate;
                            currentTrainerClub.Role = trainerClubDto.Role;
                            currentTrainerClub.Description = trainerClubDto.Description;
                            currentTrainerClub.Name = trainerClubDto.Name;
                            currentTrainerClub.UpdatedAt = DateTime.Now;
                            pushTrainerClubs.Add(currentTrainerClub);
                        }
                    }
                }
                else
                {
                    foreach (var trainerClubDto in newTrainerClubs)
                    {
                        var newTrainerClub = new TrainerClub();
                        newTrainerClub.TrainerUserId = trainerClubDto.TrainerUserId;
                        newTrainerClub.Role = trainerClubDto.Role;
                        newTrainerClub.Description = trainerClubDto.Description;
                        newTrainerClub.LeaveDate = trainerClubDto.LeaveDate;
                        newTrainerClub.EntryDate = trainerClubDto.EntryDate;
                        newTrainerClub.Name = trainerClubDto.Name;
                        newTrainerClub.CreatedAt = DateTime.Now;
                        newTrainerClub.UpdatedAt = DateTime.Now;
                        pushTrainerClubs.Add(newTrainerClub);
                    }
                }  
                user.TrainerClubs = pushTrainerClubs;
            }

            // Trainer Licence Infos
            var newTrainerLicences = userDto.TrainerLicences;
            var oldTrainerLicences = user.TrainerLicences;
            var pushTrainerLicences = new List<TrainerLicence>();
            if (newTrainerLicences != null && newTrainerLicences.Count() != 0)
            {
                if(oldTrainerLicences != null && oldTrainerLicences.Count() != 0)
                {
                    foreach (var trainerLicenceDto in newTrainerLicences)
                    {
                        var currentTrainerLicence = oldTrainerLicences.FirstOrDefault(x => x.Id == trainerLicenceDto.Id);
                        if (currentTrainerLicence == null)
                        {
                            var newTrainerLicence = new TrainerLicence();
                            newTrainerLicence.TrainerUserId = trainerLicenceDto.TrainerUserId;
                            newTrainerLicence.Name = trainerLicenceDto.Name;
                            newTrainerLicence.Description = trainerLicenceDto.Description;
                            newTrainerLicence.LicenceDate = trainerLicenceDto.LicenceDate;
                            newTrainerLicence.CreatedAt = DateTime.Now;
                            newTrainerLicence.UpdatedAt = DateTime.Now;
                            pushTrainerLicences.Add(newTrainerLicence);
                        }
                        else
                        {
                            currentTrainerLicence.Name = trainerLicenceDto.Name;
                            currentTrainerLicence.Description = trainerLicenceDto.Description;
                            currentTrainerLicence.LicenceDate = trainerLicenceDto.LicenceDate;
                            currentTrainerLicence.UpdatedAt = DateTime.Now;
                            pushTrainerLicences.Add(currentTrainerLicence);
                        }
                    }
                }
                else
                {
                    foreach (var trainerLicenceDto in newTrainerLicences)
                    {
                        var newTrainerLicence = new TrainerLicence();
                        newTrainerLicence.TrainerUserId = trainerLicenceDto.TrainerUserId;
                        newTrainerLicence.Name = trainerLicenceDto.Name;
                        newTrainerLicence.Description = trainerLicenceDto.Description;
                        newTrainerLicence.LicenceDate = trainerLicenceDto.LicenceDate;
                        newTrainerLicence.CreatedAt = DateTime.Now;
                        newTrainerLicence.UpdatedAt = DateTime.Now;
                        pushTrainerLicences.Add(newTrainerLicence);
                    }
                }
            }


            // Trainer CanEdit Infos
            if (user.TrainerCanEdit != null)
            {
                user.TrainerCanEdit.CanAddTrainerUser = userDto.TrainerCanEdit.CanAddTrainerUser;
                user.TrainerCanEdit.CanEditTrainerUser = userDto.TrainerCanEdit.CanEditTrainerUser;
                user.TrainerCanEdit.CanDeleteTrainerUser = userDto.TrainerCanEdit.CanDeleteTrainerUser;
                user.TrainerCanEdit.CanAddMember = userDto.TrainerCanEdit.CanAddMember;
                user.TrainerCanEdit.CanEditMember = userDto.TrainerCanEdit.CanEditMember;
                user.TrainerCanEdit.CanDeleteMember = userDto.TrainerCanEdit.CanDeleteMember;
                user.TrainerCanEdit.CanAddTraining = userDto.TrainerCanEdit.CanAddTraining;
                user.TrainerCanEdit.CanDeleteTraining = userDto.TrainerCanEdit.CanDeleteTraining;
                user.TrainerCanEdit.CanEditTraining = userDto.TrainerCanEdit.CanEditTraining;
                user.TrainerCanEdit.CanDefineProgram = userDto.TrainerCanEdit.CanDefineProgram;
                user.TrainerCanEdit.IsFounder = userDto.TrainerCanEdit.IsFounder;
            }
            else
            {
                user.TrainerCanEdit = new TrainerCanEdit();
                user.TrainerCanEdit = _mapper.Map<TrainerCanEdit>(userDto.TrainerCanEdit);
            }


            var result = await _userManager.UpdateAsync(user);

            // Hata yoksa başarılı yanıt döndür
            if (result.Succeeded)
            {
                 return CustomResponseDto<TrainerUserWithDetailsDto>.Success(200, _mapper.Map<TrainerUserWithDetailsDto>(user));

            }

            //Hata varsa hata mesajlarıyla hata yanıtı döndür
            var errors = result.Errors.Select(x => x.Description).ToList();
            return CustomResponseDto<TrainerUserWithDetailsDto>.Fail(400, errors);
        }
    }
}
