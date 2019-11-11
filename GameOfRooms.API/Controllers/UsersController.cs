using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using GameOfRooms.API.Data;
using GameOfRooms.API.Dtos;
using GameOfRooms.API.Helpers;
using GameOfRooms.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameOfRooms.API.Controllers
{
    [ServiceFilter(typeof(LogTimeAgoActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IGoRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IGoRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            userParams.UserType = UserType.student;

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("consultants")]
        public async Task<IActionResult> GetConsultants([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            userParams.UserType = UserType.consultant;

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        [HttpGet("{id}/userType")]
        public async Task<IActionResult> GetUserType(int id)
        {
            var user = await _repo.GetUser(id);

            var userType = user.UserType;

            return Ok(userType);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save!");
        }

        [HttpPost("{id}/consultation/{reservationId}")]
        public async Task<IActionResult> SignUp(int id, int reservationId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var consultation = await _repo.GetConsultation(id, reservationId);

            if (consultation != null)
                return BadRequest("You already signed up for this consultation!");

            if (await _repo.GetReservation(reservationId) == null)
                return NotFound();

            consultation = new SignUp
            {
                UserId = id,
                ReservationId = reservationId
            };

            _repo.Add<SignUp>(consultation);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to sign up on consultation!");
        }
    }
}