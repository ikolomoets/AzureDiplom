using Diplom.DataModels;
using Diplom.Services.Communication;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> ListAsync();
        Task<IEnumerable<Event>> ListAsync(string eventName);
        Task<IEnumerable<Event>> ListAsync(DateTime date);
        Task<UpdateEventResponse> UpdateEventAsync(Event @event);
        Task<List<DateTime?>> DatesListAsync();
    }
}
