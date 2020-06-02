using AutoMapper;
using Diplom.DataModels;
using Diplom.Repositories;
using Diplom.Services.Communication;
using Diplom.ViewModels;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Diplom.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;
        private readonly IContentProvider _contentProvider;


        public EventService(IEventRepository eventRepository, IMapper mapper, IContentProvider contentProvider)
        {
            _eventRepository = eventRepository;
            _mapper = mapper;
            _contentProvider = contentProvider;
        }

        public async Task<AddEventResponse> AddEventAsync(EventDTO eventDTO)
        {
            var blobs = eventDTO.ImageByteArrayList.Select(bl => Convert.FromBase64String(Regex.Match(bl, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value)).ToList();

            var @event = _mapper.Map<EventDTO, Event>(eventDTO);
            await _contentProvider.UploadBlobs(@event, blobs);

            return await _eventRepository.AddEventAsync(@event);
        }

        public async Task<List<DateTime?>> DatesListAsync()
        {
            return await _eventRepository.DatesListAsync();
        }

        public async Task<DeleteEventResponse> DeleteAsync(int eventId)
        {
            return await _eventRepository.DeleteAsync(eventId);
        }

        public async Task<IEnumerable<Event>> ListAsync()
        {
            return await _eventRepository.ListAsync();
        }

        public async Task<IEnumerable<Event>> ListAsync(string eventName)
        {
            return await _eventRepository.ListAsync(eventName);
        }

        public async Task<IEnumerable<Event>> ListAsync(DateTime date)
        {
            return await _eventRepository.ListAsync(date);
        }

        public async Task<IEnumerable<Event>> ListAsync(int eventId)
        {
            return await _eventRepository.ListAsync(eventId);
        }

        public async Task<IEnumerable<Event>> ListAsync(DateTime date, int emergencyId)
        {
            return await _eventRepository.ListAsync(date, emergencyId);
        }

        public async Task<UpdateEventResponse> UpdateEventAsync(EventDTO eventDTO)
        {
            var blobs = eventDTO.ImageByteArrayList.Select(bl => Convert.FromBase64String(Regex.Match(bl, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value)).ToList();

            var @event = _mapper.Map<EventDTO, Event>(eventDTO);
            await _contentProvider.RemoveImages(_eventRepository.ListAsync(@event.EventId).Result.FirstOrDefault());
            await _contentProvider.UploadBlobs(@event, blobs);

            return await _eventRepository.UpdateEventAsync(@event);
        }
    }
}
