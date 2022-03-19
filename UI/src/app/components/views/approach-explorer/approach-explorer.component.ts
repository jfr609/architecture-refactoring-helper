import { Component, OnInit, ViewChild } from '@angular/core';
import { RefactoringApproach } from '../../../../../api/repository/models/refactoring-approach';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { UtilService } from '../../../services/util.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { PermissionService } from '../../../services/permission.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { lastValueFrom } from 'rxjs';
import { removeValueFromArray } from '../../../utils/utils';

@Component({
  selector: 'app-approach-explorer',
  templateUrl: './approach-explorer.component.html',
  styleUrls: ['./approach-explorer.component.scss']
})
export class ApproachExplorerComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'title', 'year', 'authors', 'actions'];
  dataSource!: MatTableDataSource<RefactoringApproach>;

  refactoringApproaches: RefactoringApproach[] = [];

  constructor(
    public permissionService: PermissionService,
    private refactoringApproachService: RefactoringApproachService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestRefactoringApproaches();
  }

  requestRefactoringApproaches(): void {
    this.refactoringApproachService.listRefactoringApproaches().subscribe({
      next: (response: RefactoringApproach[]) => {
        this.refactoringApproaches = response;
        this.setDataSource();
      },
      error: () => {
        this.utilService.callSnackBar(
          'Error: Refactoring approaches could not be retrieved.'
        );
      }
    });
  }

  setDataSource(): void {
    this.refreshDataSource();
    this.dataSource.sortingDataAccessor = (
      data: RefactoringApproach,
      sortHeaderId: string
    ) => {
      switch (sortHeaderId) {
        case 'id':
          return data.identifier;
        case 'title':
          return data.approachSource?.title;
        case 'year':
          return data.approachSource?.year;
        case 'authors':
          return data.approachSource?.authors;
        default:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return data[sortHeaderId];
      }
    };
    this.dataSource.sort = this.sort;
  }

  refreshDataSource(): void {
    this.dataSource = new MatTableDataSource(this.refactoringApproaches);
  }

  goToLink(
    refactoringApproach: RefactoringApproach,
    mouseEvent: MouseEvent
  ): void {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    if (refactoringApproach.approachSource?.link == null) return;
    window.open(refactoringApproach.approachSource?.link, '_blank');
  }

  goToEdit(refactoringApproach: RefactoringApproach, mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    this.router.navigate([
      '/approach',
      refactoringApproach.refactoringApproachId,
      'edit'
    ]);
  }

  openApproachView(refactoringApproach: RefactoringApproach) {
    this.router.navigate([
      '/approach',
      refactoringApproach.refactoringApproachId
    ]);
  }

  deleteRefactoringApproach(
    refactoringApproach: RefactoringApproach,
    mouseEvent: MouseEvent
  ) {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    const data: ConfirmDialogData = {
      title: 'Delete Refactoring Approach?',
      message: `Do you really want to delete the refactoring approach "${refactoringApproach.approachSource?.title}"?`,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data == null || refactoringApproach.refactoringApproachId == null)
            return;

          lastValueFrom(
            this.refactoringApproachService.deleteRefactoringApproach({
              id: refactoringApproach.refactoringApproachId
            })
          )
            .then(() => {
              removeValueFromArray(
                this.refactoringApproaches,
                refactoringApproach,
                (a: RefactoringApproach, b: RefactoringApproach) =>
                  a.refactoringApproachId === b.refactoringApproachId
              );
              this.refreshDataSource();
              this.utilService.callSnackBar(
                'Refactoring approach deleted successfully'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Refactoring approach could not be deleted'
              );
            });
        }
      });
  }
}
