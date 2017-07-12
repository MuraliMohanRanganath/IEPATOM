import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoPriority, TodoItem } from '../../app/models/todo-model';
import { TodoService } from '../../app/models/category-model';

@Component({
  selector: 'page-add-goal-modal',
  providers: [TodoService],    
  templateUrl: 'add-goal-modal.html',    
})

export class AddGoalModalPage {

  addTodoForm : FormGroup;
  submitAttempt : Boolean;
  priorityValues: Array<string>;
  categoryValues: Array<string>;  
  isCreatePage : Boolean;
  isEditDisabled : Boolean;
  toDo : TodoItem;
  minimumYear: string;
  maximumYear: string;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, private todoService: TodoService) {
      this.priorityValues = Object.keys(TodoPriority).filter(key => !isNaN(Number(TodoPriority[key])));
      this.categoryValues = this.todoService.getCategoriesNames();
      
      if(navParams.get('create')){
          this.isCreatePage = true;
          this.addTodoForm = formBuilder.group({
          todoTitle: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
          details: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
          priority: ['NONE',Validators.required],
          dueBy: [''],
          category:[navParams.get('categoryName')]
      });
          this.isEditDisabled = false;
          var date: Date = new Date();
          this.minimumYear = (date.getFullYear())+"";
          this.maximumYear = (date.getFullYear()+10)+"";
      }else {
          this.isCreatePage = false;
          this.isEditDisabled = true;
          this.toDo = navParams.get('todoItem');
          this.addTodoForm = formBuilder.group({
          todoTitle: [this.toDo.title, Validators.compose([Validators.maxLength(50), Validators.required])],
          details: [this.toDo.details, Validators.compose([Validators.maxLength(200), Validators.required])],
          priority: [this.toDo.priority, Validators.required],
          dueBy: [this.toDo.dueBy==null ? '' : new Date(this.toDo.dueBy).toJSON()],
          category:[navParams.get('categoryName')]
      });
         var date: Date = new Date();
         this.minimumYear = (date.getFullYear())+"";
         this.maximumYear = (date.getFullYear()+10)+""; 
      }
  }

  ionViewDidLoad() {
  }
    
  closeModal(create: Boolean) {
      if(create){
          let data = this.addTodoForm.value;
          data.isNewGoal = false;
          console.log(new Date(data.dueBy).toJSON());
          this.viewCtrl.dismiss(data);
      }
      else {
          this.viewCtrl.dismiss();
      }
  }
  
  save() {
      this.submitAttempt = true;
      console.log(this.addTodoForm.value);
      this.closeModal(true);
  }
  cancel() {
      this.closeModal(false);
  }
  
  editTodo() {
      this.isEditDisabled = false;
  }
}