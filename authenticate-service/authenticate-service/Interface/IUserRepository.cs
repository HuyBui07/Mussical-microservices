using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using authenticate_service.Models;

namespace authenticate_service.Interface
{
    public interface IUserRepository
    {
        Task<User> RegisterAsync(string email, string password);
        Task<User> LoginAsync(string email, string password);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(Guid id);
    }
}