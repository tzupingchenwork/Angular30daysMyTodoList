// 資料物件模型
export class Todo {
  private title = '';
  private completed = false;

  constructor(title: string) {
    this.title = title || ''; // 為避免傳入的值為 Falsy 值，稍作處理
  }

  get done(): boolean {
    return this.completed;
  }
  getTitle(): string {
    return this .title;
  }
  toggleCompletion(): void {
    this.completed = !this.completed;
  }
}
