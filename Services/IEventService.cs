using Diplom.DataModels;
using Diplom.Services.Communication;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Diplom.Services
{
    public interface IEventService
    {
        Task<IEnumerable<Event>> ListAsync();
        Task<IEnumerable<Event>> ListAsync(string eventName);
        Task<IEnumerable<Event>> ListAsync(int eventId);
        Task<IEnumerable<Event>> ListAsync(DateTime date);
        Task<IEnumerable<Event>> ListAsync(DateTime date, int emergencyId);
        Task<UpdateEventResponse> UpdateEventAsync(Event @event);
        Task<AddEventResponse> AddEventAsync(Event @event);
        Task<List<DateTime?>> DatesListAsync();
    }
}
