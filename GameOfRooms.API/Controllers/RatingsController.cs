using System.Threading.Tasks;
using GameOfRooms.API.Data;
using GameOfRooms.API.Helpers;
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
        public async Task<IActionResult> GetRatings([FromQuery]RatingParams ratingParams)
        {
            var ratings = await _repo.GetRatings(ratingParams);

            Response.AddPagination(ratings.CurrentPage, ratings.PageSize, ratings.TotalCount, ratings.TotalPages);

            return Ok(ratings);
        }

        [HttpGet("ratingOf/{id}")]
        public async Task<IActionResult> GetConsultantRatings([FromQuery]RatingParams ratingParams, int id)
        {
            ratingParams.UserId = id;

            var ratings = await _repo.GetRatings(ratingParams);

            Response.AddPagination(ratings.CurrentPage, ratings.PageSize, ratings.TotalCount, ratings.TotalPages);

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