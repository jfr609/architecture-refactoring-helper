import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { DialogData } from '../../../utils/models/dialog-data';
import { PermissionService } from '../../../services/permission.service';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { lastValueFrom } from 'rxjs';
import { RefactoringApproach } from '../../../../../api/repository/models/refactoring-approach';
import { UtilService } from '../../../services/util.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-application-settings-dialog',
  templateUrl: './application-settings-dialog.component.html',
  styleUrls: ['./application-settings-dialog.component.scss']
})
export class ApplicationSettingsDialogComponent {
  @ViewChild('importInput') importInput!: ElementRef;
  validAuthentication: boolean = false;
  password: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ApplicationSettingsDialogComponent>,
    public dialog: MatDialog,
    public permissionService: PermissionService,
    private refactoringApproachService: RefactoringApproachService,
    private utilService: UtilService
  ) {}

  validateAuthentication() {
    if (this.password == 'admin') {
      this.validAuthentication = true;
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
      const downloadLink: HTMLAnchorElement = document.createElement('a');
      downloadLink.download = 'approaches.json';
      const fileContent: string = JSON.stringify(refactoringApproaches);
      downloadLink.href = 'data:text/plain;charset=utf-16,' + fileContent;
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
          promises.push(
            lastValueFrom(
              this.refactoringApproachService.addRefactoringApproach({
                body: approach
              })
            )
          );
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
}
