using Core.DTOs;
using Core.DTOs.FileDTOs;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Server.Core.Services;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class FileService : IFileService
    {
        private readonly IGenericService<FileDetail> _genericService;
        public FileService(IGenericService<FileDetail> genericService)
        {
            _genericService = genericService;
        }

        public async Task<CustomResponseDto<ResponseFileDetailDto>> UploadFileAsync(IFormFile file, string fileId)
        {
            if (file != null && file.Length == 0) 
            { 
                return CustomResponseDto<ResponseFileDetailDto>.Fail(404, "File can not be empty!");
            }

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var fileDetail = new FileDetail
                {
                    Id = fileId,
                    FileName = file.FileName,
                    ContentType = file.ContentType,
                    Content = memoryStream.ToArray()
                };
                await _genericService.AddAsync(fileDetail);
                return CustomResponseDto<ResponseFileDetailDto>.Success(200, new ResponseFileDetailDto
                {
                    Data = fileDetail.Content,
                    Message = "File uploaded successfully!",
                    Success = true
                }, 200);
            }
        }
    }
}
