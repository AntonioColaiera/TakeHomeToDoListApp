import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

// Application routes definition (can be useful for future implementations)
const routes: Routes = [
  // Define the route for the AppComponent when the URL is 'api/ToDoList'
  { path: 'api/ToDoList', component: AppComponent } 
];

@NgModule({
  // Import the routing module and define the application routes
  imports: [RouterModule.forRoot(routes)],
  // Export the routing module for use within the application 
  exports: [RouterModule]
})
export class AppRoutingModule { }
