import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { StrategicGoalsService } from 'api/repository/services/strategic-goals.service';
import { FormControl, Validators } from '@angular/forms';
import {
  RatingLevel
} from 'api/repository/models';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { ProjectService } from 'src/app/services/project.service';
import { UtilService } from 'src/app/services/util.service';
import { Languages } from 'api/repository/models/languages';
import { Patterns } from 'api/repository/models/patterns';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { StrategicGoals } from 'api/repository/models';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  
  isDataLoading = true;
  ratingLevel = RatingLevel;
  enumKeys: any;
  enumKeys2: any;
  languages = Languages;
  patterns = Patterns;
  strategicGoalsList: any = [];
  selectedStrategicGoals?: StrategicGoals;

  cumulatedimplementedPattern1 = 0;
  cumulatedimplementedPattern2 = 0;
  cumulatedimplementedPattern3 = 0;
  cumulatedpreferredPattern1 = 0;
  cumulatedpreferredPattern2 = 0;
  cumulatedpreferredPattern3 = 0;
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
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService,
    public strategicGoalsService: StrategicGoalsService,
    public utilService: UtilService

  ) { 
    this.enumKeys = Object.keys(this.languages);
    this.enumKeys2 = Object.keys(this.patterns);
  }

  ngOnInit(): void {
    
    this.isDataLoading = true;
    Promise.all([
      this.projectService.requestStrategicGoalsAttributes(),
      this.recommendation()
      //this.attributesService.requeststrategicGoalsAttributes()
    ]).then(() => {
      this.strategicGoalsList = this.projectService.strategicGoals.value;
      this.updatingStrategicGoalsList = Object.assign([], this.strategicGoalsList);
      //this.qualityList = this.attributesService.getQualitiesByCategory(
      //this.QualityCategories.Attribute
      //);  
      if(this.loadedonce == false){//emergency solution
      //this.deleteAll();//emergency solution
      //this.addEmptyStrategicGoals();
      this.loadedonce = true;
    }
     
      this.isDataLoading = false;
    });
  
  }

  recommendation(){
    //if(this.cumulatedimplementedPattern1>this.cumulatedpreferredPattern2){

    if(1==1){  
      //ampel rot
      const redLight = document.getElementById('red') as HTMLInputElement | null;
      if(redLight!=null){
      redLight.checked = true;
      window.alert("Ampel rot");
    }
    }
    else if(2<1){
      //ampel grün
      window.alert("Ampel grün");
    }
    else{
      //ampel gelb
      window.alert("Ampel gelb");
    }
  }
  
  addEmptyStrategicGoals(): void {
    let emptyStrategicGoals: StrategicGoals = {
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
      next:(data: ConfirmDialogData) => {
        if(data == null) return;

        if(strategicGoals.strategicGoalsId != null){
          this.deletingStrategicGoalsList.push(strategicGoals);
        }

        let indexList = this.strategicGoalsList.indexOf(strategicGoals) ?? -1;
        if(indexList != -1){
          this.strategicGoalsList.splice(indexList, 1);
        }
        this.selectedStrategicGoals = undefined;

        let indexUpdate = this.updatingStrategicGoalsList.indexOf(strategicGoals) ?? -1;
        if(indexUpdate !== -1){
          this.updatingStrategicGoalsList.splice(indexUpdate, 1);
        }
        let indexNext = this.newStrategicGoalsList.indexOf(strategicGoals) ?? -1;
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
    if(currentStrategicGoals === this.selectedStrategicGoals){
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
              this.utilService.callSnackBar('Project Description could not be created.');
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
              this.utilService.callSnackBar('Project Description could not be deleted.');
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
              this.utilService.callSnackBar('Project Description could not be updated.');
            }
          });
      });
      this.updatingStrategicGoalsList.splice(0);
    }
  }

  saveChanges(){
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