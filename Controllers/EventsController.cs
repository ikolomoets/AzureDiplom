using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Diplom.DataModels;
using Microsoft.AspNetCore.Http;
using Diplom.Services;
using System;
using Microsoft.AspNetCore.Authorization;
using Diplom.ViewModels;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

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

        //[HttpGet("{eventName}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<IEnumerable<Event>> GetAsync(string eventName)
        //{
        //    return await _eventService.ListAsync(eventName);
        //}

        [HttpGet("{eventId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IEnumerable<Event>> GetAsync(int eventId)
        {
            return await _eventService.ListAsync(eventId);
        }

        [HttpGet("dates/{date}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IEnumerable<Event>> GetAsync(DateTime date)
        {
            return await _eventService.ListAsync(date);
        }

        [HttpGet("{date}/{emergencyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IEnumerable<Event>> GetAsync(DateTime date, int emergencyId)
        {
            return await _eventService.ListAsync(date, emergencyId);
        }

        [HttpGet("dates")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<List<DateTime?>> GetDatesAsync()
        {
            return await _eventService.DatesListAsync();
        }

        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> UpdateEventAsync([FromBody] JObject jEventDTO)
        {
            JsonSerializer serializer = new JsonSerializer();
            EventDTO eventDTO = (EventDTO)serializer.Deserialize(new JTokenReader(jEventDTO), typeof(EventDTO));
            try
            {
                var result = await _eventService.UpdateEventAsync(eventDTO);

                if (!result.Success)
                    return BadRequest(result.Message);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }

        // POST: api/Event/add
        [HttpPost("add"), DisableRequestSizeLimit]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> AddEventAsync([FromBody] JObject jEventDTO)
        {
            JsonSerializer serializer = new JsonSerializer();
            EventDTO eventDTO = (EventDTO)serializer.Deserialize(new JTokenReader(jEventDTO), typeof(EventDTO));
            try
            {
                var result = await _eventService.AddEventAsync(eventDTO);

                if (!result.Success)
                    return BadRequest(result.Message);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }

        // POST: api/Event/delete
        [HttpPost("delete"), ActionName("Delete")]
        public async Task<IActionResult> Delete(int eventId)
        {
            var result = await _eventService.DeleteAsync(eventId);

            if (!result.Success)
                return BadRequest(result.Message);

            return Ok();
        }

        //[HttpPost("add-event-img")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<ActionResult> ImageAsync([FromBody] JObject jEventDTO)
        //{
        //    JsonSerializer serializer = new JsonSerializer();
        //    EventDTO eventDTO = (EventDTO)serializer.Deserialize(new JTokenReader(jEventDTO), typeof(EventDTO));

        //    var result = await _eventService.AddEventAsync(eventDTO);

        //    if (!result.Success)
        //        return BadRequest(result.Message);


        //    return Ok();
        //}
    }
}
