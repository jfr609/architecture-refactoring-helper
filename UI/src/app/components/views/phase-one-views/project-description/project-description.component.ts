import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ProjectDescriptionService } from 'api/repository/services/project-description.service';
import {Component, OnInit} from '@angular/core';
import { RatingLevel, ProjectDescription } from 'api/repository/models';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AttributeOptionsService } from 'src/app/services/attribute-options.service';
import { ProjectService } from 'src/app/services/project.service';
import { UtilService } from 'src/app/services/util.service';
import { Languages } from 'api/repository/models/languages';
import { Patterns } from 'api/repository/models/patterns';
//import { Language } from 'api/repository/models/language';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css']
})
export class ProjectDescriptionComponent implements OnInit {
  isDataLoading = true;
  ratingLevel = RatingLevel;
  languageOptions: any;
  patternOptions: any;
  languages = Languages;
  patterns = Patterns;
  projectDescriptionList: any = [];
  selectedProjectDescription?: ProjectDescription;
  loadedonce = false;
  deletingProjectDescriptionsList = new Array<ProjectDescription>();
  newProjectDescriptionsList = new Array<ProjectDescription>();
  updatingProjectDescriptionsList = new Array<ProjectDescription>();

  constructor(
    public projectService: ProjectService,
    public attributesService: AttributeOptionsService,
    public projectDescriptionService: ProjectDescriptionService,
    public utilService: UtilService
  ) {
    this.languageOptions = Object.values(this.languages);
    this.patternOptions = Object.values(this.patterns);
  }

  ngOnInit(): void {
    this.isDataLoading = true;
    Promise.all([
      this.projectService.requestProjectDescriptionAttributes()
    ]).then(() => {
      this.projectDescriptionList = this.projectService.projectDescriptions.value;
        //this.projectDescriptionList[0].languages = JSON.stringify(this.projectDescriptionList[0].languages);
        if (this.projectDescriptionList[0] !== undefined) {
          this.projectDescriptionList[0].languages = JSON.parse(this.projectDescriptionList[0].languages);
        }
      this.updatingProjectDescriptionsList = Object.assign(
        [],
        this.projectDescriptionList
      );
      this.isDataLoading = false;
    });
  }

  addEmptyProjectDescription(): void {
    let emptyProjectDescription: ProjectDescription = {
      systemname: '',
      ownership: '',
      creation_date: '',
      systemsize_LOC: 0,
      hosting_model: '',
      number_of_teams: 0, 
      number_of_developers: 0,
      processmodel: '',
      data_persistence: '',
      purpose: '',
      functionality: '',
      designdiagrams: '',
    };
    this.projectDescriptionList.push(emptyProjectDescription);
    this.newProjectDescriptionsList.push(emptyProjectDescription);
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
        next: (data: ConfirmDialogData) => {
          if (data == null) return;

          if (projectDescription.projectDescriptionId != null) {
            this.deletingProjectDescriptionsList.push(projectDescription);
          }

          let indexList =
            this.projectDescriptionList.indexOf(projectDescription) ?? -1;
          if (indexList != -1) {
            this.projectDescriptionList.splice(indexList, 1);
          }
          this.selectedProjectDescription = undefined;

          let indexUpdate =
            this.updatingProjectDescriptionsList.indexOf(projectDescription) ??
            -1;
          if (indexUpdate !== -1) {
            this.updatingProjectDescriptionsList.splice(indexUpdate, 1);
          }
          let indexNext =
            this.newProjectDescriptionsList.indexOf(projectDescription) ?? -1;
          if (indexNext !== -1) {
            this.newProjectDescriptionsList.splice(indexNext, 1);
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

  /*addOrRemoveLanguage(selected: boolean, qa: Language) {
    if (selected) {
      if (!this.selectedProjectDescription?.languages?.find((e) => e.name === qa.name)) {
        this.selectedProjectDescription?.languages?.push(qa);
      }
    } else {
      let index =
        this.selectedProjectDescription?.languages?.findIndex(
          (q) => q.name === qa.name
        ) ?? -1;
      if (index !== -1) {
        this.selectedProjectDescription?.languages?.splice(index, 1);
      }
    }
  }*/

  projectDescriptionSelected(projectDescription: ProjectDescription): void {
    this.selectedProjectDescription = projectDescription;
  }
  
  checkCurrentProjectDescription(
    currentProjectDescription?: ProjectDescription
  ): boolean {
    if (currentProjectDescription === this.selectedProjectDescription) {
      return true;
    } else {
      return false;
    }
  }

  allNamesSet(): boolean {
    return !this.projectDescriptionList.some(
      (s: any) => s.name == undefined || s.name == ''
    );
  }

  createAll() {
    //const realvalue = this.projectDescriptionList[0].languages;
    this.projectDescriptionList[0].languages = JSON.stringify(this.projectDescriptionList[0].languages);
    if (this.newProjectDescriptionsList.length > 0) {
      this.newProjectDescriptionsList.forEach((e) => {
        this.projectDescriptionService
          .addProjectDescription({
            body: e,
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
    }
    this.projectDescriptionList[0].languages = (JSON.parse(this.projectDescriptionList[0].languages));
  }

  deleteAll() {
    //this.projectDescriptionList[0].languages = JSON.stringify(this.projectDescriptionList.languages);
    if (this.deletingProjectDescriptionsList.length > 0) {
      this.deletingProjectDescriptionsList.forEach((e) => {
        this.projectDescriptionService
          .deleteProjectDescription({
            id: e.projectDescriptionId!
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
      this.deletingProjectDescriptionsList.splice(0);
    }
  }

  updateAll() {
    this.projectDescriptionList[0].languages = JSON.stringify(this.projectDescriptionList[0].languages);
    if (this.updatingProjectDescriptionsList.length > 0) {
      this.updatingProjectDescriptionsList.forEach((e) => {
        this.projectDescriptionService
          .updateProjectDescription({
            id: e.projectDescriptionId!,
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
      this.projectDescriptionList[0].languages = (JSON.parse(this.projectDescriptionList[0].languages));

      this.updatingProjectDescriptionsList.splice(0);
      //this.projectDescriptionList[0].languages = (JSON.parse(this.projectDescriptionList[0].languages));

    }
    //this.projectDescriptionList[0].languages = (JSON.parse(this.projectDescriptionList[0].languages));
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
          //this.projectDescriptionList[0].languages = JSON.parse(oked);
          //this.projectDescriptionList[0].languages = oked;
        }
      }
    );
  }

  fireAll() {
    this.createAll();
    this.deleteAll();
    this.updateAll();
    Promise.all([
      this.projectService.requestProjectDescriptionAttributes()
    ]).then(() => {
        this.projectDescriptionList[0].languages = JSON.stringify(this.projectDescriptionList[0].languages);
        //this.projectDescriptionList = this.projectService.projectDescriptions.value;
        console.log(this.projectService.projectDescriptions.value);
        console.log(this.projectDescriptionList);
        if (this.projectDescriptionList[0] !== undefined) {
          this.projectDescriptionList[0].languages = JSON.parse(this.projectDescriptionList[0].languages);
        }
      this.updatingProjectDescriptionsList = Object.assign(
        [],
        this.projectDescriptionList
      );
      this.isDataLoading = false;
    });
  }
}
