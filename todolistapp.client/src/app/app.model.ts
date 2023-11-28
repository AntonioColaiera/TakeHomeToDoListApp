import { v4 as uuidv4 } from 'uuid';

export class Task {
  constructor(
    public Id: string = uuidv4(),
    public Title: string = '',
    public Contents: string = '',
    public CreatedAt: Date = new Date()
  ) {}
}
