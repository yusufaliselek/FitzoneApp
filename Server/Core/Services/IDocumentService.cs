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
        public interface IDocumentService
        {
            // Trainer Document Service
            Task<CustomResponseDto<string>> CreateTrainerPhotoAsync(IFormFile file, string trainerId, string path);
            Task<IActionResult> GetTrainerPhotoByIdAsync(string trainerId, string path);
            Task<CustomResponseDto<string>> UpdateTrainerPhotoAsync(IFormFile file, string trainerId, string path);
            Task<CustomResponseDto<string>> DeleteTrainerPhotoAsync(string trainerId, string path);

            Task<CustomResponseDto<string>> UploadDocumentAsync(IFormFile file, string fileId, string path); // Dönüş tipleri
            IActionResult GetDocumentById(string fileId, string path);
        }
    
}
