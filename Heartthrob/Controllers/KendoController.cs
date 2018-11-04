using Heartthrob.Entities;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Heartthrob.Controllers
{
    public class KendoController : Controller
    {
        [Route("Kendo/Grids")]
        public IActionResult Index()
        {
            return View();
        }
        [Route("Kendo/Dialogs")]
        public IActionResult Dialogs()
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
            var model = new List<Customer>()
            {
                new Customer()
                {
                    CustomerID = "ALFKI",
                    CompanyName ="Alfreds Futterkiste",
                    ContactName = "Maria Anders",
                    ContactTitle = "Sales Representative",
                    Address = "Obere Str. 57"
                },
                new Customer()
                {
                    CustomerID = "ANATR",
                    CompanyName ="Ana Trujillo Emparedados y helados",
                    ContactName = "Ana Trujillo",
                    ContactTitle = "Owner",
                    Address = "Avda. de la Constitución 2222"
                },
                new Customer()
                {
                    CustomerID = "ANTON",
                    CompanyName ="Antonio Moreno Taquería",
                    ContactName = "Antonio Moreno",
                    ContactTitle = "Owner",
                    Address = "Mataderos  2312"
                },
                new Customer()
                {
                    CustomerID = "CHOPS",
                    CompanyName ="Chop-suey Chinese",
                    ContactName = "Yang Wang",
                    ContactTitle = "Owner",
                    Address = "Hauptstr. 29"
                },
                new Customer()
                {
                    CustomerID = "DRACD",
                    CompanyName ="Drachenblut Delikatessen",
                    ContactName = "Sven Ottlieb",
                    ContactTitle = "Sales",
                    Address = "Obere"
                },
                new Customer()
                {
                    CustomerID = "EASTC",
                    CompanyName ="Eastern Connection",
                    ContactName = "Ann Devon",
                    ContactTitle = "Sales",
                    Address = "Obere"
                },
                new Customer()
                {
                    CustomerID = "FISSA",
                    CompanyName ="FISSA Fabrica Inter. Salchichas S.A.",
                    ContactName = "Diego Roel",
                    ContactTitle = "Sales",
                    Address = "Obere"
                }
            };
            return Json(model.ToDataSourceResult(request));
    }
    public IActionResult HierarchyBinding_Employees([DataSourceRequest] DataSourceRequest request)
    {
            var model = new List<Customer>()
            {
                new Customer()
                {
                    CustomerID = "ALFKI",
                    CompanyName ="Alfreds Futterkiste",
                    ContactName = "Maria Anders",
                    ContactTitle = "Sales Representative",
                    Address = "Obere Str. 57"
                },
                new Customer()
                {
                    CustomerID = "ANATR",
                    CompanyName ="Ana Trujillo Emparedados y helados",
                    ContactName = "Ana Trujillo",
                    ContactTitle = "Owner",
                    Address = "Avda. de la Constitución 2222"
                },
                new Customer()
                {
                    CustomerID = "ANTON",
                    CompanyName ="Antonio Moreno Taquería",
                    ContactName = "Antonio Moreno",
                    ContactTitle = "Owner",
                    Address = "Mataderos  2312"
                },
                new Customer()
                {
                    CustomerID = "CHOPS",
                    CompanyName ="Chop-suey Chinese",
                    ContactName = "Yang Wang",
                    ContactTitle = "Owner",
                    Address = "Hauptstr. 29"
                },
                new Customer()
                {
                    CustomerID = "DRACD",
                    CompanyName ="Drachenblut Delikatessen",
                    ContactName = "Sven Ottlieb",
                    ContactTitle = "Sales",
                    Address = "Obere"
                },
                new Customer()
                {
                    CustomerID = "EASTC",
                    CompanyName ="Eastern Connection",
                    ContactName = "Ann Devon",
                    ContactTitle = "Sales",
                    Address = "Obere"
                },
                new Customer()
                {
                    CustomerID = "FISSA",
                    CompanyName ="FISSA Fabrica Inter. Salchichas S.A.",
                    ContactName = "Diego Roel",
                    ContactTitle = "Sales",
                    Address = "Obere"
                }
            };
            return Json(model.ToDataSourceResult(request));
    }
    public IActionResult HierarchyBinding_Orders([DataSourceRequest] DataSourceRequest request)
    {
            var model = new List<Customer>()
            {
                new Customer()
                {
                    CustomerID = "ALFKI",
                    CompanyName ="Alfreds Futterkiste",
                    ContactName = "Maria Anders",
                    ContactTitle = "Sales Representative",
                    Address = "Obere Str. 57"
                },
                new Customer()
                {
                    CustomerID = "ANATR",
                    CompanyName ="Ana Trujillo Emparedados y helados",
                    ContactName = "Ana Trujillo",
                    ContactTitle = "Owner",
                    Address = "Avda. de la Constitución 2222"
                },
                new Customer()
                {
                    CustomerID = "ANTON",
                    CompanyName ="Antonio Moreno Taquería",
                    ContactName = "Antonio Moreno",
                    ContactTitle = "Owner",
                    Address = "Mataderos  2312"
                },
                new Customer()
                {
                    CustomerID = "CHOPS",
                    CompanyName ="Chop-suey Chinese",
                    ContactName = "Yang Wang",
                    ContactTitle = "Owner",
                    Address = "Hauptstr. 29"
                },
                new Customer()
                {
                    CustomerID = "DRACD",
                    CompanyName ="Drachenblut Delikatessen",
                    ContactName = "Sven Ottlieb",
                    ContactTitle = "Sales",
                    Address = "Obere"
                },
                new Customer()
                {
                    CustomerID = "EASTC",
                    CompanyName ="Eastern Connection",
                    ContactName = "Ann Devon",
                    ContactTitle = "Sales",
                    Address = "Obere"
                },
                new Customer()
                {
                    CustomerID = "FISSA",
                    CompanyName ="FISSA Fabrica Inter. Salchichas S.A.",
                    ContactName = "Diego Roel",
                    ContactTitle = "Sales",
                    Address = "Obere"
                }
            };
            return Json(model.ToDataSourceResult(request));
    }
}
}