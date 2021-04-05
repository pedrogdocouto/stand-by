using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using StandBy.Models;

namespace StandBy.Controllers
{
    public class PrincipalController : Controller
    {
        public IActionResult Inicio()
        {
            return View();
        }

        public IActionResult Privacidade()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult _Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }
    }
}