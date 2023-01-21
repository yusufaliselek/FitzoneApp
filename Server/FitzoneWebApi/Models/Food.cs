namespace FitzoneWebApi.Models
{
    public class Food
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Protein { get; set; }
        public double Carbohydrates { get; set; }
        public double Fat { get; set; }
        public int Calories { get; set; }
        public bool IsOrganic { get; set; }
        public bool IsVegetarian { get; set; }
        public bool IsGlutenFree { get; set; }
    }
}
