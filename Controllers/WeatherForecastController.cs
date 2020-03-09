using System;
using System.Collections.Generic;
using System.Linq;
using Diplom.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Diplom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ITestingDataRepository _dataRepository;


        public WeatherForecastController(ILogger<WeatherForecastController> logger, ITestingDataRepository dataRepository)
        {
            _logger = logger;
            _dataRepository = dataRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<WeatherForecast>> GetAsync()
        {
            var all = await _dataRepository.List();
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = all.FirstOrDefault().Name
            })
            .ToArray();
        }
    }
}
