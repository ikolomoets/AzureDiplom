using Diplom.DataModels;
using Diplom.Repositories;
using Diplom.Services.Communication;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Diplom.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<AddEventResponse> AddEventAsync(Event @event)
        {
            return await _eventRepository.AddEventAsync(@event);
        }

        public async Task<List<DateTime?>> DatesListAsync()
        {
            return await _eventRepository.DatesListAsync();
        }

        public async Task<IEnumerable<Event>> ListAsync()
        {
            return await _eventRepository.ListAsync();
        }

        public async Task<IEnumerable<Event>> ListAsync(string eventName)
        {
            return await _eventRepository.ListAsync(eventName);
        }

        public async Task<IEnumerable<Event>> ListAsync(DateTime date)
        {
            return await _eventRepository.ListAsync(date);
        }

        public async Task<IEnumerable<Event>> ListAsync(int eventId)
        {
            return await _eventRepository.ListAsync(eventId);
        }

        public async Task<UpdateEventResponse> UpdateEventAsync(Event @event)
        {
            return await _eventRepository.UpdateEventAsync(@event);
        }
    }
}
