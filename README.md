# ToDo list web application

## Here are the most important features that I implemented to complete the exercise

## Angular ToDo List Application (Front End)

### `AppRoutingModule`

The `AppRoutingModule` manages the application's routing configuration using Angular's `RouterModule`. Presently, it includes a single route mapping to the `AppComponent` for the ToDo list's API path. This module can be expanded to accommodate future application routing requirements.

### `AppModule`

The `AppModule` is the core module that orchestrates the application. It imports necessary modules such as `BrowserModule`, `HttpClientModule`, `FormsModule`, and `BrowserAnimationsModule`. Additionally, it declares the `AppComponent` as the bootstrap component, along with providing the `TodoListService` as a global provider.

### `TodoListService`

The `TodoListService` handles HTTP communication with the backend API for tasks management. It encapsulates methods to interact with the server, including:

- `getTasks()`: Retrieves tasks from the API.
- `createTask(newTask)`: Sends a new task to the server for creation.
- `updateTask(updatedTask)`: Sends updated task information to the server.
- `deleteTask(taskId)`: Deletes a task from the server based on its ID.
  This service can be extended to include additional functionalities for task management.

### `AppComponent`

The `AppComponent` is the main component managing the ToDo list application. Key functionalities include:

- **Fetching Tasks**: Retrieves tasks from the server using `TodoListService`.
- **Adding a Task**: Allows users to add new tasks and sends them to the server via `TodoListService`.
- **Editing Tasks**: Enables users to edit task details directly in the UI.
- **Updating a Task**: Sends updated task information to the server for storage.
- **Deleting a Task**: Removes tasks from the list and the server using `TodoListService`.
- **Animations**: Utilizes the `Animation` animation for welcome message display.

## .Net ToDo List Application (Back End)


#### `ToDoListApp.Server`

* The `ToDoListApp.Server` project encompasses the back-end functionality of the ToDo list application. It is built using ASP.NET Core and provides an API for managing tasks.

#### `Startup.cs`

* The `Startup.cs` file serves as the application's entry point. It configures the essential services and middleware for the ASP.NET Core application. This includes:
    * Registering services: Defines dependencies for the application, such as the `ToDoListAppDbContext`.
    * Configuring routing: Sets up route templates for handling API requests.
    * Enabling CORS: Allows cross-origin resource sharing to handle requests from the Angular front-end.
    * Setting up error handling: Establishes middleware for handling exceptions and errors gracefully.

#### `ToDoListAppDbContext`

* The `ToDoListAppDbContext` inherits from `DbContext` and manages database interactions. It defines a `DbSet` property for the `ToDoList` entity, enabling access to the relevant table in the database.

#### `ToDoList` Model

* The `ToDoList` model represents a task in the application. It contains properties for task identification, title, description, and completion status.

#### `ToDoListController`

* The `ToDoListController` is an ASP.NET Core controller responsible for handling API requests related to tasks. It defines methods for various task management operations:
    * `GET /api/todolists`: Retrieves a list of all tasks from the database.
    * `GET /api/todolists/{id}`: Retrieves a specific task based on its ID.
    * `POST /api/todolists`: Creates a new task and adds it to the database.
    * `PUT /api/todolists/{id}`: Updates an existing task with the provided information.
    * `DELETE /api/todolists/{id}`: Deletes a task from the database based on its ID.

These methods interact with the `ToDoListAppDbContext` to perform database (PostgreSQL) operations, ensuring data persistence through EntityFramework Core.

#### Database Migration

* The application employs Entity Framework Core's migrations to manage database schema changes. The `dotnet ef migrations add <migration-name>` command generates migration scripts, and `dotnet ef database update` applies those scripts to the database.

#### Integration with Angular Front End

* The Angular front-end application communicates with the ASP.NET Core back-end API using HTTP requests. The `TodoListService` in the Angular application handles these interactions, sending and receiving data for task management operations.




![Test Image](https://github.com/AntonioColaiera/TakeHomeToDoListApp/blob/master/FE.png)

![Test Image](https://github.com/AntonioColaiera/TakeHomeToDoListApp/blob/master/BE.png)

---

## Assignment

Demonstrate your adaptation and versatility skills as a developer!

[Fork this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template), setup the development environment, edit the template solution to realize the given requirements.

Try as much as possible to stick to the given technology stack, even if you are not familiar with it.

If you are stuck, there is a very useful tutorial you can follow here: https://www.youtube.com/watch?v=eNVbiIsoEUw&ab_channel=SameerSaini

## App requirements:

- the webapp is a SPA, with a single or multiple views to allow the user to display, insert, delete, edit messages. ( ui can look similar to https://www.youtube.com/watch?v=MkESyVB4oUw )

- cleanup the mock "weatherforecast" api functionality.

- for simplicity there will be no authentication required.

- persist the todolist items on a postgres database instance.

- the ToDoList object is defined as :

```
{
	guid : "Id"
	string : "Title",
	string : "Contents",
	datetime : "CreatedAt"
}
```

- feel free to expand or add any further functionality to demonstrate your creativity skills.

## Template solution technologies:

- Visual studio 2022 / VS Code
- Angular 18
- .Net 7
- EntityFramework Core
- Postgresql

### Setup Guide:

- Make sure to have Node v18.18.2, npm v9.8.1, angular/cli 15.0.5, .net 7.0 installed.

- Configure both the frontend and backend do start on startup for easier debugging

![alt text](https://i.imgur.com/vvRjfDF.png)

- a successful run should output two browsers, demonstrating mockup frontend and api call functionality

![alt text](https://i.imgur.com/i4dmtTh.png)

### Useful links

- https://labpys.com/how-to-create-web-api-crud-in-asp-net-core-with-postgresql/
- https://learn.microsoft.com/it-it/aspnet/core/client-side/spa/angular?view=aspnetcore-7.0&tabs=visual-studio

## Evaluation criteria

- Completeness: did you complete the features as briefed?
- Correctness: Does the solution perform in sensible, thought-out ways?
- Maintainability: is the code written in a clean, maintainable way?

## Completing your work

After you are done, document and comment your code as much as possible, push your changes in your own repository and share the link with the reviewer.

All the best and happy coding.
