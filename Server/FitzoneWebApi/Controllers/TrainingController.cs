using FitzoneWebApi.Data;
using FitzoneWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitzoneWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainingController : Controller
    {
        private readonly FitzoneDbContext dbContext;

        public TrainingController(FitzoneDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetTrainings()
        {
            return Ok(await dbContext.Trainings.ToListAsync());
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetTrainingById([FromRoute] Guid id)
        {
            var Training = await dbContext.Trainings.Where(w => w.Id == id).FirstOrDefaultAsync();
            if (Training == null)
            {
                return NotFound();
            }

            return Ok(Training);
        }

        [HttpPost]
        public async Task<IActionResult> AddTraining(Training IncomeAddTraining)
        {
            var AddTrainingEntity = new Training()
            {
                Id = IncomeAddTraining.Id,
                Name = IncomeAddTraining.Name,
                Exercises = IncomeAddTraining.Exercises,
                Duration = IncomeAddTraining.Duration,
                Sets = IncomeAddTraining.Sets,
                Repetitions = IncomeAddTraining.Repetitions,
                IsCardio = IncomeAddTraining.IsCardio,
                IsStrength = IncomeAddTraining.IsStrength,
                IsInterval = IncomeAddTraining.IsInterval,
                IsRecovery = IncomeAddTraining.IsRecovery,
            };
            await dbContext.Trainings.AddAsync(AddTrainingEntity);
            await dbContext.SaveChangesAsync();

            return Ok(AddTrainingEntity);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateTraining([FromRoute] Guid id, Training IncomeUpdateTrainingItem)
        {
            var UpdateTrainingEntity = await dbContext.Trainings.FindAsync(id);

            if (UpdateTrainingEntity != null)
            {
                UpdateTrainingEntity.Id = IncomeUpdateTrainingItem.Id;
                UpdateTrainingEntity.Name = IncomeUpdateTrainingItem.Name;
                UpdateTrainingEntity.Exercises = IncomeUpdateTrainingItem.Exercises;
                UpdateTrainingEntity.Duration = IncomeUpdateTrainingItem.Duration;
                UpdateTrainingEntity.Sets = IncomeUpdateTrainingItem.Sets;
                UpdateTrainingEntity.Repetitions = IncomeUpdateTrainingItem.Repetitions;
                UpdateTrainingEntity.IsCardio = IncomeUpdateTrainingItem.IsCardio;
                UpdateTrainingEntity.IsStrength = IncomeUpdateTrainingItem.IsStrength;
                UpdateTrainingEntity.IsInterval = IncomeUpdateTrainingItem.IsInterval;
                UpdateTrainingEntity.IsRecovery = IncomeUpdateTrainingItem.IsRecovery;

                await dbContext.SaveChangesAsync();

                return Ok(UpdateTrainingEntity);
            }

            return NotFound();

        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteTraining([FromRoute] Guid id)
        {
            var DeleteTrainingItem = await dbContext.Trainings.Where(w => w.Id == id).FirstAsync();


            if (DeleteTrainingItem != null)
            {
                dbContext.Remove(DeleteTrainingItem);
                await dbContext.SaveChangesAsync();
                return Ok(DeleteTrainingItem);
            }

            return NotFound();
        }
    }
}
