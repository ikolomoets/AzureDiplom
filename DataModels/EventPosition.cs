using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.DataModels
{
    public class EventPosition
    {
        public Event Event { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string Place { get; set; }
    }
}
