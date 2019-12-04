using System.Threading.Tasks;
using GameOfRooms.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameOfRooms.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultationsController : ControllerBase
    {
        private readonly IGoRepository _repo;
        public ConsultationsController(IGoRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetConsultations()
        {
            var consultations = await _repo.GetUserConsultations();

            return Ok(consultations);
        }

        [HttpGet("{id}/myConsultation/{consultationId}")]
        public async Task<IActionResult> GetConsultation(int id, int consultationId)
        {
            var consultation = await _repo.GetConsultation(id, consultationId);

            return Ok(consultation);
        }
    }
}