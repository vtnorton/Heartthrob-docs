using Microsoft.AspNetCore.Mvc;

namespace Heartthrob.Controllers
{
    public class LayoutController : Controller
    {
        [Route("/Layout/Cards")]
        public IActionResult Cards()
        {
            return View();
        }

        [Route("/Layout/Dialogs")]
        public IActionResult Dialogs()
        {
            return View();
        }

        [Route("/Layout/Header")]
        public IActionResult Header()
        {
            return View();
        }

        [Route("/Layout/Menus")]
        public IActionResult Menus()
        {
            return View();
        }

        [Route("/Layout/Navigation")]
        public IActionResult Navigation()
        {
            return View();
        }
    }
}