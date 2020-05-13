using Diplom.DataModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Diplom.Services
{
    public interface IEmergencyService
    {
        Task<IEnumerable<Emergency>> ListAsync();
        Task<IEnumerable<Emergency>> ListAsync(string EmergencyName);
    }
}
