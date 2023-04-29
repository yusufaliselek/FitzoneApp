using Core.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Server.Core.DTOs;
using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Services;
using Server.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace  Service.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<TrainerUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<UserRefreshToken> _userRefreshTokenService;
        public AuthenticationService(ITokenService tokenService, UserManager<TrainerUser> userManager, IUnitOfWork unitOfWork, IGenericRepository<UserRefreshToken> userRefreshTokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _userRefreshTokenService = userRefreshTokenService;
        }

        public async Task<CustomResponseDto<TokenDto>> CreateTokenAsync(LoginDto loginDto)
        {
            if (loginDto == null) throw new ArgumentNullException(nameof(loginDto));

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return CustomResponseDto<TokenDto>.Fail(400, "Email or Password is wrong!");

            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return CustomResponseDto<TokenDto>.Fail(400, "Email or Password is wrong!");
            }

            var token = _tokenService.CreateToken(user);

            var userRefreshToken = await _userRefreshTokenService.Where(x => x.UserId == user.Id).SingleOrDefaultAsync();

            if (userRefreshToken == null)
            {
                await _userRefreshTokenService.AddAsync(new UserRefreshToken { UserId = user.Id, Code = token.RefreshToken, Expiration = token.RefreshTokenExpiration });
            }
            else
            {
                userRefreshToken.Code = token.RefreshToken;
                userRefreshToken.Expiration = token.RefreshTokenExpiration;
            }

            await _unitOfWork.CommitAsync();

            return CustomResponseDto<TokenDto>.Success(200, token);
        }

        public async Task<CustomResponseDto<TokenDto>> CreateTokenByRefreshToken(string refreshToken)
        {
            var existRefreshToken = await _userRefreshTokenService.Where(x => x.Code == refreshToken).SingleOrDefaultAsync();
            if (existRefreshToken == null)
            {
                return CustomResponseDto<TokenDto>.Fail(404, "Refresh token not found");
            }

            var user = await _userManager.FindByIdAsync(existRefreshToken.UserId);

            if (user == null)
            {
                return CustomResponseDto<TokenDto>.Fail(404, "User not found");
            }

            var tokenDto = _tokenService.CreateToken(user);

            existRefreshToken.Code = tokenDto.RefreshToken;
            existRefreshToken.Expiration = tokenDto.RefreshTokenExpiration;

            await _unitOfWork.CommitAsync();

            return CustomResponseDto<TokenDto>.Success(200, tokenDto);
        }

        public async Task<CustomResponseDto<NoContentDto>> RevokeRefreshToken(string refreshToken)
        {
            var existRefreshToken = await _userRefreshTokenService.Where(x => x.Code == refreshToken).SingleOrDefaultAsync();
            if (existRefreshToken == null)
            {
                return CustomResponseDto<NoContentDto>.Fail(404, "Refresh token not found");
            }

            _userRefreshTokenService.Remove(existRefreshToken);

            await _unitOfWork.CommitAsync();
            return CustomResponseDto<NoContentDto>.Success(200);
        }
    }
}
