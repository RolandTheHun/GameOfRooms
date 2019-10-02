using System.Threading.Tasks;
using GameOfRooms.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameOfRooms.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IGoRepository _repo;
        public RoomsController(IGoRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _repo.GetRooms();

            return Ok(rooms);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _repo.GetRoom(id);

            return Ok(room);
        }
    }
}