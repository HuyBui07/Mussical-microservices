using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace authenticate_service.DTOs
{
    public class UserLoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserRegisterDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserResponseDTO
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }
}