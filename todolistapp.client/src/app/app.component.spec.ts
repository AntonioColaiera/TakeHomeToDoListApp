import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { v4 as uuidv4 } from 'uuid';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve tasks from the server', () => {
    const mockTasks = [
      {
        id: uuidv4(),
        title: 'Comprare il pane',
        contents: 'Andare al supermercato',
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Lavare i piatti',
        contents: 'Mettere in lavastoviglie',
        createdAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Fare la spesa',
        contents: 'Comprare carne, frutta e verdura',
        createdAt: new Date()
      }
    ];

    component.ngOnInit();
    const req = httpMock.expectOne('https://localhost:7259/api/ToDoList');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks);

    expect(component.tasks).toEqual(mockTasks);
  });

  it('should add a task to the server', () => {
    component.title = 'Comprare il latte';
    component.contents = 'Andare al negozio';

    const newTask = { 
      id: uuidv4(), 
      title: 'Comprare il latte', 
      contents: 'Andare al negozio',  
      createdAt: new Date()
    };

    component.addTask();

    const req = httpMock.expectOne('https://localhost:7259/api/ToDoList');
    expect(req.request.method).toEqual('POST');
    const body = req.request.body;
    expect(body.title).toEqual('Comprare il latte');
    expect(body.contents).toEqual('Andare al negozio');

    req.flush(newTask);

    expect(component.tasks).toContain(newTask);
  });

  it('should update a task on the server', () => {
    if (!component.tasks[0]) {
      return;
    }

    const id = component.tasks[0].id;
    component.tasks[0].title = 'Comprare la farina';
    component.tasks[0].contents = 'Andare al forno';
    component.updateTask(0, 'Comprare la farina', 'Andare al forno');

    const req = httpMock.expectOne(`https://localhost:7259/api/ToDoList/${id}`);
    expect(req.request.method).toEqual('PUT');
    const body = req.request.body;
    expect(body.id).toEqual(id);
    expect(body.title).toEqual('Comprare la farina');
    expect(body.contents).toEqual('Andare al forno');

    req.flush({ message: 'ok 1' });

    expect(component.tasks[0]).toEqual(
      { id: id, title: 'Comprare la farina', contents: 'Andare al forno', createdAt: new Date() }
    );
  });

  it('should delete a task from the server', () => {
    if (!component.tasks[0]) {
      return;
    }

    const id = component.tasks[0].id;
    component.deleteTask(0);

    const req = httpMock.expectOne(`https://localhost:7259/api/ToDoList/${id}`);
    expect(req.request.method).toEqual('DELETE');
    const body = req.request.body;
    expect(body.id).toEqual(id);

    req.flush({ message: 'ok 2' });

    expect(component.tasks).not.toContain(
      { id: id, title: 'Comprare il pane', contents: 'Andare al supermercato', createdAt: new Date() }
    );
  });
});
