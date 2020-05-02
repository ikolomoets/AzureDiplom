using Diplom.Data;
using Diplom.DataModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public class ContextRepository : BaseRepository, IContextRepository
    {
        public ContextRepository(DiplomDatabaseContext context) : base(context) {  }

        public async Task<IEnumerable<TestData>> GetTestDataAsync()
        {
            return await GetQuery().ToListAsync();
        }

        private IQueryable<TestData> GetQuery()
        {
            return _context.TestData;
        }
    }
}
