import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TodoPage } from '../pages/todo/todo';
import { ProgressPage } from '../pages/progress/progress';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddGoalModalPage } from '../pages/add-goal-modal/add-goal-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ChartModule } from 'angular2-highcharts';
import { ElasticModule } from 'angular2-elastic';

declare var require: any;

@NgModule({
  declarations: [
    MyApp,
    TodoPage,
    ProgressPage,
    HomePage,
    TabsPage,
    AddGoalModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
        scrollAssist: false,
        autoFocusAssist: false
    }),
    FormsModule,
    ChartsModule,
    ElasticModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodoPage,
    ProgressPage,
    HomePage,
    TabsPage,
    AddGoalModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
