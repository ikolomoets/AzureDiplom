using Diplom.DataModels;
using Diplom.Services.Communication;
using Diplom.ViewModels;
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
        Task<DeleteEventResponse> DeleteAsync(int eventId);
        Task<IEnumerable<Event>> ListAsync(DateTime date);
        Task<IEnumerable<Event>> ListAsync(DateTime date, int emergencyId);
        Task<UpdateEventResponse> UpdateEventAsync(EventDTO eventDTO);
        Task<AddEventResponse> AddEventAsync(EventDTO eventDTO);
        Task<List<DateTime?>> DatesListAsync();
    }
}
