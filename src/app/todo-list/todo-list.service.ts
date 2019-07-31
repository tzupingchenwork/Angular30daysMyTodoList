import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() { }
  private list: string[] =  [];

  getList(): string[] {
    return this.list;
  }

  add(title: string): void {
    if (title || title.trim()) {
      this.list.push(title);
    }
  }

}
