import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  OnInit,AfterViewInit
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { StrategicGoalsService } from 'api/repository/services/strategic-goals.service';
import { FormControl, Validators } from '@angular/forms';
import { RatingLevel } from 'api/repository/models';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { ProjectService } from 'src/app/services/project.service';
import { UtilService } from 'src/app/services/util.service';
import { Languages } from 'api/repository/models/languages';
import { Patterns } from 'api/repository/models/patterns';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { StrategicGoals } from 'api/repository/models';
import { AssessmentComponent } from '../assessment/assessment.component';
//import * as d3 from 'd3';
//import * as d3Scale from 'd3';
//import * as d3Shape from 'd3';
//import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
//import { BaseChartDirective } from 'ng2-charts';
import { AssessmentService } from 'api/repository/services/assessment-service';
//import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements AfterViewInit {
  //@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  isDataLoading = true;
  ratingLevel = RatingLevel;
  enumKeys: any;
  enumKeys2: any;
  languages = Languages;
  patterns = Patterns;
  strategicGoalsList: any = [];
  selectedStrategicGoals?: StrategicGoals;

  greenLight = false;
  yellowLight = false;
  redLight = false;

  cumulatedimplementedPattern1 = this.assessmentService.cumulatedimplementedPattern1;
  
  cumulatedimplementedPattern2 = this.assessmentService.cumulatedimplementedPattern2;
  cumulatedimplementedPattern3 = this.assessmentService.cumulatedimplementedPattern3;
  cumulatedpreferredPattern1 = this.assessmentService.cumulatedpreferredPattern1;
  cumulatedpreferredPattern2 = this.assessmentService.cumulatedpreferredPattern2;
  cumulatedpreferredPattern3 = this.assessmentService.cumulatedpreferredPattern3;


