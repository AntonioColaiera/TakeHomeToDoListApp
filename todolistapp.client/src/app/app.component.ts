import { Component } from '@angular/core';
import { Task } from './app.model';

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
      const newTask = new Task('', this.Title, this.Contents, new Date()); 
      this.tasks.push(newTask);
      this.editMode.push(false);
      this.Title = ''; 
      this.Contents = ''; 
      console.log('New Task Added:', newTask);
    }
  }

  // Function to toggle edit mode
  toggleEdit(index: number, taskInput: HTMLInputElement, taskInputContent: HTMLInputElement) {
    if (this.editMode[index]) {
      this.editMode[index] = false;
      taskInput.setAttribute('readonly', 'true');
      this.editButtonText = 'Edit'; 
    } else {
      this.editMode[index] = true;
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
