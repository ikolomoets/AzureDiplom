using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Diplom.DataModels;
using Microsoft.AspNetCore.Http;
using Diplom.Services;
using System;

namespace Diplom.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventsController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IEnumerable<Event>> GetAsync()
        {
            return await _eventService.ListAsync();
        }

        [HttpGet("{eventName}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IEnumerable<Event>> GetAsync(string eventName)
        {
            return await _eventService.ListAsync(eventName);
        }

        [HttpGet("dates/{date}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IEnumerable<Event>> GetAsync(DateTime date)
        {
            return await _eventService.ListAsync(date);
        }

        [HttpGet("dates")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<List<DateTime?>> GetDatesAsync()
        {
            return await _eventService.DatesListAsync();
        }

        // PUT: api/update/Event
        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> UpdateEventAsync([FromBody] Event @event)
        {
            var result = await _eventService.UpdateEventAsync(@event);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok();
        }

        // POST: api/add/Event
        [HttpPost("add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> AddEventAsync([FromBody] Event @event)
        {
            var result = await _eventService.AddEventAsync(@event);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok();
        }
    }
}
