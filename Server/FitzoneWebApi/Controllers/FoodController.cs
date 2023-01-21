using Microsoft.AspNetCore.Mvc;

namespace FitzoneWebApi.Controllers
{
    public class FoodController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
