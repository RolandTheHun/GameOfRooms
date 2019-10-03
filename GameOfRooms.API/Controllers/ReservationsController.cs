using System.Threading.Tasks;
using GameOfRooms.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameOfRooms.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IGoRepository _repo;
        public ReservationsController(IGoRepository repo)
        {
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetReservations()
        {
            var reservations = await _repo.GetReservations();

            return Ok(reservations);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservation(int id)
        {
            var reservation = await _repo.GetReservation(id);

            return Ok(reservation);
        }
    }
}