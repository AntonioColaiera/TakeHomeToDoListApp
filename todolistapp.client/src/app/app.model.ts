import { v4 as uuidv4 } from 'uuid';

export class Task {
  constructor(
    public id: string = uuidv4(),
    public title: string = '',
    public contents: string = '',
    public createdAt: Date = new Date()
  ) {}
}
