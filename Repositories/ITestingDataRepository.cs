using Diplom.DataModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public interface IContextRepository
    {
        Task<IEnumerable<TestData>> GetTestDataAsync();
    }
}
