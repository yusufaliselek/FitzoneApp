namespace FitzoneWebApi.Models
{
    public class Coach
    {   
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Specialization { get; set; }
        public string Qualification { get; set; }
        public int YearsExperience { get; set; }
        public bool IsInPerson { get; set; }
        public string Contact { get; set; }
        public double Rate { get; set; }
        public List<string> Services { get; set; }

    }
}
