using Microsoft.AspNetCore.Mvc;

namespace Heartthrob.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}