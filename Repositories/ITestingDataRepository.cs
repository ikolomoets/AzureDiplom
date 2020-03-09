using Diplom.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public interface ITestingDataRepository
    {
        Task<IEnumerable<TestData>> List();
    }
}
