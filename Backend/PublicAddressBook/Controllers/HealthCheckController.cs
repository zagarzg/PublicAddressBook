using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicAddressBook.Controllers
{
    public class HealthCheckController : BaseController
    {
        [HttpGet]
        public IActionResult Ping()
        {
            return Ok("Healthy");
        }
    }
}
