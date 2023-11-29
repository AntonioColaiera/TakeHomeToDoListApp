import { Component } from '@angular/core';
import { Task } from './app.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  Title: string = ''; 
  Contents: string = ''; 
  tasks: Task[] = [];
  editMode: boolean[] = [];
  editButtonText: string = 'Edit'; 

    // Function to add a new task
    addTask() {
      if (this.Title.trim() !== '' && this.Contents.trim() !== '') {
        const newTask = new Task(uuidv4(), this.Title, this.Contents, new Date());
        this.tasks.push(newTask);
        this.editMode.push(false);
        this.Title = '';
        this.Contents = '';
        console.log('New Task Added:', newTask);
      }
    }
    
  


  // Function to toggle edit mode
  taskStates: { [key: number]: boolean } = {};

  toggleEdit(index: number, taskInput: HTMLInputElement, taskInputContent: HTMLInputElement) {
    if (this.taskStates[index]) {
      this.taskStates[index] = false;
      taskInput.setAttribute('readonly', 'true');
      this.editButtonText = 'Edit'; 
    } else {
      Object.keys(this.taskStates).forEach((key: string) => {
        const parsedKey = parseInt(key, 10);
        this.taskStates[parsedKey] = false;
      });
      this.taskStates[index] = true;
      taskInput.removeAttribute('readonly');
      taskInput.focus();
      this.editButtonText = 'Save';
    }
  }
  


  // Function to delete a task
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.editMode.splice(index, 1);
  }
}
