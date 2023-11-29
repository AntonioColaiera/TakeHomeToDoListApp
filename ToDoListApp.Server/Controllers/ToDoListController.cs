
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoListApp.Server.DbContext;
using ToDoListApp.Server.Entities;

namespace ToDoListApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoListController : ControllerBase
    {
        private readonly ToDoListAppDbContext _context;

        public ToDoListController(ToDoListAppDbContext context)
        {
            _context = context;
        }

        // GET: api/ToDoList
        [HttpGet]
        public async Task<IActionResult> GetAllToDoLists()
        {
            // Retrieve all ToDoLists from the database
            var toDoLists = await _context.ToDoLists.ToListAsync();
            return Ok(toDoLists);
        }

        // GET: api/ToDoList/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetToDoListById(Guid id)
        {
            // Retrieve a ToDoList by its ID from the database
            var toDoList = await _context.ToDoLists.FirstOrDefaultAsync(t => t.Id == id);

            if (toDoList == null)
            {
                return NotFound();
            }

            return Ok(toDoList);
        }

        // POST: api/ToDoList
        [HttpPost]
        public async Task<IActionResult> CreateToDoList([FromBody] ToDoList toDoList)
        {
            // Validate model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Set the creation date and time
            toDoList.CreatedAt = DateTime.UtcNow;

            // Add the ToDoList to the database and save changes
            _context.ToDoLists.Add(toDoList);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetToDoListById), new { id = toDoList.Id }, toDoList);
        }
        // PUT: api/ToDoList/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateToDoList(Guid id, [FromBody] ToDoList updatedToDoList)
        {
            // Validate model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the existing ToDoList from the database
            var toDoList = await _context.ToDoLists.FirstOrDefaultAsync(t => t.Id == id);

            if (toDoList == null)
            {
                return NotFound();
            }

            // Update the properties of the ToDoList
            toDoList.Title = updatedToDoList.Title;
            toDoList.Contents = updatedToDoList.Contents;

            // Update the ToDoList in the database and save changes
            _context.ToDoLists.Update(toDoList);
            await _context.SaveChangesAsync();

            return Ok(toDoList); // Return the updated Task
        }


        // DELETE: api/ToDoList/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoList(Guid id)
        {
            // Retrieve the ToDoList to delete from the database
            var toDoList = await _context.ToDoLists.FirstOrDefaultAsync(t => t.Id == id);

            if (toDoList == null)
            {
                return NotFound();
            }

            // Remove the ToDoList from the database and save changes
            _context.ToDoLists.Remove(toDoList);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
