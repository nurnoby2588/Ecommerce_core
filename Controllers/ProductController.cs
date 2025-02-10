using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_core.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Checkout()
        {
            return View();
        }
        public IActionResult SingleProduct(int id)
        {
            ViewBag.ProductId=id;
            return View();
        }
    }
}
