import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faRectangleList, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userIcon = faUser;
  categoryIcon = faLayerGroup;
  productIcon = faBox;
  transactionIcon = faRectangleList;
  dataDashboard!: Dashboard;
  
  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
    this.dashboardService.getData().subscribe(res => {
      this.dataDashboard = res.data
    })
  }


}
