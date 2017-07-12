import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoService } from '../../app/models/category-model';
import { Category } from '../../app/models/category-model';
import { ModalController } from 'ionic-angular';
import { AddGoalModalPage } from '../add-goal-modal/add-goal-modal';
import { TodoItem, TodoPriority } from '../../app/models/todo-model';

@Component({
  selector: 'page-todo',
  providers: [TodoService],
  templateUrl: 'todo.html'
})


export class TodoPage {

  todoCategories: Array<Category>;
  
  editEnabled: boolean;
  btnName: any = 'edit'; 
  constructor(private todoService: TodoService, public navCtrl: NavController, public modalCtrl: ModalController) {
      this.todoCategories =  this.todoService.getCategories();
      this.editEnabled = false;
      for(var i =0; i<this.todoCategories.length;i++){
          (this.todoCategories[i] as any).show = false;
      }
  }
  
  toggleGroup(category: Category) {
      (category as any).show = !(category as any).show;
      for(var i=0;i<this.todoCategories.length;i++){
          if(category!=this.todoCategories[i]){
              (this.todoCategories[i] as any).show = false;
          }
      }
      this.editEnabled=false;
      this.btnName = 'edit';
  }
  
  toggleEdit() {
      if(this.btnName == 'edit')
        {
            this.btnName = 'Done';
            this.editEnabled = true;
        }
    else
        {
            this.btnName = 'edit';
            this.editEnabled = false;
            this.updateAll();
        }
  }    
    
  isGroupShown(category: Category) {
      return (category as any).show;
  }
    
  updateAll() {
    window.localStorage.setItem("SavedAtomIEPData", JSON.stringify(this.todoCategories));
  }
  
  updateTodo(todo: TodoItem, category: Category) {
      if(todo.isDone){
            (todo as any).doneDate = new Date().toJSON();
            category.todos.push(category.todos.splice(category.todos.indexOf(todo), 1)[0]);
      } else{
          (todo as any).doneDate = null;
          var oldIndex = category.todos.indexOf(todo);
          var arrayClone = category.todos.slice();
          arrayClone.splice(oldIndex,1);
          arrayClone.splice(0,0,todo);
      }
      this.updateAll();
  }
    
  openAddGoalModal(category: Category) {
      let newTodo = new TodoItem(null,null,null,null);
      let newGoalModal = this.modalCtrl.create(AddGoalModalPage, {categoryName: (category as any).title, create: true, todoItem: newTodo});
      newGoalModal.onDidDismiss(data => {
          if(data!=null){
            newTodo = new TodoItem(data.todoTitle, data.details, TodoPriority[TodoPriority[data.priority]], new Date(data.dueBy).toISOString());
            this.todoCategories[this.todoService.getCategoriesNames().indexOf(data.category)].todos.push(newTodo);
            this.updateAll();
          }
      });
      newGoalModal.present();
  }
    
  removeItem(todo: TodoItem, category: Category) {
      var index = category.todos.indexOf(todo,0);
      if(index > -1){
          category.todos.splice(index, 1);
          this.updateAll();
      }
  }
    
  reorderItems(indexes, category: Category) {
        let element = category.todos[indexes.from];
        category.todos.splice(indexes.from, 1);
        category.todos.splice(indexes.to, 0, element);
  }
      
  DisplayDetails(todo: TodoItem, category: Category){
      let todoModal = this.modalCtrl.create(AddGoalModalPage, {categoryName: (category as any).title, create: false, todoItem: todo});
      todoModal.onDidDismiss(data => {
          if(data) {
              todo.priority = data.priority;
              todo.title = data.todoTitle;
              todo.details = data.details;
              todo.dueBy =  new Date(data.dueBy).toJSON();
              this.updateAll();
          }
      });
      todoModal.present();
  }    
}