using Core.DTOs;
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
        private string GetContentType(string fileName)
        {
            var type = "." + fileName.Split('.').LastOrDefault();
            switch (type)
            {
                case ".pdf":
                    return "application/pdf";
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".png":
                    return "image/png";
                case ".mp4":
                    return "video/mp4";
                case ".mp3":
                    return "audio/mp3";
                case ".docx":
                    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                case ".xlsx":
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                case ".pptx":
                    return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                case ".txt":
                    return "text/plain";
                case ".zip":
                    return "application/zip";
                case ".rar":
                    return "application/x-rar-compressed";
                default:
                    return "application/octet-stream";
            }
        }

        public async Task<CustomResponseDto<string>> UploadFileAsync(IFormFile file, string fileId, string path)
        {
            if (file == null || file.Length == 0 || fileId == null)
            {
                return CustomResponseDto<string>.Fail(400, "File is empty");
            }
            var fileName = $"{fileId}{Path.GetExtension(file.FileName)}";

            var filePath = Path.Combine(path, fileName);

            Directory.CreateDirectory(path);

            // Create a FileStream to write the file to the specified path
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return CustomResponseDto<string>.Success(200, fileName);

        }

        public IActionResult GetFileById(string fileId, string path)
        {
            var filePath = Path.Combine(path, fileId);

            if (!File.Exists(filePath))
            {
                return new NotFoundResult();
            }

            var contentType = GetContentType(fileId);

            return new PhysicalFileResult(filePath, contentType);
        }

        public CustomResponseDto<PhysicalFileResult> GetFileById2(string fileId, string path)
        {
            var filePath = Path.Combine(path, fileId);

            var contentType = GetContentType(fileId);

            if (contentType == null)
            {
                return CustomResponseDto<PhysicalFileResult>.Fail(400, "File not found");
            }

            if (!File.Exists(filePath))
            {
                return CustomResponseDto<PhysicalFileResult>.Fail(400, "File not found");
            }

            return CustomResponseDto<PhysicalFileResult>.Success(200, new PhysicalFileResult(filePath, contentType));
        }

        public CustomResponseDto<IActionResult> GetFileById3(string fileId, string path)
        {
            var filePath = Path.Combine(path, fileId);

            var contentType = GetContentType(fileId);

            if (contentType == null)
            {
                return CustomResponseDto<IActionResult>.Fail(400, "File not found");
            }

            if (!File.Exists(filePath))
            {
                return CustomResponseDto<IActionResult>.Fail(400, "File not found");
            }

            return CustomResponseDto<IActionResult>.Success(200, new FileStreamResult(new FileStream(filePath, FileMode.Open, FileAccess.Read), contentType));
        }
    }
}
