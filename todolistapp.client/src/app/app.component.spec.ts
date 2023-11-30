import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { v4 as uuidv4 } from 'uuid';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  // Setting up testing module with necessary imports
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  // Initializing component and HttpTestingController
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Verifying that there are no outstanding requests after each test
  afterEach(() => {
    httpMock.verify();
  });

  // Test to check if the component is created successfully
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Test to retrieve tasks from the mock server
  it('should retrieve tasks from the server', () => {
    // Mock tasks data
    const mockTasks = [
      {
        id: uuidv4(),
        title: 'Buy bread',
        contents: 'Go to the supermarket',
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Wash dishes',
        contents: 'Put in the dishwasher',
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Grocery shopping',
        contents: 'Buy meat, fruits, and vegetables',
        createdAt: new Date()
      }
    ];

    // Triggering ngOnInit and expecting GET request to retrieve tasks
    component.ngOnInit();
    const req = httpMock.expectOne('https://localhost:7259/api/ToDoList');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks);

    // Verifying if the retrieved tasks match the expected mock tasks
    expect(component.tasks).toEqual(mockTasks);
  });

  // Test to add a task to the server
  it('should add a task to the server', () => {
    // Setting up task data to add
    component.title = 'Buy milk';
    component.contents = 'Go to the store';

    const newTask = { 
      id: uuidv4(), 
      title: 'Buy milk', 
      contents: 'Go to the store',  
      createdAt: new Date()
    };

    // Triggering addTask and expecting POST request to add a task
    component.addTask();

    const req = httpMock.expectOne('https://localhost:7259/api/ToDoList');
    expect(req.request.method).toEqual('POST');
    const body = req.request.body;
    expect(body.title).toEqual('Buy milk');
    expect(body.contents).toEqual('Go to the store');

    // Flushing mock response and verifying if the task was added
    req.flush(newTask);
    expect(component.tasks).toContain(newTask);
  });

  // Test to update a task on the server
  it('should update a task on the server', () => {
    // Checking if tasks array is empty
    if (!component.tasks[0]) {
      return;
    }

    // Modifying task details
    const id = component.tasks[0].id;
    component.tasks[0].title = 'Buy flour';
    component.tasks[0].contents = 'Go to the bakery';
    component.updateTask(0, 'Buy flour', 'Go to the bakery');

    // Expecting PUT request to update the task
    const req = httpMock.expectOne(`https://localhost:7259/api/ToDoList/${id}`);
    expect(req.request.method).toEqual('PUT');
    const body = req.request.body;
    expect(body.id).toEqual(id);
    expect(body.title).toEqual('Buy flour');
    expect(body.contents).toEqual('Go to the bakery');

    // Flushing mock response and verifying if the task was updated
    req.flush({ message: 'ok 1' });

    expect(component.tasks[0]).toEqual(
      { id: id, title: 'Buy flour', contents: 'Go to the bakery', createdAt: new Date() }
    );
  });

  // Test to delete a task from the server
  it('should delete a task from the server', () => {
    // Checking if tasks array is empty
    if (!component.tasks[0]) {
      return;
    }

    // Removing a task
    const id = component.tasks[0].id;
    component.deleteTask(0);

    // Expecting DELETE request to remove the task
    const req = httpMock.expectOne(`https://localhost:7259/api/ToDoList/${id}`);
    expect(req.request.method).toEqual('DELETE');
    const body = req.request.body;
    expect(body.id).toEqual(id);

    // Flushing mock response and verifying if the task was deleted
    req.flush({ message: 'ok 2' });

    expect(component.tasks).not.toContain(
      { id: id, title: 'Buy bread', contents: 'Go to the supermarket', createdAt: new Date() }
    );
  });
});
