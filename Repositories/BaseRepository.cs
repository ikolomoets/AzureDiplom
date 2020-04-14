using Diplom.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
