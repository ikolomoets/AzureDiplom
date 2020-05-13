using AutoMapper;
using Diplom.Data;
using Diplom.DataModels;
using Diplom.Helpers;
using Diplom.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Diplom.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly DiplomDatabaseContext _context;
        private readonly IMapper _mapper;


        public AccountsController(UserManager<AppUser> userManager, IMapper mapper, DiplomDatabaseContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _context.AppUserInfos.AddAsync(new AppUserInfo { IdentityId = userIdentity.Id, Location = model.Location });
            await _context.SaveChangesAsync();

            return new OkResult();
        }
    }
}
