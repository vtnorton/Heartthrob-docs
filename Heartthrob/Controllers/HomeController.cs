using Microsoft.AspNetCore.Mvc;

namespace Heartthrob.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route("/pure/Classes")]
        public IActionResult Classes()
        {
            return View();
        }

        [Route("/pure/Buttons")]
        public IActionResult Buttons()
        {
            return View();
        }

        [Route("/pure/Inputs")]
        public IActionResult Inputs()
        {
            return View();
        }
    }
}
