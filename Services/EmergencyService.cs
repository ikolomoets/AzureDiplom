using Diplom.DataModels;
using Diplom.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Diplom.Services
{
    public class EmergencyService : IEmergencyService
    {
        private readonly IEmergencyRepository _emergencyRepository;

        public EmergencyService(IEmergencyRepository emergencyRepository)
        {
            _emergencyRepository = emergencyRepository;
        }

        public async Task<IEnumerable<Emergency>> ListAsync()
        {
            return await _emergencyRepository.ListAsync();
        }

        public async Task<IEnumerable<Emergency>> ListAsync(string EmergencyName)
        {
            return await _emergencyRepository.ListAsync(EmergencyName);
        }
    }
}
