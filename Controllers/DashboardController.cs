using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diplom.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        public DashboardController()
        {

        }

        // GET api/dashboard/home
        [HttpGet("home")]
        public IActionResult GetHome()
        {
            return new OkObjectResult(new { Message = "This is secure data!" });
        }
    }
}
