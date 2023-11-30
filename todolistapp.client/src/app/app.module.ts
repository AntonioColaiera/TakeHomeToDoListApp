import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoListService } from './app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent // Declaring the main AppComponent
  ],
  imports: [
    BrowserModule, // Importing BrowserModule for browser-specific features
    HttpClientModule, // Importing HttpClientModule for handling HTTP requests
    FormsModule, // Importing FormsModule for two-way data binding (used in forms)
    BrowserAnimationsModule // Importing BrowserAnimationsModule for animations support
  ],
  providers: [
    TodoListService // Providing TodoListService as a service within the application
  ],
  bootstrap: [AppComponent] // Defining the AppComponent as the root component to bootstrap the application
})
export class AppModule { }
