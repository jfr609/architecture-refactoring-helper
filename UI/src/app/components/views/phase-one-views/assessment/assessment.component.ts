import {
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
  Scenario
} from 'api/repository/models';
import { ScenarioService } from 'api/repository/services';
import { AssessmentService } from 'api/repository/services/assessment-service';
import { OnInit } from '@angular/core';
import { QualityAttributesComponent } from '../quality-attributes/quality-attributes.component';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements  OnInit {
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
  originalImplementedPattern: any = [];
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

ngOnInit(): void {
  this.isDataLoading = true;
  Promise.all([
    this.projectService.requestStrategicGoalsAttributes(),
    this.projectService.requestProjectAttributes(),
    this.attributesService.requestQualities(),
    this.projectService.requestScenarios(),
  ]).then(() => {
    this.scenarioList = this.projectService.scenarios.value;
    for (let i = 0; i < this.scenarioList.length; i++) {
      if (this.scenarioList[i] !== undefined) {
      this.scenarioList[i].implementedPattern = JSON.parse(this.scenarioList[i].implementedPattern);
      }
  }
    this.strategicGoalsList = this.projectService.strategicGoals.value;
    this.updatingStrategicGoalsList = Object.assign([], this.strategicGoalsList);
    this.qualityList = this.attributesService.getQualitiesByCategory(
      this.QualityCategories.Attribute
    );
    this.isDataLoading = false;
  });
}
   
  updateValueOccurrencesImplementedPattern() {
    //reset to 0 before new count
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
  }

  refreshAssessment(){
    
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

  updateAll() {

    for (let i = 0; i < this.scenarioList.length; i++) {
      this.scenarioList[i].implementedPattern = JSON.stringify(this.scenarioList[i].implementedPattern);
  }
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
      }
    );
  }
 
  saveChanges() {
    this.updateValueOccurrencesImplementedPattern();
    this.updateValueOccurrencesPreferredPattern();
    /*for (let i = 0; i < this.scenarioList.length; i++) {
      this.originalImplementedPattern[i].implementedPattern = JSON.stringify(this.scenarioList[i].implementedPattern);
    }*/
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
         /* for (let i = 0; i < this.scenarioList.length; i++) {
            this.scenarioList[i].implementedPattern = this.originalImplementedPattern[i].implementedPattern;
        }*/
        }
      }
    );
  }
}








