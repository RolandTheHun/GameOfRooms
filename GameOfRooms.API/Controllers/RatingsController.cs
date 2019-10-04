using System.Threading.Tasks;
using GameOfRooms.API.Data;
using GameOfRooms.API.Models;
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
        private readonly DataContext _context;
        public RatingsController(IGoRepository repo, DataContext context)
        {
            _context = context;
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

        [HttpPost]
        public async Task<ActionResult<Rating>> PutRating(Rating rating)
        {
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRating), new { id = rating.Id }, rating);
        }

    }
}