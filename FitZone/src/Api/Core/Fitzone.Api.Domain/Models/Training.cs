using System.ComponentModel.DataAnnotations;

namespace Fitzone.Api.Core.Domain.Models
{
    public class Training : BaseEntity
    {
        [Key]
        public Guid CreatedById { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public int Sets { get; set; }
        public int Repetitions { get; set; }
        public bool IsCardio { get; set; }
        public bool IsStrength { get; set; }
        public bool IsInterval { get; set; }
        public bool IsRecovery { get; set; }
        public bool IsFinished { get; set; }
        public virtual Coach CreatedBy { get; set; }

    }
}
