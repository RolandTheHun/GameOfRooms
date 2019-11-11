using System.Threading.Tasks;
using GameOfRooms.API.Data;
using GameOfRooms.API.Models;
using GameOfRooms.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AutoMapper;
using System;
using GameOfRooms.API.Helpers;

namespace GameOfRooms.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IGoRepository _repo;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ReservationsController(IGoRepository repo, DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetReservations([FromQuery]ReservationParams reservationParams)
        {
            var reservations = await _repo.GetReservations(reservationParams);

            Response.AddPagination(reservations.CurrentPage, reservations.PageSize, reservations.TotalCount, reservations.TotalPages);

            return Ok(reservations);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservation(int id)
        {
            var reservation = await _repo.GetReservation(id);

            return Ok(reservation);
        }

        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReservation), new { id = reservation.Id }, reservation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> SignUpForReservation(int id, ReservationForSignUpDto reservationForSingUpDto)
        {
            var reservationFromRepo = await _repo.GetReservation(id);

            _mapper.Map(reservationForSingUpDto, reservationFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

        [HttpPut("updateReservation/{id}")]
        public async Task<IActionResult> UpdateUser(int id, ReservationForUpdateDto reservationForUpdateDto)
        {
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var reservationFromRepo = await _repo.GetReservation(id);

            _mapper.Map(reservationForUpdateDto, reservationFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating reservation {id} failed on save!");
        }

        [HttpDelete("deleteReservation/{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservationFromRepo = await _repo.GetReservation(id);

            if (reservationFromRepo == null)
            {
                return NotFound();
            }

            _repo.Delete(reservationFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Deleting reservation {id} failed on save!");
        }
    }
}