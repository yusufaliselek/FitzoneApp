using Core.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
        public interface IFileService
        {
            Task<CustomResponseDto<string>> UploadFileAsync(IFormFile file, string fileId, string path); // Dönüş tipleri
            CustomResponseDto<IActionResult> GetFileById(string fileId, string path);
            CustomResponseDto<PhysicalFileResult> GetFileById2(string fileId, string path);
            CustomResponseDto<IActionResult> GetFileById3(string fileId, string path);
        }
    
}
