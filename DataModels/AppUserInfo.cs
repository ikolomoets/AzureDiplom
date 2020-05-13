using System;
using System.Collections.Generic;

namespace Diplom.DataModels
{
    public partial class AppUserInfo
    {
        public int Id { get; set; }
        public string IdentityId { get; set; }
        public string Location { get; set; }

        public virtual AppUser Identity { get; set; }
    }
}
