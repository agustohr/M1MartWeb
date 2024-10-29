import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faMoneyCheckDollar, faRectangleList, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { DashboardService } from './dashboard.service';
import { Dashboard, MonthlySalesTrend } from './dashboard.model';
import { CurrencyPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule, CurrencyPipe, BaseChartDirective, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userIcon = faUser;
  categoryIcon = faLayerGroup;
  productIcon = faBox;
  transactionIcon = faRectangleList;
  incomeIcon = faMoneyCheckDollar;
  dataDashboard: Dashboard = {} as Dashboard;
  monthlySalesTrend: MonthlySalesTrend[] = [];
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  monthlySalesAmountValue!: number[];
  monthlyTotalIncomeValue!: number[];
  formFilter: FormGroup = new FormGroup({
    year: new FormControl<string>(''),
  });
  
  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
    this.loadDashboard();

    this.formFilter.valueChanges.pipe(
      // debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe(() => {
      this.loadMonthlySalesTrend(this.formFilter.value.year);
    });
  }

  loadDashboard(){
    this.dashboardService.getData().subscribe(res => {
      this.dataDashboard = res.data;
      this.monthlySalesTrend = res.data.monthlySalesTrend;
      this.formFilter.patchValue({year: this.dataDashboard.monthlySalesTrend[0].year.toString()});
      this.loadChart();
    })
  }

  loadMonthlySalesTrend(year: number){
    this.dashboardService.getMonthlySales(year).subscribe(res => {
      console.log(res.data);
      
      this.monthlySalesTrend = res.data;

      this.loadChart();
    })
  }

  loadChart(){
    this.monthlySalesAmountValue = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.monthlyTotalIncomeValue = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.monthlySalesTrend.forEach(x => {
      this.monthlySalesAmountValue[x.month - 1] = x.monthlySalesAmount;
      this.monthlyTotalIncomeValue[x.month - 1] = x.monthlyTotalIncome;
    });
    this.lineChartDataSalesAmount = [
      { data: this.monthlySalesAmountValue, label: 'Total Amount Sales' },
    ];
    this.lineChartDataTotalIncome = [
      { data: this.monthlyTotalIncomeValue, label: 'Total Income' },
    ];
    this.lineChartLabels = this.months;
  }


  //======================
  // Line chart data
  public lineChartDataSalesAmount: Array<any> = [];
  public lineChartDataTotalIncome: Array<any> = [];

  // Line chart labels
  public lineChartLabels: Array<any> = [];

  // Chart options
  public lineChartOptions: any = {
    responsive: true,
  };

  // Colors for chart
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  // Other options
  public lineChartLegend = true;
  public lineChartType = 'line';

  // Events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


}
