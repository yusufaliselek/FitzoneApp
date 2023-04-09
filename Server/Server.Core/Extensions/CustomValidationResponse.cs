using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Server.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Extensions
{
    public static class CustomValidationResponse
    {
        public static void UseCustomValidationResponse(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                // fluent validation kütüphanesinin response'unu ezip kendi custom response'umuzu dönüyoruz
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState.Values.Where(x => x.Errors.Count > 0).SelectMany(x => x.Errors).Select(x => x.ErrorMessage);   // hata mesajlarını alıyoruz.

                    ErrorDto errorDto = new ErrorDto(errors.ToList(), true);

                    var response = Response<NoContentResult>.Fail(errorDto, 400);

                    return new BadRequestObjectResult(response); // -> ObjectResult hem bad rq hemde içerisinde data gönderir.
                    // BadRequestResult ise sadece bad rq döndürür.
                };
            });
        }
    }
}
