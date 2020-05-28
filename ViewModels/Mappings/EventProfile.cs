using AutoMapper;
using Diplom.DataModels;

namespace Diplom.ViewModels.Mappings
{
    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<EventDTO,Event >();
        }
    }
}
