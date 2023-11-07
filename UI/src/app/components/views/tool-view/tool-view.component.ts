import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Tool } from '../../../../../api/repository/models/tool';
import { NAV_PARAM_TOOL_ID } from '../../../app.constants';
import { UtilService } from '../../../services/util.service';
import { ToolService } from '../../../../../api/repository/services/tool.service';
import { ServiceType } from '../../../../../api/repository/models/service-type';
import { Architecture } from '../../../../../api/repository/models/architecture';
import { Location } from '@angular/common';
import { PermissionService } from '../../../services/permission.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RefactoringApproach } from 'api/repository/models';

interface OutputInfo {
  architecture: Architecture;
  serviceTypes: ServiceType[];
}

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-view.component.html',
  styleUrls: ['./tool-view.component.scss']
})
export class ToolViewComponent implements OnInit, OnDestroy {
  //for table
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns: string[] = [
    'id',
    'title',
    'year',
    'authors'
  ];
  dataSource!: MatTableDataSource<RefactoringApproach>;
  
  tool: Tool = { identifier: '' };
  outputMap: Map<string, OutputInfo> = new Map<string, OutputInfo>();

  routeSub!: Subscription;
  isDataLoading = true;

  constructor(
    public permissionService: PermissionService,
    private toolService: ToolService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.isDataLoading = true;

        const toolId = parseInt(
          paramMap.get(NAV_PARAM_TOOL_ID) as string
        );
        this.requestTool(toolId);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  requestTool(toolId: number): void {
    this.toolService
      .getTool({
        id: toolId
      })
      .subscribe({
        next: (value) => {
          this.tool = value;
          this.isDataLoading = false;
          this.setDataSource();
        },
        error: (err) => {
          console.log(err);
          this.utilService.callSnackBar(
            'Error! Tool could not be retrieved.'
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
    const refactoringApproaches = this.tool?.approachUsabilities
      ?.map(approachUsability => approachUsability.refactoringApproach)
      .filter(approach => !!approach) as RefactoringApproach[];
    this.dataSource = new MatTableDataSource(refactoringApproaches);
  }
  
  goToEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  goBack(): void {
    this.location.back();
  }

  openApproachView(refactoringApproach: RefactoringApproach) {
    this.router.navigate([
      '/phase/2/approach',
      refactoringApproach.refactoringApproachId
    ]);
  }

  deleteTool() {
    const data: ConfirmDialogData = {
      title: 'Delete Tool?',
      message: `Do you really want to delete the tool "${this.tool.toolSource?.name}"?`,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (
            data == null ||
            this.tool.toolId == null
          )
            return;

          lastValueFrom(
            this.toolService.deleteTool({
              id: this.tool.toolId
            })
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Tool deleted successfully'
              );
              this.router.navigate(['home']);
            })
            .catch((reason) => {
              console.log(reason);
              // Handle specific error cases
              if (reason.error != undefined) {
                this.utilService.callSnackBar(reason.error);
              } else {
                this.utilService.callSnackBar(
                  'Error! Tool could not be deleted'
                );
              }
            });
        }
      });
  }
}
