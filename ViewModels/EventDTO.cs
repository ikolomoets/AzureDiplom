using Diplom.DataModels;
using Diplom.ViewModels.Validations;
using ServiceStack.FluentValidation.Attributes;
using System;
using System.Collections.Generic;

namespace Diplom.ViewModels
{
    public class EventDTO
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string Description { get; set; }
        public int? Harmed { get; set; }
        public int? Deaths { get; set; }
        public double? Losses { get; set; }
        public double? Costs { get; set; }
        public DateTime? Date { get; set; }
        public List<byte[]> ImageByteArrayList { get; set; }

        public EventPosition EventPosition { get; set; }

        public int EmergencyId { get; set; }
        public Emergency Emergency { get; set; }
    }
}