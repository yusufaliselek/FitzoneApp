using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fitzone.Api.Core.Domain.Models
{
    public class Coach : BaseEntity
    {   
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string  Password { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Specialization { get; set; }
        public string Qualification { get; set; }
        public int YearsExperience { get; set; }
        public bool IsInPerson { get; set; }
        public string Contact { get; set; }
        public double Rate { get; set; }
        public List<string> Services { get; set; }

    }
}
