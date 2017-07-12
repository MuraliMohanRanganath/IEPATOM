import { Component } from '@angular/core';

import { TodoPage } from '../todo/todo';
import { ProgressPage } from '../progress/progress';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TodoPage;
  tab3Root = ProgressPage;

  constructor() {

  }
}
