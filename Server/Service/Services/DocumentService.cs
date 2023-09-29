using Core.DTOs;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Services;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly UserManager<User> _userManager;
        private readonly IGenericService<Document> _documentService;

        public DocumentService(UserManager<User> userManager, IGenericService<Document> documentService)
        {
            _userManager = userManager;
            _documentService = documentService;
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

        public async Task<CustomResponseDto<string>> UploadDocumentAsync(IFormFile file, string fileId, string path)
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

        public IActionResult GetDocumentById(string fileId, string path)
        {
            var filePath = Path.Combine(path, fileId);

            if (!File.Exists(filePath))
            {
                return new NotFoundResult();
            }

            var contentType = GetContentType(fileId);

            return new PhysicalFileResult(filePath, contentType);
        }


        // Trainer Document Service //
        public async Task<CustomResponseDto<string>> CreateTrainerPhotoAsync(IFormFile file, string trainerId, string path)
        {
            if (file == null || file.Length == 0 || trainerId == null)
            {
                return CustomResponseDto<string>.Fail(400, "Dosya boş olamaz");
            }
            var contentType = GetContentType(file.FileName);
            if (contentType != "image/jpeg" && contentType != "image/png" && contentType != "image/jpg")
            {
                return CustomResponseDto<string>.Fail(400, "Dosya türü desteklenmiyor");
            }

            var fileName = $"{trainerId}{Path.GetExtension(file.FileName)}";
            var trainer = await _userManager.FindByIdAsync(trainerId);
            if (trainer == null)
            {
                return CustomResponseDto<string>.Fail(404, "Antrenör bulunamadı");
            }

            var filePath = Path.Combine(path, fileName);
            if (!File.Exists(filePath))
            {
                   Directory.CreateDirectory(path);
            }
            var documentId = Guid.NewGuid().ToString();
            var document = new Document
            {
                Id = documentId,
                Name = fileName,
                Path = filePath,
                ContentType = contentType,
            };
            await _documentService.AddAsync(document);
            trainer.PhotoId = documentId;
            await _userManager.UpdateAsync(trainer);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return CustomResponseDto<string>.Success(200, documentId);
        }

        public async Task<IActionResult> GetTrainerPhotoByIdAsync(string trainerId, string path)
        {
            var trainer = await _userManager.FindByIdAsync(trainerId);
            if (trainer == null)
            {
                return new NotFoundResult();
            }
            var photoId = trainer.PhotoId;
            var document = await _documentService.GetByIdAsync(photoId);
            if (document == null)
            {
                trainer.PhotoId = null;
                await _userManager.UpdateAsync(trainer);
                return new NotFoundResult();
            }
            var filePath = Path.Combine(path, document.Name);
            if (!File.Exists(filePath))
            {
                trainer.PhotoId = null;
                await _userManager.UpdateAsync(trainer);
                return new NotFoundResult();
            }
            return new PhysicalFileResult(filePath, document.ContentType);
        }

        public async Task<CustomResponseDto<string>> UpdateTrainerPhotoAsync(IFormFile file, string trainerId, string path)
        {
            if (file == null || file.Length == 0 || trainerId == null)
            {
                return CustomResponseDto<string>.Fail(400, "Dosya boş olamaz");
            }
            var contentType = GetContentType(file.FileName);
            if (contentType != "image/jpeg" && contentType != "image/png" && contentType != "image/jpg")
            {
                return CustomResponseDto<string>.Fail(400, "Dosya türü desteklenmiyor");
            }
            var trainer = await _userManager.FindByIdAsync(trainerId);
            if (trainer == null)
            {
                return CustomResponseDto<string>.Fail(404, "Antrenör bulunamadı");
            }
            var photoId = trainer.PhotoId;
            var document = await _documentService.GetByIdAsync(photoId);
            if (document == null)
            {
                return CustomResponseDto<string>.Fail(404, "Fotoğraf bulunamadı");
            }
            var filePath = Path.Combine(path, document.Name);
            if (!File.Exists(filePath))
            {
                return CustomResponseDto<string>.Fail(404, "Fotoğraf bulunamadı");
            }
            var fileName = $"{trainerId}{Path.GetExtension(file.FileName)}";
            var newFilePath = Path.Combine(path, fileName);
            if (!File.Exists(newFilePath))
            {
                Directory.CreateDirectory(path);
            }
            document.Name = fileName;
            document.Path = newFilePath;
            document.ContentType = contentType;
            await _documentService.UpdateAsync(document);
            return CustomResponseDto<string>.Success(200, document.Id);
        }

        public async Task<CustomResponseDto<string>> DeleteTrainerPhotoAsync(string trainerId, string path)
        {
            if (trainerId == null)
            {
                return CustomResponseDto<string>.Fail(400, "Antrenör Id'si boş olamaz");
            }
            var trainer = await _userManager.FindByIdAsync(trainerId);
            if (trainer == null)
            {
                return CustomResponseDto<string>.Fail(404, "Antrenör bulunamadı");
            }
            var photoId = trainer.PhotoId;
            var document = await _documentService.GetByIdAsync(photoId);
            if (document == null)
            {
                return CustomResponseDto<string>.Fail(404, "Fotoğraf bulunamadı");
            }
            var filePath = Path.Combine(path, document.Name);
            if (!File.Exists(filePath))
            {
                return CustomResponseDto<string>.Fail(404, "Fotoğraf bulunamadı");
            }
            File.Delete(filePath);
            await _documentService.RemoveAsync(document);
            trainer.PhotoId = null;
            await _userManager.UpdateAsync(trainer);
            return CustomResponseDto<string>.Success(200, "Fotoğraf başarıyla silindi");

        }

        // *Trainer Document Service* //
    }
}
