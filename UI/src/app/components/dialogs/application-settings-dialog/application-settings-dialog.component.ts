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

@Component({
  selector: 'app-application-settings-dialog',
  templateUrl: './application-settings-dialog.component.html',
  styleUrls: ['./application-settings-dialog.component.scss']
})
export class ApplicationSettingsDialogComponent {
  @ViewChild('importInput') importInput!: ElementRef;
  @ViewChild('importToolInput') importToolInput!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ApplicationSettingsDialogComponent>,
    public dialog: MatDialog,
    public permissionService: PermissionService,
    private refactoringApproachService: RefactoringApproachService,
    private toolService: ToolService,
    private utilService: UtilService
  ) {}

  onCancelClicked() {
    this.dialogRef.close();
  }

  exportApproaches() {
  lastValueFrom(
    this.refactoringApproachService.listRefactoringApproaches({
      withDetails: true
    })
  ).then((refactoringApproaches: RefactoringApproach[]) => {
    //remove all tool properties but keep only identifier
    for (const approach of refactoringApproaches) {
      if (approach && approach.approachUsability && approach.approachUsability.tools) {
        approach.approachUsability.tools = approach.approachUsability.tools.map(tool => ({ identifier: tool?.identifier }));
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
      //remove approachUsabilities from tools.json
      for (const tool of tools) {
        if(tool && tool.approachUsabilities){
          delete tool.approachUsabilities;
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
