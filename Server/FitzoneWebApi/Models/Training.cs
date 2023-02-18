using System.ComponentModel.DataAnnotations;

namespace FitzoneWebApi.Models
{
    public class Training
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        //public List<string> Exercises { get; set; }
        public int Duration { get; set; }
        public int Sets { get; set; }
        public int Repetitions { get; set; }
        public bool IsCardio { get; set; }
        public bool IsStrength { get; set; }
        public bool IsInterval { get; set; }
        public bool IsRecovery { get; set; }
    }
}
