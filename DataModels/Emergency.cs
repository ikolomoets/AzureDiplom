using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.DataModels
{
    public class Emergency
    {
        public int EmergencyId { get; set; }
        public string Name { get; set; }

        public ICollection<Event> Events { get; set; }
    }
}
