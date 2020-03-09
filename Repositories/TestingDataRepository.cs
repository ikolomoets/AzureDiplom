using Diplom.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public class TestingDataRepository : BaseRepository, ITestingDataRepository
    {
        public TestingDataRepository(diplomContext context) : base(context) {  }

        public async Task<IEnumerable<TestData>> List()
        {
            return await GetQuery().ToListAsync();
        }

        private IQueryable<TestData> GetQuery()
        {
            return _context.TestData;
        }
    }
}
