import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class AppComponent {
  // Array containing the list of tasks
  public submitasks: Task[] = [];

  constructor(private http: HttpClient) {}

  // Function onSubmit handles the form submission event
  onSubmit(event: Event): void {
    event.preventDefault(); // Prevents the default form submission behavior

    // Retrieve the value entered in 'new-task-input' and 'new-contents-input'
    const task = (document.getElementById('new-task-input') as HTMLInputElement).value;
    const contents = (document.getElementById('new-contents-input') as HTMLInputElement).value;

    // Retrieve the 'tasks' element from the DOM
    const tasksElement = document.getElementById('tasks');
    
    // Check if the 'tasks' element exists, otherwise exit
    if (tasksElement === null) {
      return;
    }

    // Check if the input field is empty, if so, exit
    if (task === '' || contents === '') {
      return;
    }

    // Create HTML elements to represent the task
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');

    const taskContentEl = document.createElement('div');
    taskContentEl.classList.add('content');
    taskEl.appendChild(taskContentEl);

    // Create an input to display the text of the new task
    const taskInputEl = document.createElement('input');
    taskInputEl.classList.add('text');
    taskInputEl.type = 'text';
    taskInputEl.value = task;
    taskInputEl.setAttribute('readonly', 'readonly');
    taskContentEl.appendChild(taskInputEl);

    // Create an input to display the content of the new task
    const contentsInputEl = document.createElement('input');
    contentsInputEl.classList.add('text');
    contentsInputEl.type = 'text';
    contentsInputEl.value = contents;
    contentsInputEl.setAttribute('readonly', 'readonly');
    taskContentEl.appendChild(contentsInputEl);

    // Create buttons to edit and delete the task
    const taskActionsEl = document.createElement('div');
    taskActionsEl.classList.add('actions');

    const taskEditEl = document.createElement('button');
    taskEditEl.classList.add('edit');
    taskEditEl.innerText = 'Edit';

    const taskDeleteEl = document.createElement('button');
    taskDeleteEl.classList.add('delete');
    taskDeleteEl.innerText = 'Delete';

    taskActionsEl.appendChild(taskEditEl);
    taskActionsEl.appendChild(taskDeleteEl);
    taskEl.appendChild(taskActionsEl);

    // Add the new task to the task list in HTML
    if (tasksElement) {
      tasksElement.appendChild(taskEl);
    }

    // Clear input fields after adding the task
    (document.getElementById('new-task-input') as HTMLInputElement).value = '';
    (document.getElementById('new-contents-input') as HTMLInputElement).value = '';

    // Add a listener for the click event on the edit button
    taskEditEl.addEventListener('click', () => {
      if (taskEditEl.innerText.toLowerCase() === 'edit') {
        taskEditEl.innerText = 'Save';
        taskInputEl.removeAttribute('readonly');
        contentsInputEl.removeAttribute('readonly');
        taskInputEl.focus();
      } else {
        taskEditEl.innerText = 'Edit';
        taskInputEl.setAttribute('readonly', 'readonly');
        contentsInputEl.setAttribute('readonly', 'readonly');
      }
    });

    // Add a listener for the click event on the delete button
    taskDeleteEl.addEventListener('click', () => {
      if (tasksElement) {
        tasksElement.removeChild(taskEl);
        // Clear input fields after deletion
        (document.getElementById('new-task-input') as HTMLInputElement).value = '';
        (document.getElementById('new-contents-input') as HTMLInputElement).value = '';
      }
    });
  }
}
