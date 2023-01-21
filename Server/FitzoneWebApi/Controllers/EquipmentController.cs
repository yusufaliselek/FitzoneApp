using Microsoft.AspNetCore.Mvc;

namespace FitzoneWebApi.Controllers
{
    public class EquipmentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
