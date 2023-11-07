import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Tool } from '../../../../../api/repository/models/tool';
import { lastValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToolService } from '../../../../../api/repository/services/tool.service';
import { UtilService } from '../../../services/util.service';
import {
  NAV_PARAM_TOOL_ID,
  TOOLTIP_HIDE_DELAY,
  TOOLTIP_SHOW_DELAY
} from '../../../app.constants';
import { MatAccordion } from '@angular/material/expansion';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../../utils/custom-validators';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ConnectedDataListElement } from '../../generics/connected-data-lists/connected-data-lists.component';
import { AttributeOptionsService } from '../../../services/attribute-options.service';
import { ToolType } from 'api/repository/models/tool-type';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit, OnDestroy {
  readonly TOOLTIP_SHOW_DELAY = TOOLTIP_SHOW_DELAY;
  readonly TOOLTIP_HIDE_DELAY = TOOLTIP_HIDE_DELAY;

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  nameFormControl = new FormControl('', [Validators.required]);
  identifierFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('');
  linkFormControl = new FormControl('', [CustomValidators.url]);
  authorFormControl = new FormControl('', [Validators.required]);

  tool: Tool = { identifier: '' };

  nameInputValue = '';
  identifierInputValue = '';
  descriptionInputValue = '';
  authorInputValue = '';
  linkInputValue = '';

  toolTypeSourceDataList: ConnectedDataListElement[] = [];
  toolTypeTargetDataList: ConnectedDataListElement[] = [];
  
  isCreateView = true;
  isDataLoading = true;

  private routeSub!: Subscription;
  private attributeSubscriptions: Subscription[] = [];

  get noDescriptionText(): string {
    return 'No description';
  }

  constructor(
    private toolService: ToolService,
    public attributeOptionsService: AttributeOptionsService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.isCreateView = !paramMap.has(NAV_PARAM_TOOL_ID);
        this.isDataLoading = true;
        if (this.isCreateView) {
          this.attributeOptionsService.requestToolAttributeOptions().then(() => {
            this.fillDataLists();
            this.isDataLoading = false;
          });
        } else {
          const toolId = parseInt(
            paramMap.get(NAV_PARAM_TOOL_ID) as string
          );

          this.requestTool(toolId)
            .then(() => {
              this.attributeOptionsService
                .requestToolAttributeOptions()
                .then(() => {
                  this.fillDataLists();
                  this.isDataLoading = false;
                });
            })
            .catch(() => {
              this.router.navigate(['/not-found']);
            });
        }
      }
    });

    this.attributeSubscriptions.push(
      this.attributeOptionsService.toolTypes.subscribe({
        next: () => {
          this.fillToolTypeDataLists();
        }
      })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.attributeSubscriptions) {
      subscription.unsubscribe();
    }
  }
  
  requestTool(toolId: number): Promise<void> {
    return lastValueFrom(
      this.toolService.getTool({ id: toolId })
    )
      .then((value: Tool) => {
        this.tool = value;
      })
      .catch(() => {
        this.utilService.callSnackBar(
          'Error! Tool could not be retrieved.'
        );
      });
  }

  fillDataLists(): void {
    this.fillToolTypeDataLists();
  }

  fillToolTypeDataLists(): void {
    this.toolTypeSourceDataList = [];
    this.toolTypeTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.tool.toolTypes,
      this.attributeOptionsService.toolTypes.value,
      this.toolTypeSourceDataList,
      this.toolTypeTargetDataList,
      (e: ToolType) => e.name
    );
  }

  createTool(): void {
    const data: ConfirmDialogData = {
      title: 'Create a new tool?',
      message:
        'Do you want to create a new tool based on the given data?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    };

    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data === undefined) return;

          const tool =
            this.createToolFromFilledInData();

          this.toolService
            .addTool({
              body: tool
            })
            .subscribe({
              next: (value) => {
                this.tool = value;
                
                this.isCreateView = false;
                this.router.navigate([value.toolId], {
                  relativeTo: this.route
                });
              },
              error: (err) => {
                console.log(err);
                this.utilService.callSnackBar(
                  'Tool could not be created.'
                );
              }
            });
        }
      });
  }

  updateTool(): void {
    const data: ConfirmDialogData = {
      title: 'Update the current tool?',
      message:
        'Do you want to update the current tool based on the current changes?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    };

    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data === undefined) return;

          this.processToolUpdate();
        }
      });
  }

  async processToolUpdate(): Promise<void> {
    if (this.tool.toolId == null) return;

    const tool =
      this.createToolFromFilledInData();
    const updatePromises: Promise<void>[] = [];

    updatePromises.push(...await this.deleteToolExistingCards());
    
    updatePromises.push(...this.updateToolTypes());

    Promise.all(updatePromises)
      .then(() => {
        this.utilService.callSnackBar('Changes have been saved successfully.');
      })
      .catch(() => {
        this.utilService.callSnackBar(
          'Error while saving tool changes! Some changed might not be able to be saved.'
        );
      });
  }

  updateToolTypes(): Promise<void>[] {
    if (this.tool.toolId == null)
      return [Promise.resolve()];

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of this.toolTypeTargetDataList) {
      updatePromises.push(
        lastValueFrom(
          this.toolService.addToolTypeToTool({
            id: this.tool.toolId,
            body: elementToAdd.dataElement
          })
        )
      );
    }

    return updatePromises;
  }
  
  async deleteToolExistingCards(): Promise<Array<Promise<void>>> {
    if (this.tool.toolId == null)
      return [Promise.resolve()];
  
    const updatePromises: Array<Promise<void>> = [];
  
    const removePromise = lastValueFrom(this.toolService.removeToolExistingCards({
      id: this.tool.toolId
    }));

    updatePromises.push(removePromise);
    await removePromise; // Wait for removal to complete
  
    return updatePromises;
  }

  createToolFromFilledInData(): Tool {
    const toolTypes: ToolType[] = [];
    for (const element of this.toolTypeTargetDataList) {
      toolTypes.push(element.dataElement as ToolType);
    }

    return {
      identifier: this.identifierInputValue,
      toolSource: {
        name: this.nameInputValue,
        description: this.descriptionInputValue,
        link: this.linkInputValue,
        author: this.authorInputValue
      },
      toolTypes: toolTypes,
    };
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

  cancel(): void {
    let data: ConfirmDialogData;
    if (this.isCreateView) {
      data = {
        title: 'Stop adding new tool?',
        message:
          'Do you want to stop adding a tool? All filled in data will be lost.',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      };
    } else {
      data = {
        title: 'Stop updating tool?',
        message:
          'Do you want to stop updating the tool? All unsaved changed will be lost.',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      };
    }

    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data === undefined) return;

          this.router.navigate(['/home']);
        }
      });
  }

  isCreateButtonActive(): boolean {
    return (
      this.nameFormControl.valid &&
      this.descriptionFormControl.valid &&
      this.linkFormControl.valid &&
      this.authorFormControl.valid
    );
  }

  onChangeName(event: Event) {
    this.nameInputValue = (event.target as HTMLInputElement).value;
  }

  onChangeIdentifier(event: Event) {
    this.identifierInputValue = (event.target as HTMLInputElement).value;
  }

  onChangeDescription(event: Event) {
    this.descriptionInputValue = (event.target as HTMLInputElement).value;
  }

  onChangeLink(event: Event) {
    this.linkInputValue = (event.target as HTMLInputElement).value;
  }

  onChangeAuthor(event: Event) {
    this.authorInputValue = (event.target as HTMLInputElement).value;
  }
}
