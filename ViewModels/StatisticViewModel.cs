using Diplom.ViewModels.Validations;
using ServiceStack.FluentValidation.Attributes;

namespace Diplom.ViewModels
{
    public class StatisticViewModel
    {
        public int EventsNumber { get; set; }

        public int TechnogenicNumber { get; set; }
        public int NaturalNumber { get; set; }
        public int SocialNumber { get; set; }
        public int MilitaryNumber { get; set; }
        public int DeathsCount { get; set; }
        public int HarmedCount { get; set; }
    }
}