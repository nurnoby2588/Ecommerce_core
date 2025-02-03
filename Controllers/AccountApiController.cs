using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_core.Controllers
{
    public class AccountApiController : Controller
    {
        public IActionResult verifyUser(string userName, string password)
        {
            if (userName == "nurnoby" && password == "123456")
            {
                return Ok("success");
            }
            else
            {
                return Unauthorized(new {message = "Unauthorize access"});
            }
           
        }
    }
}
