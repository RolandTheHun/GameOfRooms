using System.Threading.Tasks;
using GameOfRooms.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameOfRooms.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly IGoRepository _repo;
        public RatingsController(IGoRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetRatings()
        {
            var ratings = await _repo.GetRatings();

            return Ok(ratings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRating(int id)
        {
            var rating = await _repo.GetRating(id);

            return Ok(rating);
        }

    }
}