using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Diplom.DataModels
{
    public partial class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
