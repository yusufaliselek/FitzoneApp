﻿using Microsoft.AspNetCore.Mvc;

namespace FitzoneWebApi.Controllers
{
    public class MemberController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
