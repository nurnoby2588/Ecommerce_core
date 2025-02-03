using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_core.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
    }
}
