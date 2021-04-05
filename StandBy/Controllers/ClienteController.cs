using Microsoft.AspNetCore.Mvc;

namespace StandBy.Controllers
{
    public class ClienteController : Controller
    {
        public IActionResult Cadastro()
        {
            return View();
        }

        public IActionResult Lista()
        {
            return View();
        }
    }
}