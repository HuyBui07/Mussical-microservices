using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using authenticate_service.DTOs;
using authenticate_service.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace authenticate_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO loginDto)
        {
            try
            {
                var user = await _userRepository.LoginAsync(loginDto.Email, loginDto.Password);
                var token = CreateToken(user.Id);
                return Ok(new UserResponseDTO { Email = user.Email, Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDTO registerDto)
        {
            try
            {
                var user = await _userRepository.RegisterAsync(registerDto.Email, registerDto.Password);
                var token = CreateToken(user.Id);
                return Ok(new UserResponseDTO { Email = user.Email, Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        private string CreateToken(Guid userId)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var claims = new[] { new Claim(ClaimTypes.NameIdentifier, userId.ToString()) };
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // Ping endpoint to check health
        [HttpGet("ping")]
        public async Task<IActionResult> Ping()
        {
            try
            {
                var isHealthy = await _userRepository.PingAsync();
                //await Task.Delay(TimeSpan.FromSeconds(15)); // Simulate delay

                if (isHealthy)
                {
                    return Ok("Service is running");
                }
                else
                {
                    return StatusCode(500, "Service unavailable");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Service timeout or error");
            }
        }
    }
}