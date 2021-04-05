using Microsoft.AspNetCore.Mvc;

namespace StandBy.Controllers
{
    public class ClienteController : Controller
    {
        public IActionResult Lista()
        {
            return View();
        }
    }
}