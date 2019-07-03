using Microsoft.AspNetCore.Mvc;

namespace heartthrob_docs.Controllers
{
    public class BasicController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        public IActionResult Grids()
        {
            return View();
        }

        public IActionResult Css()
        {
            return View();
        }

        public IActionResult Layout()
        {
            return View();
        }

        public IActionResult Kendo()
        {
            return View();
        }
    }
}