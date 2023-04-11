using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Core.Configuration;
using Server.Core.DTOs;
using Server.Core.Models;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<TrainerUser> _userManager;
        private readonly CustomTokenOption _tokenOption;
        public TokenService(IOptions<CustomTokenOption> options, UserManager<TrainerUser> userManager)
        {
            _tokenOption = options.Value;
            _userManager = userManager;
        }

        private string CreateRefreshToken()
        {
            var numberByte = new Byte[32];
            using var rnd = RandomNumberGenerator.Create();
            rnd.GetBytes(numberByte);
            return Convert.ToBase64String(numberByte);
        }

        private IEnumerable<Claim> GetClaims(TrainerUser userApp, List<String> audiences)
        {
            var userList = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userApp.Id),
                new Claim(JwtRegisteredClaimNames.Email, userApp.Email),
                new Claim(JwtRegisteredClaimNames.UniqueName, userApp.UserName),
                new Claim(JwtRegisteredClaimNames.GivenName, userApp.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, userApp.LastName),
                new Claim(JwtRegisteredClaimNames.Iat, userApp.Biography),  // asıl amacını bilmiyorum sadece göstermelik fotoğrafı saklıyorum.
                new Claim(JwtRegisteredClaimNames.Acr, userApp.PersonalPhoto),  // asıl amacını bilmiyorum sadece göstermelik fotoğrafı saklıyorum.
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            userList.AddRange(audiences.Select(x => new Claim(JwtRegisteredClaimNames.Aud, x)));

            return userList;
        }

        public TokenDto CreateToken(TrainerUser userApp)
        {
            var accessTokenExpiration = DateTime.Now.AddMinutes(_tokenOption.AccessTokenExpiration);
            var refreshTokenExpiration = DateTime.Now.AddMinutes(_tokenOption.RefreshTokenExpiration);

            var securityKey = SignService.GetSymmetricSecurityKey(_tokenOption.SecurityKey);

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(
                    issuer: _tokenOption.Issuer,
                    expires: accessTokenExpiration,
                    notBefore: DateTime.Now,
                    claims: GetClaims(userApp, _tokenOption.Audience),
                    signingCredentials: signingCredentials
                );

            var handler = new JwtSecurityTokenHandler();

            var token = handler.WriteToken(jwtSecurityToken);

            var tokenDto = new TokenDto
            {
                AccessToken = token,
                RefreshToken = CreateRefreshToken(),
                AccessTokenExpiration = accessTokenExpiration,
                RefreshTokenExpiration = refreshTokenExpiration
            };

            return tokenDto;
        }
    }
}
