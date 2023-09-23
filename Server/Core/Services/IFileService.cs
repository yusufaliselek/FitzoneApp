using Core.DTOs;
using Core.DTOs.FileDTOs;
using Core.DTOs.MemberDetailDTOs;
using Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
        public interface IFileService
        {
            Task<CustomResponseDto<ResponseFileDetailDto>> UploadFileAsync(IFormFile fileData, string fileId);
    }
    
}
