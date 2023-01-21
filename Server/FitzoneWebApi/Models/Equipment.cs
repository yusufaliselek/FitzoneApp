namespace FitzoneWebApi.Models
{
    public class Equipment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public string Type { get; set; }
        public int WeightCapacity { get; set; }
        public int ResistanceLevels { get; set; }
    }
}
