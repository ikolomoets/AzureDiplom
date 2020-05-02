using Diplom.Data;

namespace Diplom.Repositories
{
    public class BaseRepository
    {
        protected readonly DiplomDatabaseContext _context;

        protected BaseRepository(DiplomDatabaseContext context)
        {
            _context = context;
        }
    }
}
