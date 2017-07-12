import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoService } from '../../app/models/category-model';
declare var require: any;
const Highcharts = require('highcharts');

@Component({
  selector: 'page-progress',
  providers: [TodoService],
  templateUrl: 'progress.html'
})

export class ProgressPage {

    ionViewWillEnter() {
       this.pieChartData = this.todoService.getPieChartData();
       this.lineChartData = this.todoService.getLineChartData();
       this.lineChartOptions.series[0].data = this.lineChartData;
        if(this.chart!=null){
            console.log("redrawing");
          this.chart.series[0].setData(this.lineChartData,true);  
        }
        
    }
    
    chart: any;
    pieChartData:number[] = [];
    lineChartData = this.todoService.getLineChartData();
    
    constructor(public navCtrl: NavController,private todoService: TodoService) {
        
    }
    saveInstance(chartInstance:any):void {
        console.log("Saving chart");
        this.chart = chartInstance;
    }
    ionViewDidLoad() {
        console.log("Progress");
  }
  public pieChartLabels:string[] = ['Todo Goals', 'General','Work', 'Education', 'Medical', 'Home/Living', 'Social/Recreation', 'Parent/Guardianship'];
  public pieChartType:string = 'pie';
 
  public chartClicked(e:any):void {
      
  }
  
  public barChartOptions:any = {
      legend: {
          position: 'bottom',
          onClick: function(e, legendItem){
              console.log("Disabled");
          }
      }
  }
  
  public chartColors: any[] = [{ backgroundColor: ['#eee', '#79b586', '#82c5bf', '#7da0cf', '#b47ab1', '#e8808e', '#f99876', '#fecd92']}];
  
    public lineChartOptions = {
      
        chart: {
            zoomType: 'x',
            width: window.innerWidth
        },
        title: {
            text: 'Goals done over time'
        },
        subtitle: {
            text: 'Pinch chart to zoom'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Goals done'
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Goals completed',
            data: this.lineChartData
        }]
    
  };
}