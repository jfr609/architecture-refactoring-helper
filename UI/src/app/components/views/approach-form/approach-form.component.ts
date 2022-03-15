import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RefactoringApproach } from '../../../../../api/repository/models/refactoring-approach';
import { lastValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { UtilService } from '../../../services/util.service';
import { NAV_PARAM_APPROACH_ID } from '../../../app.constants';
import { MatAccordion } from '@angular/material/expansion';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../../utils/custom-validators';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { DomainArtifactInput } from '../../../../../api/repository/models/domain-artifact-input';
import { RuntimeArtifactInput } from '../../../../../api/repository/models/runtime-artifact-input';
import { ModelArtifactInput } from '../../../../../api/repository/models/model-artifact-input';
import { ExecutableInput } from '../../../../../api/repository/models/executable-input';
import { ConnectedDataListElement } from '../../generics/connected-data-lists/connected-data-lists.component';
import { Quality } from '../../../../../api/repository/models/quality';
import { Direction } from '../../../../../api/repository/models/direction';
import { AutomationLevel } from '../../../../../api/repository/models/automation-level';
import { AnalysisType } from '../../../../../api/repository/models/analysis-type';
import { Technique } from '../../../../../api/repository/models/technique';
import { Architecture } from '../../../../../api/repository/models/architecture';
import { ServiceType } from '../../../../../api/repository/models/service-type';
import { ApproachOutput } from '../../../../../api/repository/models/approach-output';
import {
  copy,
  findArrayDifference,
  findArrayDifferenceWithCustomEquals,
  removeValueFromArray
} from '../../../utils/utils';
import { ResultsQuality } from '../../../../../api/repository/models/results-quality';
import { ToolSupport } from '../../../../../api/repository/models/tool-support';
import { AccuracyPrecision } from '../../../../../api/repository/models/accuracy-precision';
import { ValidationMethod } from '../../../../../api/repository/models/validation-method';
import { AttributeOptionsService } from '../../../services/attribute-options.service';

@Component({
  selector: 'app-approach-form',
  templateUrl: './approach-form.component.html',
  styleUrls: ['./approach-form.component.scss']
})
export class ApproachFormComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  titleFormControl = new FormControl('', [Validators.required]);
  yearFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1900),
    Validators.max(new Date().getFullYear())
  ]);
  linkFormControl = new FormControl('', [CustomValidators.url]);
  authorsFormControl = new FormControl('', [Validators.required]);

  refactoringApproach: RefactoringApproach = {};

  titleInputValue = '';
  yearInputValue = '';
  authorsInputValue = '';
  linkInputValue = '';

  domainArtifactSourceDataList: ConnectedDataListElement[] = [];
  domainArtifactTargetDataList: ConnectedDataListElement[] = [];
  runtimeArtifactSourceDataList: ConnectedDataListElement[] = [];
  runtimeArtifactTargetDataList: ConnectedDataListElement[] = [];
  modelArtifactSourceDataList: ConnectedDataListElement[] = [];
  modelArtifactTargetDataList: ConnectedDataListElement[] = [];
  executableSourceDataList: ConnectedDataListElement[] = [];
  executableTargetDataList: ConnectedDataListElement[] = [];
  qualitySourceDataList: ConnectedDataListElement[] = [];
  qualityTargetDataList: ConnectedDataListElement[] = [];
  directionSourceDataList: ConnectedDataListElement[] = [];
  directionTargetDataList: ConnectedDataListElement[] = [];
  automationLevelSourceDataList: ConnectedDataListElement[] = [];
  automationLevelTargetDataList: ConnectedDataListElement[] = [];
  analysisTypeSourceDataList: ConnectedDataListElement[] = [];
  analysisTypeTargetDataList: ConnectedDataListElement[] = [];
  techniqueSourceDataList: ConnectedDataListElement[] = [];
  techniqueTargetDataList: ConnectedDataListElement[] = [];

  selectedOutputArchitecture!: Architecture;
  selectedOutputServiceType!: ServiceType;
  currentOutputList: ApproachOutput[] = [];

  selectedResultsQuality!: ResultsQuality;
  selectedToolSupport!: ToolSupport;
  selectedAccuracyPrecision!: AccuracyPrecision;
  selectedValidationMethod!: ValidationMethod;

  isCreateView = true;
  isDataLoading = true;

  private routeSub!: Subscription;
  private attributeSubscriptions: Subscription[] = [];

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    public attributeOptionsService: AttributeOptionsService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.isCreateView = !paramMap.has(NAV_PARAM_APPROACH_ID);
        this.isDataLoading = true;
        if (this.isCreateView) {
          this.attributeOptionsService.requestAttributeOptions().then(() => {
            this.fillDataLists();
            this.setRadioDefaults();
            this.isDataLoading = false;
          });
        } else {
          const approachId = parseInt(
            paramMap.get(NAV_PARAM_APPROACH_ID) as string
          );

          this.requestRefactoringApproach(approachId)
            .then(() => {
              this.attributeOptionsService
                .requestAttributeOptions()
                .then(() => {
                  this.fillDataLists();
                  this.fillInOutputs();
                  this.fillInUsabilityAttributes();
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
      this.attributeOptionsService.domainArtifacts.subscribe({
        next: () => {
          this.fillDomainArtifactDataLists();
        }
      })
    );
    this.attributeSubscriptions.push(
      this.attributeOptionsService.runtimeArtifacts.subscribe({
        next: () => {
          this.fillRuntimeArtifactDataLists();
        }
      })
    );
    this.attributeSubscriptions.push(
      this.attributeOptionsService.modelArtifacts.subscribe({
        next: () => {
          this.fillModelArtifactDataLists();
        }
      })
    );
    this.attributeSubscriptions.push(
      this.attributeOptionsService.executables.subscribe({
        next: () => {
          this.fillExecutableDataLists();
        }
      })
    );
    this.attributeSubscriptions.push(
      this.attributeOptionsService.qualities.subscribe({
        next: () => {
          this.fillQualityDataLists();
        }
      })
    );
    this.attributeSubscriptions.push(
      this.attributeOptionsService.directions.subscribe({
        next: () => {
          this.fillDirectionDataLists();
        }
      })
    );
    this.attributeSubscriptions.push(
      this.attributeOptionsService.automationLevels.subscribe({
        next: () => {
          this.fillAutomationLevelDataLists();
        }
      })
    );
    this.attributeSubscriptions.push(
      this.attributeOptionsService.analysisTypes.subscribe({
        next: () => {
          this.fillAnalysisTypeDataLists();
        }
      })
    );
    this.attributeSubscriptions.push(
      this.attributeOptionsService.techniques.subscribe({
        next: () => {
          this.fillTechniqueDataLists();
        }
      })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.attributeSubscriptions) {
      subscription.unsubscribe();
    }
  }

  requestRefactoringApproach(approachId: number): Promise<void> {
    return lastValueFrom(
      this.refactoringApproachService.getRefactoringApproach({ id: approachId })
    )
      .then((value: RefactoringApproach) => {
        this.refactoringApproach = value;
      })
      .catch(() => {
        this.utilService.callSnackBar(
          'Error! Refactoring approach could not be retrieved.'
        );
      });
  }

  fillDataLists(): void {
    this.fillDomainArtifactDataLists();
    this.fillRuntimeArtifactDataLists();
    this.fillModelArtifactDataLists();
    this.fillExecutableDataLists();

    this.fillQualityDataLists();
    this.fillDirectionDataLists();
    this.fillAutomationLevelDataLists();
    this.fillAnalysisTypeDataLists();
    this.fillTechniqueDataLists();
  }

  fillInOutputs() {
    if (this.refactoringApproach.approachOutputs == null) {
      this.currentOutputList = [];
    } else {
      this.currentOutputList = copy(this.refactoringApproach.approachOutputs);
    }
  }

  setRadioDefaults(): void {
    this.setSelectedResultsQualityToDefault();
    this.setSelectedToolSupportToDefault();
    this.setSelectedAccuracyPrecisionToDefault();
    this.setSelectedValidationMethodToDefault();
  }

  fillInUsabilityAttributes() {
    if (this.refactoringApproach.approachUsability?.resultsQuality != null) {
      const foundResultsQuality =
        this.attributeOptionsService.resultsQualities.value.find(
          (value: ResultsQuality) =>
            value.name ===
            this.refactoringApproach.approachUsability?.resultsQuality.name
        );
      if (foundResultsQuality != null) {
        this.selectedResultsQuality = foundResultsQuality;
      }
    }

    if (this.refactoringApproach.approachUsability?.toolSupport != null) {
      const foundToolSupport =
        this.attributeOptionsService.toolSupports.value.find(
          (value: ToolSupport) =>
            value.name ===
            this.refactoringApproach.approachUsability?.toolSupport.name
        );
      if (foundToolSupport != null) {
        this.selectedToolSupport = foundToolSupport;
      }
    }

    if (this.refactoringApproach.approachUsability?.accuracyPrecision != null) {
      const foundAccuracyPrecision =
        this.attributeOptionsService.accuracyPrecisions.value.find(
          (value: AccuracyPrecision) =>
            value.name ===
            this.refactoringApproach.approachUsability?.accuracyPrecision.name
        );
      if (foundAccuracyPrecision != null) {
        this.selectedAccuracyPrecision = foundAccuracyPrecision;
      }
    }

    if (this.refactoringApproach.approachUsability?.validationMethod != null) {
      const foundValidationMethod =
        this.attributeOptionsService.validationMethods.value.find(
          (value: ValidationMethod) =>
            value.name ===
            this.refactoringApproach.approachUsability?.validationMethod.name
        );
      if (foundValidationMethod != null) {
        this.selectedValidationMethod = foundValidationMethod;
      }
    }
  }

  fillDomainArtifactDataLists(): void {
    this.domainArtifactSourceDataList = [];
    this.domainArtifactTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.domainArtifactInputs,
      this.attributeOptionsService.domainArtifacts.value,
      this.domainArtifactSourceDataList,
      this.domainArtifactTargetDataList,
      (e: DomainArtifactInput) => e.name
    );
  }

  fillRuntimeArtifactDataLists(): void {
    this.runtimeArtifactSourceDataList = [];
    this.runtimeArtifactTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.runtimeArtifactInputs,
      this.attributeOptionsService.runtimeArtifacts.value,
      this.runtimeArtifactSourceDataList,
      this.runtimeArtifactTargetDataList,
      (e: RuntimeArtifactInput) => e.name
    );
  }

  fillModelArtifactDataLists(): void {
    this.modelArtifactSourceDataList = [];
    this.modelArtifactTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.modelArtifactInputs,
      this.attributeOptionsService.modelArtifacts.value,
      this.modelArtifactSourceDataList,
      this.modelArtifactTargetDataList,
      (e: ModelArtifactInput) => e.name
    );
  }

  fillExecutableDataLists(): void {
    this.executableSourceDataList = [];
    this.executableTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.executableInputs,
      this.attributeOptionsService.executables.value,
      this.executableSourceDataList,
      this.executableTargetDataList,
      (e: ExecutableInput) => `${e.name}: ${e.language}`
    );
  }

  fillQualityDataLists(): void {
    this.qualitySourceDataList = [];
    this.qualityTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.qualities,
      this.attributeOptionsService.qualities.value,
      this.qualitySourceDataList,
      this.qualityTargetDataList,
      (e: Quality) => `${e.category}: ${e.name}`
    );
  }

  fillDirectionDataLists(): void {
    this.directionSourceDataList = [];
    this.directionTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.directions,
      this.attributeOptionsService.directions.value,
      this.directionSourceDataList,
      this.directionTargetDataList,
      (e: Direction) => e.name
    );
  }

  fillAutomationLevelDataLists(): void {
    this.automationLevelSourceDataList = [];
    this.automationLevelTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.automationLevels,
      this.attributeOptionsService.automationLevels.value,
      this.automationLevelSourceDataList,
      this.automationLevelTargetDataList,
      (e: AutomationLevel) => e.name
    );
  }

  fillAnalysisTypeDataLists(): void {
    this.analysisTypeSourceDataList = [];
    this.analysisTypeTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.analysisTypes,
      this.attributeOptionsService.analysisTypes.value,
      this.analysisTypeSourceDataList,
      this.analysisTypeTargetDataList,
      (e: AnalysisType) => e.name
    );
  }

  fillTechniqueDataLists(): void {
    this.techniqueSourceDataList = [];
    this.techniqueTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.techniques,
      this.attributeOptionsService.techniques.value,
      this.techniqueSourceDataList,
      this.techniqueTargetDataList,
      (e: Technique) => e.name
    );
  }

  setSelectedResultsQualityToDefault(): void {
    const defaultValue =
      this.attributeOptionsService.resultsQualities.value.find(
        (value: ResultsQuality) => value.name === 'Not available'
      );
    if (defaultValue !== undefined) {
      this.selectedResultsQuality = defaultValue;
    } else {
      this.selectedResultsQuality =
        this.attributeOptionsService.resultsQualities.value[0];
    }
  }

  setSelectedToolSupportToDefault(): void {
    const defaultValue = this.attributeOptionsService.toolSupports.value.find(
      (value: ToolSupport) => value.name === 'No tool support'
    );
    if (defaultValue !== undefined) {
      this.selectedToolSupport = defaultValue;
    } else {
      this.selectedToolSupport =
        this.attributeOptionsService.toolSupports.value[0];
    }
  }

  setSelectedAccuracyPrecisionToDefault(): void {
    const defaultValue =
      this.attributeOptionsService.accuracyPrecisions.value.find(
        (value: AccuracyPrecision) => value.name === 'Not available'
      );
    if (defaultValue !== undefined) {
      this.selectedAccuracyPrecision = defaultValue;
    } else {
      this.selectedAccuracyPrecision =
        this.attributeOptionsService.accuracyPrecisions.value[0];
    }
  }

  setSelectedValidationMethodToDefault(): void {
    const defaultValue =
      this.attributeOptionsService.validationMethods.value.find(
        (value: ValidationMethod) => value.name === 'No validation'
      );
    if (defaultValue !== undefined) {
      this.selectedValidationMethod = defaultValue;
    } else {
      this.selectedValidationMethod =
        this.attributeOptionsService.validationMethods.value[0];
    }
  }

  addOutput(): void {
    if (
      this.selectedOutputArchitecture === undefined ||
      this.selectedOutputServiceType === undefined
    ) {
      this.utilService.callSnackBar(
        'Error! Output must have an architecture and service type selected.'
      );
      return;
    }

    if (
      this.currentOutputList.find(
        (output) =>
          output.architecture?.name === this.selectedOutputArchitecture.name &&
          output.serviceType?.name === this.selectedOutputServiceType.name
      ) !== undefined
    ) {
      this.utilService.callSnackBar('Output already exists.');
      return;
    }

    // TODO maybe dialog
    this.currentOutputList.push({
      architecture: this.selectedOutputArchitecture,
      serviceType: this.selectedOutputServiceType
    });
  }

  removeOutput(output: ApproachOutput): void {
    const data: ConfirmDialogData = {
      title: 'Remove the selected output?',
      message: `Do you want to remove the output with architecture "${output.architecture?.name}" and service type "${output.serviceType?.name}"?`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data == null) return;

          removeValueFromArray(
            this.currentOutputList,
            output,
            (a, b) =>
              a.architecture?.name === b.architecture?.name &&
              a.serviceType?.name === b.serviceType?.name
          );
        }
      });
  }

  getTooltip(attribute: any): string {
    if (attribute.description != null && attribute.description.trim() != '') {
      return attribute.descption;
    }
    return 'No description';
  }

  createRefactoringApproach(): void {
    const data: ConfirmDialogData = {
      title: 'Create a new refactoring approach?',
      message:
        'Do you want to create a new refactoring approach based on the given data?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    };

    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data === undefined) return;

          const refactoringApproach =
            this.createRefactoringApproachFromFilledInData();

          this.refactoringApproachService
            .addRefactoringApproach({
              body: refactoringApproach
            })
            .subscribe({
              next: (value) => {
                this.refactoringApproach = value;
                this.isCreateView = false;
                this.router.navigate([value.refactoringApproachId], {
                  relativeTo: this.route
                });
              },
              error: (err) => {
                console.log(err);
                this.utilService.callSnackBar(
                  'Refactoring approach could not be created.'
                );
              }
            });
        }
      });
  }

  updateRefactoringApproach(): void {
    const data: ConfirmDialogData = {
      title: 'Update the current refactoring approach?',
      message:
        'Do you want to update the current refactoring approach based on the current changes?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    };

    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (data === undefined) return;

          this.processRefactoringApproachUpdate();
        }
      });
  }

  processRefactoringApproachUpdate(): void {
    if (this.refactoringApproach.refactoringApproachId == null) return;

    const refactoringApproach =
      this.createRefactoringApproachFromFilledInData();
    const updatePromises: Promise<void>[] = [];

    updatePromises.push(...this.updateDomainArtifacts(refactoringApproach));
    updatePromises.push(...this.updateRuntimeArtifacts(refactoringApproach));
    updatePromises.push(...this.updateModelArtifacts(refactoringApproach));
    updatePromises.push(...this.updateExecutables(refactoringApproach));

    updatePromises.push(...this.updateQualities(refactoringApproach));
    updatePromises.push(...this.updateDirections(refactoringApproach));
    updatePromises.push(...this.updateAutomationLevels(refactoringApproach));
    updatePromises.push(...this.updateAnalysisTypes(refactoringApproach));
    updatePromises.push(...this.updateTechniques(refactoringApproach));

    updatePromises.push(...this.updateOutputs(refactoringApproach));

    updatePromises.push(
      lastValueFrom(
        this.refactoringApproachService.updateResultsQuality({
          id: this.refactoringApproach.refactoringApproachId,
          body: this.selectedResultsQuality
        })
      )
    );
    updatePromises.push(
      lastValueFrom(
        this.refactoringApproachService.updateToolSupport({
          id: this.refactoringApproach.refactoringApproachId,
          body: this.selectedToolSupport
        })
      )
    );
    updatePromises.push(
      lastValueFrom(
        this.refactoringApproachService.updateAccuracyPrecision({
          id: this.refactoringApproach.refactoringApproachId,
          body: this.selectedAccuracyPrecision
        })
      )
    );
    updatePromises.push(
      lastValueFrom(
        this.refactoringApproachService.updateValidationMethod({
          id: this.refactoringApproach.refactoringApproachId,
          body: this.selectedValidationMethod
        })
      )
    );

    Promise.all(updatePromises)
      .then(() => {
        this.utilService.callSnackBar('Changes have been saved successfully.');
      })
      .catch(() => {
        this.utilService.callSnackBar(
          'Error while saving refactoring approach changes! Some changed might not be able to be saved.'
        );
      });
  }

  updateDomainArtifacts(
    refactoringApproach: RefactoringApproach
  ): Promise<void>[] {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: DomainArtifactInput[] = findArrayDifference(
      this.refactoringApproach.domainArtifactInputs,
      refactoringApproach.domainArtifactInputs
    );
    const elementsToAdd: DomainArtifactInput[] = findArrayDifference(
      refactoringApproach.domainArtifactInputs,
      this.refactoringApproach.domainArtifactInputs
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addDomainArtifactAsInput({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.name == null) break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeDomainArtifactFromInputs({
            id: this.refactoringApproach.refactoringApproachId,
            inputName: elementToRemove.name
          })
        )
      );
    }

    return updatePromises;
  }

  updateRuntimeArtifacts(
    refactoringApproach: RefactoringApproach
  ): Promise<void>[] {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: RuntimeArtifactInput[] = findArrayDifference(
      this.refactoringApproach.runtimeArtifactInputs,
      refactoringApproach.runtimeArtifactInputs
    );
    const elementsToAdd: RuntimeArtifactInput[] = findArrayDifference(
      refactoringApproach.runtimeArtifactInputs,
      this.refactoringApproach.runtimeArtifactInputs
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addRuntimeArtifactAsInput({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.name == null) break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeRuntimeArtifactFromInputs({
            id: this.refactoringApproach.refactoringApproachId,
            inputName: elementToRemove.name
          })
        )
      );
    }

    return updatePromises;
  }

  updateModelArtifacts(
    refactoringApproach: RefactoringApproach
  ): Promise<void>[] {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: ModelArtifactInput[] = findArrayDifference(
      this.refactoringApproach.modelArtifactInputs,
      refactoringApproach.modelArtifactInputs
    );
    const elementsToAdd: ModelArtifactInput[] = findArrayDifference(
      refactoringApproach.modelArtifactInputs,
      this.refactoringApproach.modelArtifactInputs
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addModelArtifactAsInput({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.name == null) break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeModelArtifactFromInputs({
            id: this.refactoringApproach.refactoringApproachId,
            inputName: elementToRemove.name
          })
        )
      );
    }

    return updatePromises;
  }

  updateExecutables(refactoringApproach: RefactoringApproach): Promise<void>[] {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: ExecutableInput[] = findArrayDifference(
      this.refactoringApproach.executableInputs,
      refactoringApproach.executableInputs
    );
    const elementsToAdd: ExecutableInput[] = findArrayDifference(
      refactoringApproach.executableInputs,
      this.refactoringApproach.executableInputs
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addExecutableAsInput({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.name == null || elementToRemove.language == null)
        break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeExecutableFromInputs({
            id: this.refactoringApproach.refactoringApproachId,
            inputName: elementToRemove.name,
            language: elementToRemove.language
          })
        )
      );
    }

    return updatePromises;
  }

  updateQualities(refactoringApproach: RefactoringApproach): Promise<void>[] {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: Quality[] = findArrayDifference(
      this.refactoringApproach.approachProcess?.qualities,
      refactoringApproach.approachProcess?.qualities
    );
    const elementsToAdd: Quality[] = findArrayDifference(
      refactoringApproach.approachProcess?.qualities,
      this.refactoringApproach.approachProcess?.qualities
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addQualityToProcess({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.name == null) break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeQualityFromProcess({
            id: this.refactoringApproach.refactoringApproachId,
            qualityName: elementToRemove.name
          })
        )
      );
    }

    return updatePromises;
  }

  updateDirections(refactoringApproach: RefactoringApproach): Promise<void>[] {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: Direction[] = findArrayDifference(
      this.refactoringApproach.approachProcess?.directions,
      refactoringApproach.approachProcess?.directions
    );
    const elementsToAdd: Direction[] = findArrayDifference(
      refactoringApproach.approachProcess?.directions,
      this.refactoringApproach.approachProcess?.directions
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addDirectionToProcess({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.name == null) break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeDirectionFromProcess({
            id: this.refactoringApproach.refactoringApproachId,
            directionName: elementToRemove.name
          })
        )
      );
    }

    return updatePromises;
  }

  updateAutomationLevels(
    refactoringApproach: RefactoringApproach
  ): Promise<void>[] {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: AutomationLevel[] = findArrayDifference(
      this.refactoringApproach.approachProcess?.automationLevels,
      refactoringApproach.approachProcess?.automationLevels
    );
    const elementsToAdd: AutomationLevel[] = findArrayDifference(
      refactoringApproach.approachProcess?.automationLevels,
      this.refactoringApproach.approachProcess?.automationLevels
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addAutomationLevelToProcess({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.name == null) break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeAutomationLevelFromProcess({
            id: this.refactoringApproach.refactoringApproachId,
            automationLevelName: elementToRemove.name
          })
        )
      );
    }

    return updatePromises;
  }

  updateAnalysisTypes(
    refactoringApproach: RefactoringApproach
  ): Promise<void>[] {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: AnalysisType[] = findArrayDifference(
      this.refactoringApproach.approachProcess?.analysisTypes,
      refactoringApproach.approachProcess?.analysisTypes
    );
    const elementsToAdd: AnalysisType[] = findArrayDifference(
      refactoringApproach.approachProcess?.analysisTypes,
      this.refactoringApproach.approachProcess?.analysisTypes
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addAnalysisTypeToProcess({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.name == null) break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeAnalysisTypeFromProcess({
            id: this.refactoringApproach.refactoringApproachId,
            analysisTypeName: elementToRemove.name
          })
        )
      );
    }

    return updatePromises;
  }

  updateTechniques(refactoringApproach: RefactoringApproach): Promise<void>[] {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: Technique[] = findArrayDifference(
      this.refactoringApproach.approachProcess?.techniques,
      refactoringApproach.approachProcess?.techniques
    );
    const elementsToAdd: Technique[] = findArrayDifference(
      refactoringApproach.approachProcess?.techniques,
      this.refactoringApproach.approachProcess?.techniques
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addTechniqueToProcess({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.name == null) break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeTechniqueFromProcess({
            id: this.refactoringApproach.refactoringApproachId,
            techniqueName: elementToRemove.name
          })
        )
      );
    }

    return updatePromises;
  }

  updateOutputs(refactoringApproach: RefactoringApproach) {
    if (this.refactoringApproach.refactoringApproachId == null)
      return [Promise.resolve()];

    const elementsToRemove: ApproachOutput[] =
      findArrayDifferenceWithCustomEquals(
        this.refactoringApproach.approachOutputs,
        refactoringApproach.approachOutputs,
        (a: ApproachOutput, b: ApproachOutput) =>
          a.architecture?.name === b.architecture?.name &&
          a.serviceType?.name === b.serviceType?.name
      );
    const elementsToAdd: ApproachOutput[] = findArrayDifferenceWithCustomEquals(
      refactoringApproach.approachOutputs,
      this.refactoringApproach.approachOutputs,
      (a: ApproachOutput, b: ApproachOutput) =>
        a.architecture?.name === b.architecture?.name &&
        a.serviceType?.name === b.serviceType?.name
    );

    const updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addOutput({
            id: this.refactoringApproach.refactoringApproachId,
            body: elementToAdd
          })
        )
      );
    }
    for (const elementToRemove of elementsToRemove) {
      if (elementToRemove.approachOutputId == null) break;

      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.removeOutput({
            id: this.refactoringApproach.refactoringApproachId,
            outputId: elementToRemove.approachOutputId
          })
        )
      );
    }

    return updatePromises;
  }

  createRefactoringApproachFromFilledInData(): RefactoringApproach {
    const domainArtifactInputs: DomainArtifactInput[] = [];
    for (const element of this.domainArtifactTargetDataList) {
      domainArtifactInputs.push(element.dataElement as DomainArtifactInput);
    }

    const runtimeArtifactInputs: RuntimeArtifactInput[] = [];
    for (const element of this.runtimeArtifactTargetDataList) {
      runtimeArtifactInputs.push(element.dataElement as RuntimeArtifactInput);
    }

    const modelArtifactInputs: ModelArtifactInput[] = [];
    for (const element of this.modelArtifactTargetDataList) {
      modelArtifactInputs.push(element.dataElement as ModelArtifactInput);
    }

    const executableInputs: ExecutableInput[] = [];
    for (const element of this.executableTargetDataList) {
      executableInputs.push(element.dataElement as ExecutableInput);
    }

    const qualities: Quality[] = [];
    for (const element of this.qualityTargetDataList) {
      qualities.push(element.dataElement as Quality);
    }

    const directions: Direction[] = [];
    for (const element of this.directionTargetDataList) {
      directions.push(element.dataElement as Direction);
    }

    const automationLevels: AutomationLevel[] = [];
    for (const element of this.automationLevelTargetDataList) {
      automationLevels.push(element.dataElement as AutomationLevel);
    }

    const analysisTypes: AnalysisType[] = [];
    for (const element of this.analysisTypeTargetDataList) {
      analysisTypes.push(element.dataElement as AnalysisType);
    }

    const techniques: Technique[] = [];
    for (const element of this.techniqueTargetDataList) {
      techniques.push(element.dataElement as Technique);
    }

    return {
      approachSource: {
        title: this.titleInputValue,
        year: parseInt(this.yearInputValue),
        link: this.linkInputValue,
        authors: this.authorsInputValue
      },
      domainArtifactInputs: domainArtifactInputs,
      runtimeArtifactInputs: runtimeArtifactInputs,
      modelArtifactInputs: modelArtifactInputs,
      executableInputs: executableInputs,
      approachProcess: {
        qualities: qualities,
        directions: directions,
        automationLevels: automationLevels,
        analysisTypes: analysisTypes,
        techniques: techniques
      },
      approachOutputs: this.currentOutputList,
      approachUsability: {
        resultsQuality: this.selectedResultsQuality,
        toolSupport: this.selectedToolSupport,
        accuracyPrecision: this.selectedAccuracyPrecision,
        validationMethod: this.selectedValidationMethod
      }
    };
  }

  deleteRefactoringApproach() {
    const data: ConfirmDialogData = {
      title: 'Delete Refactoring Approach?',
      message: `Do you really want to delete the refactoring approach "${this.refactoringApproach.approachSource?.title}"?`,
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
            this.refactoringApproach.refactoringApproachId == null
          )
            return;

          lastValueFrom(
            this.refactoringApproachService.deleteRefactoringApproach({
              id: this.refactoringApproach.refactoringApproachId
            })
          )
            .then(() => {
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

  cancel(): void {
    let data: ConfirmDialogData;
    if (this.isCreateView) {
      data = {
        title: 'Stop adding new refactoring approach?',
        message:
          'Do you want to stop adding a refactoring approach? All filled in data will be lost.',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      };
    } else {
      data = {
        title: 'Stop updating refactoring approach?',
        message:
          'Do you want to stop updating the refactoring approach? All unsaved changed will be lost.',
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
      this.titleFormControl.valid &&
      this.yearFormControl.valid &&
      this.linkFormControl.valid &&
      this.authorsFormControl.valid
    );
  }

  onChangeTitle(event: Event) {
    this.titleInputValue = (event.target as HTMLInputElement).value;
  }

  onChangeYear(event: Event) {
    this.yearInputValue = (event.target as HTMLInputElement).value;
  }

  onChangeLink(event: Event) {
    this.linkInputValue = (event.target as HTMLInputElement).value;
  }

  onChangeAuthors(event: Event) {
    this.authorsInputValue = (event.target as HTMLInputElement).value;
  }
}
