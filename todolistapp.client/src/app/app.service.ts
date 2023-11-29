import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './app.model'; 

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private apiUrl = 'https://localhost:7259/api/ToDoList'; 

  constructor(private http: HttpClient) {}


  // Get tasks from the API
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  // Create a new task by sending data to the server
  createTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, newTask);
  }

  // Update an existing task by sending updated data to the server
  updateTask(updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask);
  }

  // Delete a task from the server using the task ID
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }
}
