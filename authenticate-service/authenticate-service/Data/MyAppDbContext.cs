using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using authenticate_service.Services;
using authenticate_service.Models;

namespace authenticate_service.Data
{
    public class MyAppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public MyAppDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Environment.GetEnvironmentVariable("CurrentDatabaseConnection") 
                                   ?? _configuration.GetSection("DatabaseSettings:PrimaryConnectionString").Value;

            optionsBuilder.UseSqlServer(connectionString);
        }

        public DbSet<User> Users { get; set; }
    }
}
