import { Component, OnInit, ViewChild } from '@angular/core';
import { Tool } from '../../../../../api/repository/models/tool';
import { ToolService } from '../../../../../api/repository/services/tool.service';
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
  selector: 'app-tool-explorer',
  templateUrl: './tool-explorer.component.html',
  styleUrls: ['./tool-explorer.component.scss']
})
export class ToolExplorerComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns: string[] = [
    'id',
    'name',
    'types',
    'author',
    'actions'
  ];
  dataSource!: MatTableDataSource<Tool>;

  tools: Tool[] = [];

  constructor(
    public permissionService: PermissionService,
    private toolService: ToolService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestTools();
  }

  requestTools(): void {
    this.toolService.listTools().subscribe({
      next: (response: Tool[]) => {
        this.tools = response;
        this.setDataSource();
        // Sort the table by the "id" column in ascending order on page load (you can use 'desc' for descending order)
        this.sort.sort({ id: 'id', start: 'asc', disableClear: false });
      },
      error: () => {
        this.utilService.callSnackBar(
          'Error: Tools could not be retrieved.'
        );
      }
    });
  }

  setDataSource(): void {
    this.refreshDataSource();
    this.dataSource.sortingDataAccessor = (
      data: Tool,
      sortHeaderId: string
    ) => {
      switch (sortHeaderId) {
        case 'id':
          return data.identifier;
        case 'name':
          return data.toolSource?.name;
        case 'types':
          return this.formatToolTypes(data);
        case 'author':
          return data.toolSource?.author;
        default:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return data[sortHeaderId];
      }
    };
    this.dataSource.sort = this.sort;
  }

  refreshDataSource(): void {
    this.dataSource = new MatTableDataSource(this.tools);
  }

  goToLink(
    tool: Tool,
    mouseEvent: MouseEvent
  ): void {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    if (tool.toolSource?.link == null) return;
    window.open(tool.toolSource?.link, '_blank');
  }

  goToEdit(tool: Tool, mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    this.router.navigate([
      '/phase/2/tool',
      tool.toolId,
      'edit'
    ]);
  }

  // Create a method to format tool types as a semicolon-separated string
  formatToolTypes(tool: Tool): string {
    if (tool.toolTypes) {
      return tool.toolTypes.map(type => type.name).join('; ');
    }
    return '';
  }

  openToolView(tool: Tool) {
    this.router.navigate([
      '/phase/2/tool',
      tool.toolId
    ]);
  }

  deleteTool(
    tool: Tool,
    mouseEvent: MouseEvent
  ) {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    const data: ConfirmDialogData = {
      title: 'Delete Tool?',
      message: `Do you really want to delete the tool "${tool.toolSource?.name}"?`,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data == null || tool.toolId == null)
            return;

          lastValueFrom(
            this.toolService.deleteTool({
              id: tool.toolId
            })
          )
            .then(() => {
              removeValueFromArray(
                this.tools,
                tool,
                (a: Tool, b: Tool) =>
                  a.toolId === b.toolId
              );
              this.refreshDataSource();
              this.utilService.callSnackBar(
                'Tool deleted successfully'
              );
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
