﻿using Core.DTOs;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Server.Core.DTOs;

namespace API.Filters
{
    public class ValidateFilterAttribute : ActionFilterAttribute
    {

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var errors = context.ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();

                context.Result = new BadRequestObjectResult(CustomResponseDto<NoContentDto>.Fail(400, errors));


            }
        }
    }
}