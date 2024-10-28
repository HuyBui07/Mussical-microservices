using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using authenticate_service.Models;
using Microsoft.EntityFrameworkCore;

namespace authenticate_service.Data
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}