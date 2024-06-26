import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { DialogData } from '../../../utils/models/dialog-data';
import { PermissionService } from '../../../services/permission.service';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { ToolService } from '../../../../../api/repository/services/tool.service';
import { lastValueFrom } from 'rxjs';
import { RefactoringApproach } from '../../../../../api/repository/models/refactoring-approach';
import { UtilService } from '../../../services/util.service';
import { Tool } from 'api/repository/models/tool';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-application-settings-dialog',
  templateUrl: './application-settings-dialog.component.html',
  styleUrls: ['./application-settings-dialog.component.scss']
})
export class ApplicationSettingsDialogComponent {
  @ViewChild('importInput') importInput!: ElementRef;
  @ViewChild('importToolInput') importToolInput!: ElementRef;
  validAuthentication: boolean = false;
  password: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ApplicationSettingsDialogComponent>,
    public dialog: MatDialog,
    public permissionService: PermissionService,
    private refactoringApproachService: RefactoringApproachService,
    private toolService: ToolService,
    private utilService: UtilService
  ) {
    this.checkAdminSession();
  }

  validateAuthentication() {
    if (this.password == 'admin') {
      this.validAuthentication = true;
      const now = new Date();
      const item = {
          value: 'admin',
          expiry: now.getTime() + 86400000, // current time + 1 day in milliseconds
      };
      sessionStorage.setItem('adminAuth', JSON.stringify(item));
    }
  }

  checkAdminSession() {
    const adminAuthString = sessionStorage.getItem('adminAuth');
  
    if (adminAuthString) { // This checks if the string is not null
      const adminAuth = JSON.parse(adminAuthString);
      const now = new Date();
  
      if (now.getTime() < adminAuth.expiry) {
        this.validAuthentication = true;
        this.permissionService.isAdmin = true;
      }
    }
  }

  onCancelClicked() {
    this.dialogRef.close();
  }

  exportApproaches() {
  lastValueFrom(
    this.refactoringApproachService.listRefactoringApproaches({
      withDetails: true
    })
  ).then((refactoringApproaches: RefactoringApproach[]) => {
    for (const approach of refactoringApproaches) {
	    
      // remove all tool properties and keep only identifier
      if (approach && approach.approachUsability && approach.approachUsability.tools) {
        approach.approachUsability.tools = approach.approachUsability.tools.map(tool => ({ identifier: tool?.identifier }));
      }

      // if domainArtifactInputs is defined and not null, then remove description for export
      if (approach.domainArtifactInputs && Array.isArray(approach.domainArtifactInputs)) {
        approach.domainArtifactInputs.forEach(input => delete input.description);
      }

      // if runtimeArtifactInputs is defined and not null, then remove description for export
      if (approach.runtimeArtifactInputs && Array.isArray(approach.runtimeArtifactInputs)) {
        approach.runtimeArtifactInputs.forEach(input => delete input.description);
      }

      // if modelArtifactInputs is defined and not null, then remove description for export
      if (approach.modelArtifactInputs && Array.isArray(approach.modelArtifactInputs)) {
        approach.modelArtifactInputs.forEach(input => delete input.description);
      }

      // if executableInputs is defined and not null, then remove description for export
      if (approach.executableInputs && Array.isArray(approach.executableInputs)) {
        approach.executableInputs.forEach(input => delete input.description);
      }

      // if approachProcess.qualities is defined and not null, then remove description for export
      if (approach.approachProcess && approach.approachProcess.qualities && Array.isArray(approach.approachProcess.qualities)) {
        approach.approachProcess.qualities.forEach(quality => delete quality.description);
      }

      // if approachProcess.qualitySublevels is defined and not null, then remove description for export
      if (approach.approachProcess && approach.approachProcess.qualitySublevels && Array.isArray(approach.approachProcess.qualitySublevels)) {
        approach.approachProcess.qualitySublevels.forEach(qualitySublevels => delete qualitySublevels.description);
      }

      // if approachProcess.directions is defined and not null, then remove description for export
      if (approach.approachProcess && approach.approachProcess.directions && Array.isArray(approach.approachProcess.directions)) {
        approach.approachProcess.directions.forEach(direction => delete direction.description);
      }

      // if approachProcess.automationLevels is defined and not null, then remove description for export
      if (approach.approachProcess && approach.approachProcess.automationLevels && Array.isArray(approach.approachProcess.automationLevels)) {
        approach.approachProcess.automationLevels.forEach(level => delete level.description);
      }

      // if approachProcess.analysisTypes is defined and not null, then remove description for export
      if (approach.approachProcess && approach.approachProcess.analysisTypes && Array.isArray(approach.approachProcess.analysisTypes)) {
        approach.approachProcess.analysisTypes.forEach(type => delete type.description);
      }

      // if approachProcess.techniques is defined and not null, then remove description for export
      if (approach.approachProcess && approach.approachProcess.techniques && Array.isArray(approach.approachProcess.techniques)) {
        approach.approachProcess.techniques.forEach(technique => delete technique.description);
      }

      // if approachProcess.processStrategies is defined and not null, then remove description for export
      if (approach.approachProcess && approach.approachProcess.processStrategies && Array.isArray(approach.approachProcess.processStrategies)) {
        approach.approachProcess.processStrategies.forEach(strategy => delete strategy.description);
      }

      // if approachProcess.atomarUnits is defined and not null, then remove description for export
      if (approach.approachProcess && approach.approachProcess.atomarUnits && Array.isArray(approach.approachProcess.atomarUnits)) {
        approach.approachProcess.atomarUnits.forEach(unit => delete unit.description);
      }

      // if representationOutputs is defined and not null, then remove description for export
      if (approach.representationOutputs && Array.isArray(approach.representationOutputs)) {
        approach.representationOutputs.forEach(output => delete output.description);
      }

      // if approachUsability.accuracyPrecision is defined and not null, then remove description for export
      if (approach.approachUsability && approach.approachUsability.accuracyPrecision) {
        delete approach.approachUsability.accuracyPrecision.description;
      }

      // if approachUsability.validationMethod is defined and not null, then remove description for export
      if (approach.approachUsability && approach.approachUsability.validationMethod) {
        delete approach.approachUsability.validationMethod.description;
      }
    }
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    downloadLink.download = 'approaches.json';
    const fileContent: string = JSON.stringify(refactoringApproaches, null, 2); // Added indentation and null for space
    downloadLink.href = 'data:text/plain;charset=utf-16,' + encodeURIComponent(fileContent);
    downloadLink.click();
    downloadLink.remove();
  });
}

  exportTools() {
    lastValueFrom(
      this.toolService.listTools({
        withDetails: true
      })
    ).then((tools: Tool[]) => {
      for (const tool of tools) {
	
	// remove approachUsabilities from export
        if (tool && tool.approachUsabilities) {
          delete tool.approachUsabilities;
        }
	
	// if toolTypes is defined and not null, then remove description from export
        if (tool.toolTypes && Array.isArray(tool.toolTypes)) {
          tool.toolTypes.forEach(input => delete input.description);
        }
      }
      
      const downloadLink: HTMLAnchorElement = document.createElement('a');
      downloadLink.download = 'tools.json';
      const fileContent: string = JSON.stringify(tools, null, 2); // Added indentation and null for space
      downloadLink.href = 'data:text/plain;charset=utf-16,' + encodeURIComponent(fileContent);
      downloadLink.click();
      downloadLink.remove();
    });
  }

  importApproaches() {
    this.importInput?.nativeElement.click();
  }

  handleImport(event: Event) {
    const files: FileList | null = (event.currentTarget as HTMLInputElement)
      .files;
    if (files != null && files.length > 0) {
      files[0].text().then((value: string) => {
        const approaches: RefactoringApproach[] = JSON.parse(value);
        const promises: Promise<RefactoringApproach>[] = [];
        for (const approach of approaches) {
          const toolIdentifiers: string[] = [];
          //adding tool identifiers to array of string
          if (approach && approach.approachUsability && approach.approachUsability.tools) {
            approach.approachUsability.tools.forEach((tool: { identifier: string }) => {
              toolIdentifiers.push(tool.identifier);
            });
            //now detaching tools object list from the approaches to save approaches smoothly
            approach.approachUsability.tools = [];
          }

          // Make the addRefactoringApproach request
          const addRefactoringApproachPromise =  lastValueFrom(
              this.refactoringApproachService.addRefactoringApproach({
                body: approach
              })
            );

          // Handle the response of addRefactoringApproach
          addRefactoringApproachPromise.then((addedApproach) => {
            // Call another method to send the ID and toolIdentifiers
            lastValueFrom(
              this.refactoringApproachService.updateToolsByIdentifiers({
                id: addedApproach.refactoringApproachId!,
                body: toolIdentifiers
              })
            )
          });
          // Push the addRefactoringApproach promise to the promises array
          promises.push(addRefactoringApproachPromise);
        }

        Promise.all(promises)
          .then(() => {
            this.utilService.callSnackBar(
              'Refactoring approaches were imported successfully.'
            );
          })
          .catch((reason) => {
            console.log(reason);
            this.utilService.callSnackBar(
              'Error! Some approaches could not be imported. ' +
                'This can happen if refactoring approaches already exist or are invalid. ' +
                'Please check if your selected file is valid.'
            );
          });
      });
    }
  }

  importTools() {
    this.importToolInput?.nativeElement.click();
  }

  handleToolImport(event: Event) {
    const files: FileList | null = (event.currentTarget as HTMLInputElement)
      .files;
    if (files != null && files.length > 0) {
      files[0].text().then((value: string) => {
        const tools: Tool[] = JSON.parse(value);
        const promises: Promise<Tool>[] = [];
        for (const tool of tools) {
          //detaching approaches from tools
          if(tool && tool.approachUsabilities){
            tool.approachUsabilities = [];
          }
          promises.push(
            lastValueFrom(
              this.toolService.addTool({
                body: tool
              })
            )
          );
        }

        Promise.all(promises)
          .then(() => {
            this.utilService.callSnackBar(
              'Tools were imported successfully.'
            );
          })
          .catch((reason) => {
            console.log(reason);
            this.utilService.callSnackBar(
              'Error! Some tools could not be imported. ' +
                'This can happen if tools already exist or are invalid. ' +
                'Please check if your selected file is valid.'
            );
          });
      });
    }
  }
}
