using Diplom.Data;
using Diplom.DataModels;
using Diplom.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public class EmergencyRepository : BaseRepository, IEmergencyRepository
    {
        public EmergencyRepository(DiplomDatabaseContext context) : base(context) { }

        public async Task<StatisticViewModel> GetStatisticAsync()
        {
            var all = await _context.Emergencies.Include(e => e.Events).ToListAsync();

            var tech = all.Find(e => e.EmergencyId == Constants.TechnogenicId);
            var natr = all.Find(e => e.EmergencyId == Constants.NaturalId);
            var socl = all.Find(e => e.EmergencyId == Constants.SocialId);
            var mili = all.Find(e => e.EmergencyId == Constants.MilitaryId);

            int technogenicNumber = tech.Events == null ? 0 : tech.Events.Count;
            int naturalNumber = natr.Events == null ? 0 : natr.Events.Count;
            int socialNumber = socl.Events == null ? 0 : socl.Events.Count;
            int militaryNumber = mili.Events == null ? 0 : mili.Events.Count;


            int deathNumber = 0;
            int harmedNumber = 0;

            if (tech.Events != null)
            {
                deathNumber +=  tech.Events.Select(t => t.Deaths).Sum().Value;
                harmedNumber += tech.Events.Select(t => t.Harmed).Sum().Value;
            }

            if (natr.Events != null)
            {
                deathNumber += natr.Events.Select(t => t.Deaths).Sum().Value;
                harmedNumber += natr.Events.Select(t => t.Harmed).Sum().Value;
            }

            if (socl.Events != null)
            {
                deathNumber += socl.Events.Select(t => t.Deaths).Sum().Value;
                harmedNumber += socl.Events.Select(t => t.Harmed).Sum().Value;
            }

            if (mili.Events != null)
            {
                deathNumber += mili.Events.Select(t => t.Deaths).Sum().Value;
                harmedNumber += mili.Events.Select(t => t.Harmed).Sum().Value;
            }

            var vm = new StatisticViewModel()
            {
                EventsNumber = all.Select(eme => eme.Events.Count).Sum(),
                TechnogenicNumber = technogenicNumber,
                NaturalNumber = naturalNumber,
                SocialNumber = socialNumber,
                MilitaryNumber = militaryNumber,

                DeathsCount = deathNumber,
                HarmedCount = harmedNumber
            };

            return vm;
        }

        public async Task<IEnumerable<Emergency>> ListAsync()
        {
            return await _context.Emergencies.Include(e => e.Events).ToListAsync();
        }

        public async Task<IEnumerable<Emergency>> ListAsync(string EmergencyName)
        {
            return await _context.Emergencies.Where(e => e.Name == EmergencyName).Include(e => e.Events).ToListAsync();
        }

        public async Task<IEnumerable<Emergency>> ListAsync(int emergencyId)
        {
            return await _context.Emergencies.Where(e => e.EmergencyId == emergencyId).Include(e => e.Events).ToListAsync();
        }
    }
}
