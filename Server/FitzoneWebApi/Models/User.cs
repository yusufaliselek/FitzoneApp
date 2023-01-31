namespace FitzoneWebApi.Models
{
    public class Coach
    {
        public Guid Id{ get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Email Email { get; set; }
        public Gender Gender { get; set; }
    }
}