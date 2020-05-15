using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Diplom.DataModels;
using Microsoft.AspNetCore.Http;
using Diplom.Services;
using Diplom.ViewModels;

namespace Diplom.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmergenciesController : ControllerBase
    {
        private readonly IEmergencyService _emergencyService;

        public EmergenciesController(IEmergencyService emergencyService)
        {
            _emergencyService = emergencyService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IEnumerable<Emergency>> GetAsync()
        {
            return await _emergencyService.ListAsync();
        }

        //[HttpGet("{EmergencyName}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<IEnumerable<Emergency>> GetAsync(string EmergencyName)
        //{
        //    return await _emergencyService.ListAsync(EmergencyName);
        //}

        [HttpGet("{emergencyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IEnumerable<Emergency>> GetAsync(int emergencyId)
        {
            return await _emergencyService.ListAsync(emergencyId);
        }

        [HttpGet("statistic")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<StatisticViewModel> GetStatisticAsync()
        {
            return await _emergencyService.GetStatisticAsync();
        }
    }
}
