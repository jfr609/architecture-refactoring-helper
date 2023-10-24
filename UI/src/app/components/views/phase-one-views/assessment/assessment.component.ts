import {
  AfterViewInit,
  Component
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
import { StrategicGoals } from 'api/repository/models';
import { Assessment } from 'api/repository/models/assessment';
import {
  Quality,
  QualityCategory,
  QualitySublevel,
  Scenario
} from 'api/repository/models';
import { StorageService } from 'src/app/services/storage.service';
import { ScenarioService } from 'api/repository/services';
import { AssessmentService } from 'api/repository/services/assessment-service';
import { OnInit } from '@angular/core';
import { QualityAttributesComponent } from '../quality-attributes/quality-attributes.component';
import { local } from 'd3-selection';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements AfterViewInit, OnInit {
  isDataLoading = true;
  ratingLevel = RatingLevel;
  enumKeys: any;
  patternOptions: any;
  enumKeys3: any;
  enumKeys1: any;
  languages = Languages;
  patterns = Patterns;
  strategicGoalsList: any = [];
  assessmentList:any = [];
  assessment:any = [];
  selectedAssessment?: Assessment;
  selectedAssessmentList= new Array<Assessment>();
  deletingAssessmentList = new Array<Assessment>();
  newAssessmentList = new Array<Assessment>();
  updatingAssessmentList = new Array<Assessment>();

  currentSelectedscenario: any = [];

  pastSelectedscenario: any = [];

  selectedStrategicGoals?: StrategicGoals;

  loadedonce = false;
  scenarioList: any = [];
  selectedScenario?: Scenario;

  qualityList: any = [];
  readonly QualityCategories = QualityCategory;
  indeterminateList = new Array<Quality>();

  deletingScenariosList = new Array<Scenario>();
  newScenariosList = new Array<Scenario>();
  updatingScenariosList2 = new Array<Scenario>();
  updatingScenariosList = QualityAttributesComponent.prototype.updatingScenariosList;

  cumulatedimplementedPattern1 = 0;
  cumulatedimplementedPattern2 = 0;
  cumulatedimplementedPattern3 = 0;
  cumulatedpreferredPattern1 = 0;
  cumulatedpreferredPattern2 = 0;
  cumulatedpreferredPattern3 = 0;

  deletingStrategicGoalsList = new Array<StrategicGoals>();
  newStrategicGoalsList = new Array<StrategicGoals>();
  updatingStrategicGoalsList = new Array<StrategicGoals>();

  selectedValues: string[] = [];
  savedrlul: boolean = false;
  constructor(
    public storageService: StorageService,
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService,
    public strategicGoalsService: StrategicGoalsService,
    public utilService: UtilService,
    public scenarioService: ScenarioService,
    public assessmentService: AssessmentService
    

  ) {
    this.enumKeys = Object.keys(this.languages);
     this.enumKeys1 = Object.keys(this.ratingLevel);
    this.patternOptions = Object.values(this.patterns);
    this.enumKeys3 = Object.values(this.patterns);
  }

  ngAfterViewInit(): void {
    this.isDataLoading = true;
    Promise.all([
      this.projectService.requestStrategicGoalsAttributes(),
      this.projectService.requestProjectAttributes(),
      this.attributesService.requestQualities(),
      this.projectService.requestScenarios(),
    ]).then(() => {
      this.scenarioList = this.projectService.scenarios.value;
      this.strategicGoalsList = this.projectService.strategicGoals.value;
      this.updatingStrategicGoalsList = Object.assign([], this.strategicGoalsList);
      this.qualityList = this.attributesService.getQualitiesByCategory(
        this.QualityCategories.Attribute
      );
      this.isDataLoading = false;
    });
}

ngOnInit(): void {
  this.isDataLoading = true;
  Promise.all([
    this.projectService.requestStrategicGoalsAttributes(),
    this.projectService.requestProjectAttributes(),
    this.attributesService.requestQualities(),
    this.projectService.requestScenarios(),
  ]).then(() => {
    this.scenarioList = this.projectService.scenarios.value;
    this.strategicGoalsList = this.projectService.strategicGoals.value;
    this.updatingStrategicGoalsList = Object.assign([], this.strategicGoalsList);
    this.qualityList = this.attributesService.getQualitiesByCategory(
      this.QualityCategories.Attribute
    );
    this.isDataLoading = false;
  });
}
   

  updateValueOccurrencesImplementedPattern() {
    //0 machen for neuem count
    this.assessmentService.cumulatedimplementedPattern1 = 0;
    this.assessmentService.cumulatedimplementedPattern2 = 0;
    this.assessmentService.cumulatedimplementedPattern3 = 0;
    for (let patternsOfscenariolist of this.scenarioList) {
      if(patternsOfscenariolist.implementedPattern != null){
        if(patternsOfscenariolist.implementedPattern.includes('Monolith')){
          this.assessmentService.increaseCumulatedImplementedPattern1();
        } if(patternsOfscenariolist.implementedPattern.includes('Microservices')){
          this.assessmentService.increaseCumulatedImplementedPattern2();
        } if(patternsOfscenariolist.implementedPattern.includes('Model-View-Controller')){
          this.assessmentService.increaseCumulatedImplementedPattern3();
        } if(patternsOfscenariolist.implementedPattern.includes('Pipe-Filter')){
          this.assessmentService.increaseCumulatedImplementedPattern3();
        }
      } 
    }
      console.log(this.assessmentService.cumulatedimplementedPattern1);
      console.log(this.assessmentService.cumulatedimplementedPattern2);
      console.log(this.assessmentService.cumulatedimplementedPattern3);
}
  updateValueOccurrencesPreferredPattern() {
    this.assessmentService.cumulatedpreferredPattern1 = 0;
    this.assessmentService.cumulatedpreferredPattern2 = 0;
    this.assessmentService.cumulatedpreferredPattern3 = 0;
    for (let patternsOfscenariolist of this.scenarioList) {
      if(patternsOfscenariolist.preferredPattern != null){
        if( patternsOfscenariolist.preferredPattern == 'Monolith'){
          this.assessmentService.increaseCumulatedPreferredPattern1();
        } else if( patternsOfscenariolist.preferredPattern == 'Microservices'){
          this.assessmentService.increaseCumulatedPreferredPattern2();
        } else if(patternsOfscenariolist.preferredPattern == 'Model-View-Controller'){
          this.assessmentService.increaseCumulatedPreferredPattern3();
        } else if(patternsOfscenariolist.preferredPattern =='Pipe-Filter'){
          this.assessmentService.increaseCumulatedPreferredPattern3();
        }
      } 
    }
    console.log(this.assessmentService.cumulatedpreferredPattern1);
    console.log(this.assessmentService.cumulatedpreferredPattern2);
    console.log(this.assessmentService.cumulatedpreferredPattern3);
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

  scenarioSelected(scenario: Scenario): void {
    this.selectedScenario = scenario;
  }

  checkCurrentScenario(currentScenario?: Scenario): boolean {
    if (currentScenario === this.selectedScenario) {
      return true;
    } else {
      return false;
    }
  }

  addOrRemoveQuality(selected: boolean, qa: Quality) {
    if (selected) {
      if (!this.selectedScenario?.qualities?.find((e) => e.name === qa.name)) {
        this.selectedScenario?.qualities?.push(qa);
      }
    } else {
      let index =
        this.selectedScenario?.qualities?.findIndex(
          (q) => q.name === qa.name
        ) ?? -1;
      if (index !== -1) {
        this.selectedScenario?.qualities?.splice(index, 1);
      }
    }
  }

  addOrRemoveScenarioForAssessment(qa: Scenario) {
    //this.pastSelectedscenario = false;
    this.currentSelectedscenario = qa;

        this.currentSelectedscenario.description =qa.description;
        this.currentSelectedscenario.importance =qa.importance;
        this.currentSelectedscenario.difficulty =qa.difficulty;
        //this.assessment = '';
        this.assessment.explanation = qa.explanation;
        this.assessment.preferredPattern = qa.preferredPattern;
        this.assessment.implementedPattern = qa.implementedPattern;
       //this.pastSelectedscenario=  this.currentSelectedscenario ;
    
    }


  checkIfQualityExist(name: string): boolean {
    return (
      this.selectedScenario?.qualities?.some((e) => e.name === name) ?? false
    );
  }

  checkIfQualitySubExist(name: string): boolean {
    return (
      this.selectedScenario?.qualitySublevels?.some((e) => e.name === name) ??
      false
    );
  }

  someChecked(name: string): boolean {
    return (
      this.selectedScenario?.qualitySublevels?.some(
        (e) => e.qualityName === name
      ) ?? false
    );
  }

  allChecked(quality: Quality): boolean {
    return (
      quality.qualitySublevels?.every((e) =>
        this.selectedScenario?.qualitySublevels?.some((q) => e.name === q.name)
      ) ?? false
    );
  }

  selectPattern(selected: Boolean, qa: Scenario): boolean {
    this.currentSelectedscenario = qa;
   return true;
  }



  allNamesSet(): boolean {
    return !this.scenarioList.some(
      (s: any) => s.name == undefined || s.name == ''
    );
  }

  /*createAll() {
    if (this.newScenariosList.length > 0) {
      this.newScenariosList.forEach((e) => {
        this.scenarioService
          .addScenario({
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar('Assessment could not be created.');
            }
          });
      });
      this.newAssessmentList.splice(0);
    }
  }

  deleteAll() {
    if (this.deletingScenariosList.length > 0) {
      this.deletingScenariosList.forEach((e) => {
        this.scenarioService
          .deleteScenario({
            id: e.scenarioId!
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar('Assessment could not be deleted.');
            }
          });
      });
      this.deletingScenariosList.splice(0);
    }
  }*/

  updateAll() {
   // if (this.updatingScenariosList.length > 0) {
      this.scenarioList.forEach((e:any) => {
        this.scenarioService
          .updateScenario({
            id: e.scenarioId!,
            body: e
          })
          .subscribe({
            next: (value) => {},
            error: (err) => {
              console.log(err);
              this.utilService.callSnackBar('Assessment could not be updated.');
            }
          });
      });
      //this.scenarioList.splice(0);
   // }
  }
  /*saveValues(){

    this.saveScenarioData();
    for (let patternsOfscenariolist of this.scenarioList) {

     //patternsOfscenariolist.implementedPattern =  this.scenarioList.implementedPattern;
     //patternsOfscenariolist.preferredPattern =  this.scenarioList.preferredPattern;
     //patternsOfscenariolist.explanation =  this.scenarioList.explanation;

    localStorage.setItem('implementedPattern', patternsOfscenariolist.implementedPattern);
    
     this.scenarioList.implementedPattern = patternsOfscenariolist.implementedPattern;
     this.scenarioList.preferredPattern = patternsOfscenariolist.preferredPattern;
     this.scenarioList.explanation = patternsOfscenariolist.explanation;

    localStorage.setItem('implementedPattern', this.scenarioList.implementedPattern);

     console.log(patternsOfscenariolist.implementedPattern + " " + patternsOfscenariolist.preferredPattern + " " + patternsOfscenariolist.explanation);
     console.log(this.scenarioList.implementedPattern + " " + this.scenarioList.preferredPattern + " " + this.scenarioList.explanation);
    }


      }*/
  /*retrieveValues(){
   /* this.scenarioList.implementedPattern = localStorage.getItem('implementedPattern');
    for(let patternsOfscenariolist of this.scenarioList){

      this.scenarioList.implementedPattern = patternsOfscenariolist.implementedPattern;
      this.scenarioList.preferredPattern = patternsOfscenariolist.preferredPattern;
      this.scenarioList.explanation = patternsOfscenariolist.explanation;
      console.log(patternsOfscenariolist.implementedPattern + " " + patternsOfscenariolist.preferredPattern + " " + patternsOfscenariolist.explanation);
      console.log(this.scenarioList.implementedPattern + " " + this.scenarioList.preferredPattern + " " + this.scenarioList.explanation);
     //patternsOfscenariolist.implementedPattern =  this.scenarioList.implementedPattern;
     //patternsOfscenariolist.preferredPattern =  this.scenarioList.preferredPattern;
     //patternsOfscenariolist.explanation =  this.scenarioList.explanation;
    }
  }*/


  saveChanges() {
    this.updateValueOccurrencesImplementedPattern();
    this.updateValueOccurrencesPreferredPattern();
    //this.saveScenarioData();
    //localStorage.setItem("myCat", "Tom");
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
          this.updateAll();
        }
      });
  }


 /* fireAll() {
    //this.createAll();
    //this.deleteAll();
    this.updateAll();
  }*/




}








