import { Component, OnInit } from '@angular/core';

// Service
import { TodoListService } from './todo-list.service';

// Class
import { Todo } from './todo.model';
import { TodoStatusType } from './todo-status-type.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoListService: TodoListService ) {}
  todoStatusType = TodoStatusType;
  private status = TodoStatusType.ALL;
  ngOnInit() {
  }
  addTodo(inputRef: HTMLInputElement): void {

    const todo = inputRef.value.trim();
    if (todo) {
        this.todoListService.add(todo);
        inputRef.value = '';
    }
  }
  // 取得清單
  getList(): Todo[] {

    let list: Todo[] = [];
    switch (this.status) {
      case TodoStatusType.Active:
        list = this.getRemainingList();
        break;
      case TodoStatusType.Completed:
        list = this.getCompletedList();
        break;
      default:
        list = this.todoListService.getList();
        break;
    }
    return list;
  }
  remove(index: number): void {
    this.todoListService.remove(index);
  }
  removeCompleted(): void {
    this.todoListService.removeCompleted();
  }

  // 編輯待辦清單
  edit(todo: Todo): void {
    todo.editable = true;
  }
  // 更新代辦清單
  update(todo: Todo, newTitle: string): void {
    const title = newTitle.trim();

    if (title) {
      todo.setTitle(title);
      todo.editable = false;
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }
  }

  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }

  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }
  getCompletedList(): Todo[] {
    return this.todoListService.getWithCompleted(true);
  }
  setStatus(status: number): void {
    this.status = status;
  }
  checkStatus(status: number): boolean {
    return this.status === status;
  }
  // 取得所有的待辦事項清單（不受狀態影響）
  getAllList(): Todo[] {
    return this.todoListService.getList();
  }
  // 所有的代辦事項是否都已完成
  allCompleted(): boolean {
    return this.getAllList().length === this.getCompletedList().length;
  }
  // 設定所有的待辦事項已完成/未完成
  setAllTo(completed: boolean): void {

    this.getAllList().forEach((todo) => {
      todo.setCompleted(completed);
    });
  }

}
