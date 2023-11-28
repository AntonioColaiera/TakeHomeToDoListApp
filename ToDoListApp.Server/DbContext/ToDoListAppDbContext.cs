using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using ToDoListApp.Server.Entities;

namespace ToDoListApp.Server.DbContext
{
    public class ToDoListAppDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<ToDoList> ToDoLists { get; set; }
        public ToDoListAppDbContext(DbContextOptions options) : base(options)
        {
           
        }

        //TODO ADD DBSETS
    }   
}
