using Ecommerce_core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_core.Controllers
{
    public class AccountApiController : Controller
    {
        [HttpPost]
        public IActionResult verifyUser(Account modelAccount)
        {
            if (modelAccount.UserName == "nurnoby" && modelAccount.Password == "123456")
            {
                return Ok("success");
            }
            else
            {
                return Unauthorized( "Unauthorize access");
            }
           
        }
    }
}
