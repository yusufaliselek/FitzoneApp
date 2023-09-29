using Core.DTOs;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : CustomBaseController
    {
        private readonly IDocumentService _documentService;
        public FileController(IDocumentService fileService)
        {
            _documentService = fileService;
        }

        private string GetContentType(string fileName)
        {
            var type = "." + fileName.Split('.').LastOrDefault();
            switch (type)
            {
                case ".pdf":
                    return "application/pdf";
                case ".jpg":
                    return "image/jpg";
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
            return ActionResultInstance(await _documentService.UploadDocumentAsync(file, fileId, ContentPath()));
        }

        [HttpGet("{fileId}")]
        public IActionResult GetFileById(string fileId)
        {
            // check the origin of the request
            if (Request.Host.Value == "http://localhost:3000")
            {
                return _documentService.GetDocumentById(fileId, ContentPath());
            }
            else
            {
                return Unauthorized();
            }
        }

    }
}
