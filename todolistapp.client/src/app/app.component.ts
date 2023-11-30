import { Component, OnInit } from '@angular/core';
import { Task } from './app.model';
import { v4 as uuidv4 } from 'uuid';
import { TodoListService } from './app.service';
import { Animation } from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [Animation] // Importing animations for the component
})
export class AppComponent implements OnInit {
  title: string = ''; // Variable to store the task title
  contents: string = ''; // Variable to store the task content or description
  tasks: Task[] = []; // Array to store the list of tasks
  editMode: boolean[] = []; // Array to track the editing mode for tasks
  editButtonText: string = 'Edit'; // Text to display on the edit button
  showWelcomeMessage = true; // Variable to control the welcome message visibility from the animation

  constructor(private todoListService: TodoListService) {}

  ngOnInit() {
    this.getTasks(); // Fetches tasks when the component initializes

    setTimeout(() => {
      this.showWelcomeMessage = false; // Hides the welcome message after 3 seconds
    }, 3000);
  }

  // Fetches tasks from the service
  getTasks() {
    // Subscribes to the observable returned by the service to get tasks
    this.todoListService.getTasks().subscribe(
      tasks => {
        // Maps the fetched tasks to the component's task list
        this.tasks = tasks.map(task => {
          if (task.id) {
            const existingTask = this.tasks.find(t => t.id === task.id);
            if (existingTask) {
              return existingTask;
            } else {
              return task;
            }
          } else {
            return task;
          }
        });
      },
      error => {
        console.error('Error fetching tasks:', error); // Logs error if fetching tasks fails
      }
    );
  }

  // Adds a new task to the list
  addTask() {
    // Checks if title and contents are not empty strings
    if (this.title.trim() !== '' && this.contents.trim() !== '') {
      // Creates a new task object with a unique ID using uuidv4
      const newTask = new Task(uuidv4(), this.title, this.contents, new Date());
      // Subscribes to the service method to create a new task
      this.todoListService.createTask(newTask).subscribe(task => {
        // Pushes the created task to the tasks array and resets input fields
        this.tasks.push(task);
        this.editMode.push(false);
        this.title = '';
        this.contents = '';
        console.log('New Task Added:', task); // Logs the newly added task
      });
    }
  }

  // Function to toggle edit mode for tasks
  taskStates: { [key: number]: boolean } = {};
  toggleEdit(index: number, taskInput: HTMLInputElement, taskInputContent: HTMLInputElement) {
    // Toggles the edit mode for a particular task
    if (this.taskStates[index]) {
      this.updateTask(index, taskInput.value, taskInputContent.value);
      this.taskStates[index] = false;
      taskInput.setAttribute('readonly', 'true');
      this.editButtonText = 'Edit';
      console.log('Edit mode disabled');
    } else {
      // Disables edit mode for other tasks and enables it for the selected task
      Object.keys(this.taskStates).forEach((key: string) => {
        const parsedKey = parseInt(key, 10);
        this.taskStates[parsedKey] = false;
      });
      this.taskStates[index] = true;
      taskInput.removeAttribute('readonly');
      taskInput.focus();
      this.editButtonText = 'Save';
      console.log('Edit mode enabled');
    }
  }

  // Updates an existing task
  updateTask(index: number, title: string, contents: string) {
    const task = this.tasks[index];
    task.title = title;
    task.contents = contents;
    console.log('Task before update:', task); // Logs the task before updating
    // Subscribes to the service method to update the task
    this.todoListService.updateTask(task).subscribe(
      updatedTask => {
        console.log('Response from server:', updatedTask); // Logs the response from the server
        this.tasks[index] = updatedTask; // Updates the task in the component's list
        console.log('Task updated:', updatedTask); // Logs the updated task
      },
      error => {
        console.error('Error updating task:', error); // Logs error if updating task fails
      }
    );
  }

  // Deletes a task from the list
  deleteTask(index: number) {
    const task = this.tasks[index];
    console.log('Task selected:', task); // Logs the task selected for deletion

    if (task && task.id) {
      // Subscribes to the service method to delete the task
      this.todoListService.deleteTask(task.id).subscribe(
        () => {
          // Removes the task from the tasks array and the editMode array
          this.tasks.splice(index, 1);
          this.editMode.splice(index, 1);
        },
        (error) => {
          console.error('Error deleting task:', error); // Logs error if deleting task fails
        }
      );
    } else {
      console.error('Invalid task ID'); // Logs error for invalid task ID
    }
  }
}
