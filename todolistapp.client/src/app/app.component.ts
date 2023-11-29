import { Component, OnInit } from '@angular/core';
import { Task } from './app.model';
import { v4 as uuidv4 } from 'uuid';
import { TodoListService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = ''; 
  contents: string = ''; 
  tasks: Task[] = [];
  editMode: boolean[] = [];
  editButtonText: string = 'Edit'; 

  constructor(private todoListService: TodoListService) {}

  ngOnInit() {
    this.getTasks();
    console.log('Tasks loaded on Init:', this.tasks);
  }
  
  getTasks() {
    this.todoListService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks.map(task => {
          console.log('Task retrieved:', task);
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
        console.error('Error fetching tasks:', error);
      }
    );
  }
  
  
  
  
  addTask() {
    if (this.title.trim() !== '' && this.contents.trim() !== '') {
      const newTask = new Task(uuidv4(), this.title, this.contents, new Date());
      this.todoListService.createTask(newTask).subscribe(task => {
        this.tasks.push(task);
        this.editMode.push(false);
        this.title = '';
        this.contents = '';
        console.log('New Task Added:', task);
      });
    }
  }

  // Function to toggle edit mode
  taskStates: { [key: number]: boolean } = {};

  toggleEdit(index: number, taskInput: HTMLInputElement, taskInputContent: HTMLInputElement) {
    if (this.taskStates[index]) {
      this.updateTask(index, taskInput.value, taskInputContent.value);
      this.taskStates[index] = false;
      taskInput.setAttribute('readonly', 'true');
      this.editButtonText = 'Edit';
      console.log('Edit mode disabled');
    } else {
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
  
  updateTask(index: number, title: string, contents: string) {
    const task = this.tasks[index];
    task.title = title;
    task.contents = contents;
    console.log('Task before update:', task);
    this.todoListService.updateTask(task).subscribe(
      updatedTask => {
        console.log('Response from server:', updatedTask); 
        this.tasks[index] = updatedTask;
        console.log('Task updated:', updatedTask);
      },
      error => {
        console.error('Error updating task:', error);
      }
    );
  }
  
  
  deleteTask(index: number) {
    const task = this.tasks[index];
    console.log('Task selected:', task);
  
    if (task && task.id) {
     this.todoListService.deleteTask(task.id).subscribe(
        () => {
          this.tasks.splice(index, 1);
          this.editMode.splice(index, 1);

        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    } else {
      console.error('Invalid task ID');
    }
  }
  
  
  }

