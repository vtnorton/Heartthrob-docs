using Heartthrob.Data;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;

namespace Heartthrob.Controllers
{
    public class KendoController : Controller
    {
        private readonly ApplicationDbContext _context;
        public KendoController(ApplicationDbContext context)
        {
            _context = context;
        }
        [Route("Kendo/Grids")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("Kendo/Inputs")]
        public IActionResult Inputs()
        {
            return View();
        }

        public IActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            var cnae = _context.Customer;
            return Json(cnae.ToDataSourceResult(request));
        }
        public IActionResult HierarchyBinding_Employees([DataSourceRequest] DataSourceRequest request)
        {
            var cnae = _context.Customer;
            return Json(cnae.ToDataSourceResult(request));
        }
        public IActionResult HierarchyBinding_Orders([DataSourceRequest] DataSourceRequest request)
        {
            var cnae = _context.Customer;
            return Json(cnae.ToDataSourceResult(request));
        }
    }
}