/*  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      //datalabels: {
        //anchor: 'end',
        //align: 'end',
      //},
    },
  };
  public barChartType: ChartType = 'bar';
  //public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    //this.chart?.update();
  }*/
  /*/private data = [
    { Framework: 'Vue', Stars: '166443', Released: '2014' },
    { Framework: 'React', Stars: '150793', Released: '2013' },
    { Framework: 'Angular', Stars: '62342', Released: '2016' },
    { Framework: 'Backbone', Stars: '27647', Released: '2010' },
    { Framework: 'Ember', Stars: '21471', Released: '2011' }
  ];
  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;
  private createSvg(): void {
    this.svg = d3
      .select('img.images')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.Framework))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 200000]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.Framework))
      .attr('y', (d: any) => y(d.Stars))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.Stars))
      .attr('fill', '#d04a35');
  }*/

  /*chart: any;

  chartOptions = {
    title:{
      text: "Total Impressions by Platforms"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: "K"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###K",
      dataPoints: [
        { label: "Snapchat", y: 15 },
        { label: "Instagram", y: 20 },
        { label: "YouTube", y: 24 },
        { label: "Twitter", y: 29 },
        { label: "Facebook", y: 73 }
      ]
    }]
  }*/

  loadedonce = false;

  deletingStrategicGoalsList = new Array<StrategicGoals>();
  newStrategicGoalsList = new Array<StrategicGoals>();
  updatingStrategicGoalsList = new Array<StrategicGoals>();

  constructor(
    public AssessmentComponent: AssessmentComponent,
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService,
    public strategicGoalsService: StrategicGoalsService,
    public utilService: UtilService,
    public assessmentService: AssessmentService
  ) {
    this.enumKeys = Object.keys(this.languages);
    this.enumKeys2 = Object.keys(this.patterns);
  }

  ngAfterViewInit(): void {
    //this.createSvg();
    //this.drawBars(this.data);
    this.summarylogger();
    this.isDataLoading = true;
    Promise.all([
      this.projectService.requestStrategicGoalsAttributes(),
      
      //this.attributesService.requeststrategicGoalsAttributes()
    ]).then(() => {
      this.strategicGoalsList = this.projectService.strategicGoals.value;
      this.updatingStrategicGoalsList = Object.assign(
        [],
        this.strategicGoalsList
      );
      //this.qualityList = this.attributesService.getQualitiesByCategory(
      //this.QualityCategories.Attribute
      //);
      if (this.loadedonce == false) {
        //emergency solution
        //this.deleteAll();//emergency solution
        //this.addEmptyStrategicGoals();
        this.loadedonce = true;
      }

      this.isDataLoading = false;
    });
  }
 
  summarylogger(){this.recommendation();
    console.log(this.cumulatedimplementedPattern1);
    console.log(this.cumulatedimplementedPattern2);
    console.log(this.cumulatedimplementedPattern3);
    console.log(this.cumulatedpreferredPattern1);
    console.log(this.cumulatedpreferredPattern2);
    console.log(this.cumulatedpreferredPattern3);
    console.log(this.assessmentService.cumulatedimplementedPattern1);
    console.log(this.assessmentService.cumulatedimplementedPattern2);
    console.log(this.assessmentService.cumulatedimplementedPattern3);
    console.log(this.assessmentService.cumulatedpreferredPattern1);
    console.log(this.assessmentService.cumulatedpreferredPattern2);
    console.log(this.assessmentService.cumulatedpreferredPattern3);
  }

  recommendation() {
    //if(this.cumulatedimplementedPattern1>this.cumulatedpreferredPattern2){

    if (this.assessmentService.cumulatedimplementedPattern1>this.assessmentService.cumulatedpreferredPattern2) {
        //window.alert('Ampel rot');
        this.redLight = true;
        this.yellowLight = false;
        this.greenLight = false;
    } else if (this.assessmentService.cumulatedimplementedPattern1<this.assessmentService.cumulatedpreferredPattern2) {
      //ampel grün
      //window.alert('Ampel grün');
      this.greenLight = true;
      this.yellowLight = false;
      this.redLight = false;
    } else if (this.assessmentService.cumulatedimplementedPattern1==this.assessmentService.cumulatedpreferredPattern2){
      //ampel gelb
      //window.alert('Ampel gelb');
      this.yellowLight = true;
      this.greenLight = false;
      this.redLight = false;
    }
  }

  addEmptyStrategicGoals(): void {
    const emptyStrategicGoals: StrategicGoals = {
      method: '',
      owner: '',
      participants: ''
    };
    this.strategicGoalsList.push(emptyStrategicGoals);
    this.newStrategicGoalsList.push(emptyStrategicGoals);
  }

  deleteStrategicGoals(strategicGoals: StrategicGoals): void {
    const data: ConfirmDialogData = {
      title: 'Delete Project Description',
      message: `Do you really want to delete the Project Description "${strategicGoals.strategicGoalsId}"?`,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data == null) return;

          if (strategicGoals.strategicGoalsId != null) {
            this.deletingStrategicGoalsList.push(strategicGoals);
          }

          const indexList =
            this.strategicGoalsList.indexOf(strategicGoals) ?? -1;
          if (indexList != -1) {
            this.strategicGoalsList.splice(indexList, 1);
          }
          this.selectedStrategicGoals = undefined;

          const indexUpdate =
            this.updatingStrategicGoalsList.indexOf(strategicGoals) ?? -1;
          if (indexUpdate !== -1) {
            this.updatingStrategicGoalsList.splice(indexUpdate, 1);
          }
          const indexNext =
            this.newStrategicGoalsList.indexOf(strategicGoals) ?? -1;
          if (indexNext !== -1) {
            this.newStrategicGoalsList.splice(indexNext, 1);
          }
        }
      });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  strategicGoalsSelected(strategicGoals: StrategicGoals): void {
    this.selectedStrategicGoals = strategicGoals;
  }
  checkCurrentStrategicGoals(currentStrategicGoals?: StrategicGoals): boolean {
    if (currentStrategicGoals === this.selectedStrategicGoals) {
      return true;
    } else {
      return false;
    }
  }
  //counter für alle implementables
  //output graph
  //ende Ampel

  allNamesSet(): boolean {
    return !this.strategicGoalsList.some(
      (s: any) => s.name == undefined || s.name == ''
    );
  }

  createAll() {
    if (this.newStrategicGoalsList.length > 0) {
      this.newStrategicGoalsList.forEach((e) => {
        this.strategicGoalsService
          .addStrategicGoals({
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar(
                'Project Description could not be created.'
              );
            }
          });
      });
      this.newStrategicGoalsList.splice(0);
    }
  }

  deleteAll() {
    if (this.deletingStrategicGoalsList.length > 0) {
      this.deletingStrategicGoalsList.forEach((e) => {
        this.strategicGoalsService
          .deleteStrategicGoals({
            id: e.strategicGoalsId!
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar(
                'Project Description could not be deleted.'
              );
            }
          });
      });
      this.deletingStrategicGoalsList.splice(0);
    }
  }

  updateAll() {
    if (this.updatingStrategicGoalsList.length > 0) {
      this.updatingStrategicGoalsList.forEach((e) => {
        this.strategicGoalsService
          .updateStrategicGoals({
            id: e.strategicGoalsId!,
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar(
                'Project Description could not be updated.'
              );
            }
          });
      });
      this.updatingStrategicGoalsList.splice(0);
    }
  }

  saveChanges() {
    const data: ConfirmDialogData = {
      title: 'Save Changes?',
      message: `Do you really want to save all changes?`,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data == null) return;
          this.fireAll();
        }
      });
  }

  fireAll() {
    this.createAll();
    this.deleteAll();
    this.updateAll();
  }

  //if monolith<micro = green
  //if monolith>micro = red
  //if monolith==micro = yellow
  //gloabl ownership,method,
}
            