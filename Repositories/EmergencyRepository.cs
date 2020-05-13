using Diplom.Data;
using Diplom.DataModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public class EmergencyRepository : BaseRepository, IEmergencyRepository
    {
        public EmergencyRepository(DiplomDatabaseContext context) : base(context) { }

        public async Task<IEnumerable<Emergency>> ListAsync()
        {
            return await _context.Emergencies.Include(e => e.Events).ToListAsync();
        }

        public async Task<IEnumerable<Emergency>> ListAsync(string EmergencyName)
        {
            return await _context.Emergencies.Where(e => e.Name == EmergencyName).Include(e => e.Events).ToListAsync();
        }
    }
}
