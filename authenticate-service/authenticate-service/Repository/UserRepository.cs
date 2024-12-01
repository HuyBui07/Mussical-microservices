using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using authenticate_service.Data;
using authenticate_service.Interface;
using authenticate_service.Models;
using Microsoft.EntityFrameworkCore;

namespace authenticate_service.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly MyAppDbContext _context;

        public UserRepository(MyAppDbContext context)
        {
            _context = context;
        }

        public async Task<User> RegisterAsync(string email, string password)
        {
            if (await _context.Users.AnyAsync(u => u.Email == email))
            {
                throw new Exception("User already exists");
            }

            var passwordHash = HashPassword(password);
            var user = new User
            {
                Email = email,
                PasswordHash = passwordHash,
                Role = "user"
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> LoginAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !VerifyPassword(password, user.PasswordHash))
            {
                throw new Exception("Invalid credentials");
            }

            return user;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            var hash = HashPassword(password);
            return hash == hashedPassword;
        }

        public async Task<bool> PingAsync()
        {
            //return await Task.FromResult(true);
            try
            {
                // Execute a lightweight query to check database connectivity
                await _context.Database.ExecuteSqlRawAsync("SELECT 1");
                return true;
            }
            catch
            {
                return false; // Return false if the query fails
            }
        }
    }
}