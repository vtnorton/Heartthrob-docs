using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Heartthrob.Controllers
{
    public class ScriptsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}