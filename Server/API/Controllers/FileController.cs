using Core.DTOs;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FileController : CustomBaseController
    {
        private readonly IFileService _fileService;
        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

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

        private string ContentPath()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file, string fileId)
        {
            return ActionResultInstance(await _fileService.UploadFileAsync(file, fileId, ContentPath()));
        }

        [HttpGet]
        public IActionResult GetFileById(string fileId)
        {
            // Define the physical path to the file
            var filePath = Path.Combine(ContentPath(), fileId);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found.");
            }

            // Read the file content
            var fileBytes = System.IO.File.ReadAllBytes(filePath);

            var contentType = GetContentType(fileId);

            // Return the file as a FileResult
            return File(fileBytes, contentType, fileId);  
        }

        [HttpGet]
        public IActionResult GetFileById2(string fileId)
        {
            return ActionResultInstance(_fileService.GetFileById2(fileId, ContentPath()));
        }

        [HttpGet]
        public IActionResult GetFileById3(string fileId)
        {
            return ActionResultInstance(_fileService.GetFileById3(fileId, ContentPath()));
        }

    }
}
