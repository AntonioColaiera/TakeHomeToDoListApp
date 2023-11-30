import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './app.model'; // Importing the Task model

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private apiUrl = 'https://localhost:7259/api/ToDoList'; // API endpoint for ToDoList

  constructor(private http: HttpClient) {}

  // Retrieve tasks from the API
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`); // Making a GET request to fetch tasks
  }

  // Create a new task by sending data to the server
  createTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, newTask); // Making a POST request to create a new task
  }

  // Update an existing task by sending updated data to the server
  updateTask(updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask); // Making a PUT request to update a task
  }

  // Delete a task from the server using the task ID
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`); // Making a DELETE request to remove a task
  }
}
