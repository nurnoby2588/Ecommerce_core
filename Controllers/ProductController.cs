using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_core.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
