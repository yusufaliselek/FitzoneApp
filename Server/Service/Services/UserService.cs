using AutoMapper;
using Core.DTOs;
using Core.DTOs.TrainerUserDTOs;
using Core.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Services;
<<<<<<< HEAD
=======
using Server.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
>>>>>>> 30a289e61f5cef803b73e7a62669c2360f635691

namespace Server.Service.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<TrainerUser> _userManager;
<<<<<<< HEAD
        private readonly ITrainerUserRepository _trainerUserRepository;
        private readonly IMapper _mapper;
        public UserService(UserManager<TrainerUser> userManager, IMapper mapper, ITrainerUserRepository trainerUserRepository)
        {
            _userManager = userManager;
            _mapper = mapper;
            _trainerUserRepository = trainerUserRepository;
=======
        private readonly ITrainerUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService(UserManager<TrainerUser> userManager, IMapper mapper, 
            ITrainerUserRepository userRepository
            )
        {
            _userManager = userManager;
            _mapper = mapper;
            _userRepository = userRepository;
>>>>>>> 30a289e61f5cef803b73e7a62669c2360f635691
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

            var user = await _userRepository.GetTrainerWithDetailsAsync(userWithoutDetails.Id);

            return CustomResponseDto<TrainerUserWithDetailsDto>.Success(200, _mapper.Map<TrainerUserWithDetailsDto>(user));
        }

        public async Task<CustomResponseDto<List<TrainerUserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var usersDto = _mapper.Map<List<TrainerUserDto>>(users);
            return CustomResponseDto<List<TrainerUserDto>>.Success(200, usersDto);
        }

<<<<<<< HEAD
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
=======
        public async Task<CustomResponseDto<TrainerUserWithDetailsDto>> UpdateUser(TrainerUserWithDetailsDto userDto)
        {
            var user = await _userRepository.GetTrainerWithDetailsAsync(userDto.Id);
            if (user == null)
            {
                return CustomResponseDto<TrainerUserWithDetailsDto>.Fail(404, "User not found");
            }
            // Trainer Basic Infos
            user.Biography = userDto.Biography;
            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Email = userDto.Email;
            user.PhoneNumber = userDto.PhoneNumber;
            user.TCKN = userDto.TCKN;
            user.Gender = userDto.Gender;
            user.UserName = userDto.UserName;
            user.Location = userDto.Location;
            user.Qualification = userDto.Qualification;
            user.BirthdayDate = userDto.BirthdayDate;
            user.PersonalPhoto = userDto.PersonalPhoto;
            user.UpdatedAt = DateTime.Now;

            // Trainer Licence Infos
            var trainerLicences = user.TrainerLicences;
            if (trainerLicences!= null)
            {
                foreach (var trainerLicenceDto in trainerLicences)
                {
                    var trainerLicence = trainerLicences.FirstOrDefault(x => x.Id == trainerLicenceDto.Id);
                    if (trainerLicence == null)
                    {
                        trainerLicence = new TrainerLicence();
                        trainerLicences.Add(trainerLicence);
                    }

                    trainerLicence.Name = trainerLicenceDto.Name;
                    trainerLicence.LicenceDate = trainerLicenceDto.LicenceDate;
                    trainerLicence.Description = trainerLicenceDto.Description;
                    trainerLicence.UpdatedAt = DateTime.Now;
                }
            }
            else
            {
                trainerLicences = new List<TrainerLicence>(_mapper.Map<List<TrainerLicence>>(userDto.TrainerLicences));
            }
            user.TrainerLicences = trainerLicences;
>>>>>>> 30a289e61f5cef803b73e7a62669c2360f635691


            // Trainer Club Infos
            var trainerClubs = user.TrainerClubs;
            if (trainerClubs != null)
            {
                foreach (var trainerClubDto in trainerClubs)
                {
                    var trainerClub = trainerClubs.FirstOrDefault(x => x.Id == trainerClubDto.Id);
                    if (trainerClub == null) 
                    {
                        trainerClub= new TrainerClub();
                        trainerClubs.Add(trainerClub);
                    }

                    trainerClub.EntryDate = trainerClubDto.EntryDate;
                    trainerClub.LeaveDate = trainerClubDto.LeaveDate;
                    trainerClub.Role = trainerClubDto.Role;
                    trainerClub.Description = trainerClubDto.Description;
                    trainerClub.Name = trainerClubDto.Name;
                    trainerClub.UpdatedAt = DateTime.Now;
                }
            }
            else
            {
                trainerClubs= new List<TrainerClub>(_mapper.Map<List<TrainerClub>>(userDto.TrainerClubs));
            }
            user.TrainerClubs = trainerClubs;

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
<<<<<<< HEAD
                 return CustomResponseDto<TrainerUserWithDetailsDto>.Success(200, _mapper.Map<TrainerUserWithDetailsDto>(userDetail));
=======
                return CustomResponseDto<TrainerUserWithDetailsDto>.Success(200, _mapper.Map<TrainerUserWithDetailsDto>(user));
>>>>>>> 30a289e61f5cef803b73e7a62669c2360f635691
            }

            //Hata varsa hata mesajlarıyla hata yanıtı döndür
            var errors = result.Errors.Select(x => x.Description).ToList();
            return CustomResponseDto<TrainerUserWithDetailsDto>.Fail(400, errors);
        }
    }
}
