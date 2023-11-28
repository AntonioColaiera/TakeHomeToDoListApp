namespace ToDoListApp.Server.Entities
{
    public class ToDoList
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = "";
        public string Contents { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
