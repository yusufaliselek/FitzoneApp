using Server.Core.DTOs;
using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface ITokenService
    {
        TokenDto CreateTrainerUserToken(TrainerUser trainerUser);

    }
}
