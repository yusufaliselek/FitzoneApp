using Microsoft.AspNetCore.Mvc;

namespace FitzoneWebApi.Controllers
{
    public class CoachController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
