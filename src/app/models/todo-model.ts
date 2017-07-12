export enum TodoPriority {
      NONE=0,
      LOW=1,
      MEDIUM=2,
      HIGH=3
    }

export class TodoItem {
    title: string;
    details: string;
    isDone: boolean;
    created: string;
    priority: TodoPriority;
    dueBy: string;
    doneDate: string;
    
    constructor(todotitle: string, todoDetails: string, todopriority: TodoPriority, todoDueBy: string) {
        this.title = todotitle;
        this.details = todoDetails;
        this.priority = todopriority;
        this.dueBy = todoDueBy;
        this.isDone = false;
        this.created =  new Date().toJSON();
        this.doneDate = null;
    }
}