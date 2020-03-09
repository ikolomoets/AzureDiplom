using Diplom.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public class BaseRepository
    {
        protected readonly diplomContext _context;

        protected BaseRepository(diplomContext context)
        {
            _context = context;
        }
    }
}
