import { Component } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { TodoService } from '../../app/models/category-model';

@Component({
  selector: 'page-home',
  providers: [TodoService],
  templateUrl: 'home.html'
})
export class HomePage {

    ionViewWillEnter() {
       this.pieChartData = this.todoService.getPieChartData();
    }
    
    pieChartData:number[] = [];
    
  constructor(public navCtrl: NavController, private todoService: TodoService) {

  }

  public pieChartLabels:string[] = ['Todo Goals', 'General','Work', 'Education', 'Medical', 'Home/Living', 'Social/Recreation', 'Parent/Guardianship'];
  public pieChartType:string = 'pie';
 
  public chartClicked(e:any):void {
  }
  
  public barChartOptions:any = {
       legend: {
            display: false
      },
      tooltips: {
            enabled: false
      }
  };
   public chartColors: any[] = [{ backgroundColor: ['#eee', '#79b586', '#82c5bf', '#7da0cf', '#b47ab1', '#e8808e', '#f99876', '#fecd92']}];
    
    openProgressPage() {
        console.log("Opening Progress Page");
        var t: Tabs = this.navCtrl.parent;
        t.select(2);
    }
}
