using Diplom.DataModels;
using Diplom.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public interface IEmergencyRepository
    {
        Task<IEnumerable<Emergency>> ListAsync();
        Task<IEnumerable<Emergency>> ListAsync(string EmergencyName);
        Task<StatisticViewModel> GetStatisticAsync();
    }
}
