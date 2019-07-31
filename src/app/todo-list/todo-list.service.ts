import { Injectable } from '@angular/core';
// class
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private list: Todo[] = [];

  constructor() { }

  getList(): Todo[] {
    return this.list;
  }

  add(title: string): void {
    if (title || title.trim()) {
      this.list.push(new Todo(title));
    }
  }
  remove(index: number): void {
    this.list.splice(index, 1);
  }

}
