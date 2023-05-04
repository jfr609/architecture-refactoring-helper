import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';


import { Component, OnInit, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  Quality,
  QualityCategory,
  QualitySublevel,
  RatingLevel,
  Scenario,
  ProjectDescription
} from 'api/repository/models';
import { ScenarioService } from 'api/repository/services';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { ProjectService } from 'src/app/services/project.service';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css']
})
export class ProjectDescriptionComponent implements OnInit {
  isDataLoading = true;
  ratingLevel = RatingLevel;
  enumKeys: any;

  projectDescriptionList: any = [];
  selectedProjectDescription?: ProjectDescription;

  deletingProjectDescriptionsList = new Array<ProjectDescription>();
  newprojectDescriptionsList = new Array<ProjectDescription>();
  updatingProjectDescriptionsList = new Array<ProjectDescription>();


  constructor(
    public utilService: UtilService
  ) { 
    this.enumKeys = Object.keys(this.ratingLevel);
  }

  ngOnInit(): void {
  }

  addEmptyProjectDescription(): void {
    let emptyProjectDescription: ProjectDescription = {
      systemname: '',//name
      ownership: '',//name/object
      creationdate: '',//date
      systemsize: '',//int
      hosting: '',//name/object
      teams: '',//name/object/id
      developers: '',//name/obect/id/list
      processmodel: '',
      architecturepattern: '',
      languages: '',
      persistence: '',
      purpose: '',
      functionality: '',
      designdiagrams: '',
      //description: '',
      //qualities: [],
      //qualitySublevels: []
    };
    this.projectDescriptionList.push(emptyProjectDescription);
    this.newprojectDescriptionsList.push(emptyProjectDescription);
  }

  deleteProjectDescription(projectDescription: ProjectDescription): void {
    const data: ConfirmDialogData = {
      title: 'Delete Project Description',
      message: `Do you really want to delete the Project Description "${projectDescription.systemname}"?`,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
    .createDialog(ConfirmDialogComponent, data)
    .afterClosed()
    .subscribe({
      next:(data: ConfirmDialogData) => {
        if(data == null) return;

        if(projectDescription.projectDescriptionId != null){
          this.deletingProjectDescriptionsList.push(projectDescription);
        }

        let indexList = this.projectDescriptionList.indexOf(projectDescription) ?? -1;
        if(indexList != -1){
          this.projectDescriptionList.splice(indexList, 1);
        }
        this.selectedProjectDescription = undefined;

        let indexUpdate = this.updatingProjectDescriptionsList.indexOf(projectDescription) ?? -1;
        if(indexUpdate !== -1){
          this.updatingProjectDescriptionsList.splice(indexUpdate, 1);
        }
        let indexNext = this.newprojectDescriptionsList.indexOf(projectDescription) ?? -1;
        if (indexNext !== -1) {
          this.newprojectDescriptionsList.splice(indexNext, 1);
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
  projectDescriptionSelected(projectDescription: ProjectDescription): void {
    this.selectedProjectDescription = projectDescription;
  }
  checkCurrentProjectDescription(currentProjectDescription?: ProjectDescription): boolean {
    if(currentProjectDescription === this.selectedProjectDescription){
      return true;
    } else {
      return false;
    }
  }












}
