import { Component, ViewEncapsulation } from '@angular/core';
import { Task } from './app.model';
import { TodoListService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class AppComponent {

  
  public tasks: Task[] = [];
  public newTask: Task = new Task();

  constructor(private todoListService: TodoListService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.todoListService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log('Attività recuperate:', tasks);
      console.log('Attività in AppComponent:', this.tasks);
  
      /*
      for (const task of this.tasks) {
        const taskElement = document.getElementById(`task-${task.Id}`);
      
        if (taskElement) {
          const deleteButton = taskElement?.querySelector('.delete');
          const editButton = taskElement?.querySelector('.edit');
      
          deleteButton?.addEventListener('click', () => this.deleteTask(task.Id));
          editButton?.addEventListener('click', () => this.editTask(task.Id, task.Title, task.Contents));
        } else {
          console.error('Elemento attività non trovato per ID:', task.Id);
        }
      }*/
      
    });
  }
  

  /*Task(taskId: string, updatedTitle: string, updatedContents: string): void {
    const updatedTask = this.tasks.find(task => task.Id === taskId);
  
    if (updatedTask) {
      updatedTask.Title = updatedTitle;
      updatedTask.Contents = updatedContents;
  
      console.log('Task prima dell\'aggiornamento:', updatedTask);
  
      this.todoListService.updateTask(updatedTask).subscribe(() => {
        console.log('Task aggiornata con successo:', updatedTask);
      });
    } else {
      console.error('Task non trovata per l\'ID:', taskId);
    }
  }
  
  deleteTask(taskId: string): void {
    const updatedTaskIndex = this.tasks.findIndex(task => task.Id === taskId);
  
    if (updatedTaskIndex !== -1) {
      console.log('Task da eliminare:', this.tasks[updatedTaskIndex]);
  
      this.todoListService.deleteTask(taskId).subscribe(() => {
        this.tasks.splice(updatedTaskIndex, 1);
        console.log('Task eliminata con successo:', taskId);
      });
    } else {
      console.error('Task non trovata per l\'ID:', taskId);
    }
  }*/
  


  // Function onSubmit handles the form submission event
  onSubmit(event: Event): void {
    event.preventDefault(); // Prevents the default form submission behavior

    // Retrieve the value entered in 'new-task-input' and 'new-contents-input'
    const title = (document.getElementById('new-task-input') as HTMLInputElement).value;
    const contents = (document.getElementById('new-contents-input') as HTMLInputElement).value;

    this.newTask = new Task(undefined, title, contents, undefined);
    

    // Retrieve the 'tasks' element from the DOM
    const tasksElement = document.getElementById('tasks');

    // Check if the input field is empty, if so, exit
    if (title === '' || contents === '') {
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
    taskInputEl.value = title;
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
      console.log('Task aggiunta all\'elemento HTML:', taskEl);
    } else {
      console.error('Elemento HTML con ID \'tasks\' non trovato!');
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

    this.todoListService.createTask(this.newTask).subscribe((task) => {
      // Aggiungi la nuova task all'elenco visibile in frontend solo dopo averla creata con successo nel backend
      this.tasks.push(task);
      // Resetta il form dopo l'invio
      this.newTask = new Task();
      console.log('Nuova task aggiunta:', task);
    });
    
  }
}
