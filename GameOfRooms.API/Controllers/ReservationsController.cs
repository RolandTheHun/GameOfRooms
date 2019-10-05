using System.Threading.Tasks;
using GameOfRooms.API.Data;
using GameOfRooms.API.Models;
using GameOfRooms.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AutoMapper;
using System;

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
    }
}