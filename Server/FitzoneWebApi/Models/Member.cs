namespace FitzoneWebApi.Models
{
    public enum Gender
    {
        Female = 0,
        Male = 1,   
        Unknown = 2,
    }
    public enum MembershipType
    {
        Monthly = 0,
        Yearly = 1,
        DayPass = 2,
        VIP = 3,
        Corporate = 4,
    }
    public class Member
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public double Height { get; set; }
        public double Weight { get; set; }
        public double BodyFat { get; set; }
        public string? Email { get; set; }
        public string PhoneNumber { get; set; }
        public string MacAddress { get; set; }
        public Gender Gender { get; set; }
        public string FitnessGoals { get; set; }
        public MembershipType MembershipType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
