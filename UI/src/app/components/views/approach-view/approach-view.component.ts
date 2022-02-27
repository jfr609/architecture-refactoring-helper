import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ApproachInputService } from '../../../../../api/repository/services/approach-input.service';
import { ApproachProcessService } from '../../../../../api/repository/services/approach-process.service';
import { ApproachOutputService } from '../../../../../api/repository/services/approach-output.service';
import { ApproachUsabilityService } from '../../../../../api/repository/services/approach-usability.service';
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
  removeElementFromArray
} from '../../../utils/utils';
import { ResultsQuality } from '../../../../../api/repository/models/results-quality';
import { ToolSupport } from '../../../../../api/repository/models/tool-support';
import { AccuracyPrecision } from '../../../../../api/repository/models/accuracy-precision';
import { ValidationMethod } from '../../../../../api/repository/models/validation-method';

@Component({
  selector: 'app-approach-view',
  templateUrl: './approach-view.component.html',
  styleUrls: ['./approach-view.component.scss']
})
export class ApproachViewComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  titleFormControl = new FormControl('', [Validators.required]);
  yearFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1900),
    Validators.max(new Date().getFullYear())
  ]);
  linkFormControl = new FormControl('', [
    Validators.required,
    CustomValidators.url
  ]);
  authorsFormControl = new FormControl('', [Validators.required]);

  refactoringApproach: RefactoringApproach = {};
  domainArtifacts: DomainArtifactInput[] = [];
  runtimeArtifacts: RuntimeArtifactInput[] = [];
  modelArtifacts: ModelArtifactInput[] = [];
  executables: ExecutableInput[] = [];
  qualities: Quality[] = [];
  directions: Direction[] = [];
  automationLevels: AutomationLevel[] = [];
  analysisTypes: AnalysisType[] = [];
  techniques: Technique[] = [];
  architectures: Architecture[] = [];
  serviceTypes: ServiceType[] = [];
  resultsQualities: ResultsQuality[] = [];
  toolSupports: ToolSupport[] = [];
  accuracyPrecisions: AccuracyPrecision[] = [];
  validationMethods: ValidationMethod[] = [];

  titleInputValue: string = '';
  yearInputValue: string = '';
  authorsInputValue: string = '';
  linkInputValue: string = '';

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

  isCreateView: boolean = true;
  isDataLoading: boolean = true;

  private routeSub!: Subscription;

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    private inputService: ApproachInputService,
    private processService: ApproachProcessService,
    private outputService: ApproachOutputService,
    private usabilityService: ApproachUsabilityService,
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
          this.requestAllData(() => {
            this.isDataLoading = false;
          });
        } else {
          let approachId = parseInt(
            paramMap.get(NAV_PARAM_APPROACH_ID) as string
          );

          this.requestRefactoringApproach(approachId)
            .then(() => {
              this.requestAllData(() => {
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
  }

  requestAllData(onDataLoaded: () => void | PromiseLike<void>): void {
    let dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestDomainArtifacts());
    dataLoadingPromises.push(this.requestRuntimeArtifacts());
    dataLoadingPromises.push(this.requestModelArtifacts());
    dataLoadingPromises.push(this.requestExecutables());
    dataLoadingPromises.push(this.requestQualities());
    dataLoadingPromises.push(this.requestDirections());
    dataLoadingPromises.push(this.requestAutomationLevels());
    dataLoadingPromises.push(this.requestAnalysisTypes());
    dataLoadingPromises.push(this.requestTechniques());
    dataLoadingPromises.push(this.requestArchitectures());
    dataLoadingPromises.push(this.requestServiceTypes());
    dataLoadingPromises.push(this.requestResultsQualities());
    dataLoadingPromises.push(this.requestToolSupports());
    dataLoadingPromises.push(this.requestAccuracyPrecisions());
    dataLoadingPromises.push(this.requestValidationMethods());

    Promise.all(dataLoadingPromises).then(() => {
      onDataLoaded();
      this.isDataLoading = false;
    });
  }

  requestRefactoringApproach(approachId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.refactoringApproachService
        .getRefactoringApproach({ id: approachId })
        .subscribe({
          next: (response: RefactoringApproach) => {
            this.refactoringApproach = response;
            resolve();
          },
          error: () => {
            this.utilService.callSnackBar(
              'Error! Refactoring approach could not be retrieved.'
            );
            reject();
          }
        });
    });
  }

  fillInOutputs() {
    if (this.refactoringApproach.approachOutputs == null) {
      this.currentOutputList = [];
    } else {
      this.currentOutputList = copy(this.refactoringApproach.approachOutputs);
    }
  }

  fillInUsabilityAttributes() {
    if (this.refactoringApproach.approachUsability?.resultsQuality != null) {
      // @ts-ignore
      this.selectedResultsQuality = this.resultsQualities.find(
        (value) =>
          value.name ===
          // @ts-ignore
          this.refactoringApproach.approachUsability.resultsQuality.name
      );
    }
    if (this.refactoringApproach.approachUsability?.toolSupport != null) {
      // @ts-ignore
      this.selectedToolSupport = this.toolSupports.find(
        (value) =>
          value.name ===
          // @ts-ignore
          this.refactoringApproach.approachUsability.toolSupport.name
      );
    }
    if (this.refactoringApproach.approachUsability?.accuracyPrecision != null) {
      // @ts-ignore
      this.selectedAccuracyPrecision = this.accuracyPrecisions.find(
        (value) =>
          value.name ===
          // @ts-ignore
          this.refactoringApproach.approachUsability.accuracyPrecision.name
      );
    }
    if (this.refactoringApproach.approachUsability?.validationMethod != null) {
      // @ts-ignore
      this.selectedValidationMethod = this.validationMethods.find(
        (value) =>
          value.name ===
          // @ts-ignore
          this.refactoringApproach.approachUsability.validationMethod.name
      );
    }
  }

  requestDomainArtifacts(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.inputService.listDomainArtifacts().subscribe({
        next: (response: DomainArtifactInput[]) => {
          this.domainArtifacts = response;
          this.fillDomainArtifactDataLists();
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Input domain artifacts could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  fillDomainArtifactDataLists(): void {
    this.domainArtifactSourceDataList = [];
    this.domainArtifactTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.domainArtifactInputs,
      this.domainArtifacts,
      this.domainArtifactSourceDataList,
      this.domainArtifactTargetDataList,
      (a: DomainArtifactInput, b: DomainArtifactInput) => a.name === b.name,
      (e: DomainArtifactInput) => e.name
    );
  }

  requestRuntimeArtifacts(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.inputService.listRuntimeArtifact().subscribe({
        next: (response: RuntimeArtifactInput[]) => {
          this.runtimeArtifacts = response;
          this.fillRuntimeArtifactDataLists();
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Input runtime artifacts could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  fillRuntimeArtifactDataLists(): void {
    this.runtimeArtifactSourceDataList = [];
    this.runtimeArtifactTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.runtimeArtifactInputs,
      this.runtimeArtifacts,
      this.runtimeArtifactSourceDataList,
      this.runtimeArtifactTargetDataList,
      (a: RuntimeArtifactInput, b: RuntimeArtifactInput) => a.name === b.name,
      (e: RuntimeArtifactInput) => e.name
    );
  }

  requestModelArtifacts(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.inputService.listModelArtifacts().subscribe({
        next: (response: ModelArtifactInput[]) => {
          this.modelArtifacts = response;
          this.fillModelArtifactDataLists();
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Input model artifacts could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  fillModelArtifactDataLists(): void {
    this.modelArtifactSourceDataList = [];
    this.modelArtifactTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.modelArtifactInputs,
      this.modelArtifacts,
      this.modelArtifactSourceDataList,
      this.modelArtifactTargetDataList,
      (a: ModelArtifactInput, b: ModelArtifactInput) => a.name === b.name,
      (e: ModelArtifactInput) => e.name
    );
  }

  requestExecutables(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.inputService.listExecutables().subscribe({
        next: (response: ExecutableInput[]) => {
          this.executables = response;
          this.fillExecutableDataLists();
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Input executables could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  fillExecutableDataLists(): void {
    this.executableSourceDataList = [];
    this.executableTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.executableInputs,
      this.executables,
      this.executableSourceDataList,
      this.executableTargetDataList,
      (a: ExecutableInput, b: ExecutableInput) =>
        a.name === b.name && a.language === a.language,
      (e: ExecutableInput) => `${e.name}: ${e.language}`
    );
  }

  requestQualities(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processService.listQualities().subscribe({
        next: (response: Quality[]) => {
          this.qualities = response;
          this.fillQualityDataLists();
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Process qualities could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  fillQualityDataLists(): void {
    this.qualitySourceDataList = [];
    this.qualityTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.qualities,
      this.qualities,
      this.qualitySourceDataList,
      this.qualityTargetDataList,
      (a: Quality, b: Quality) => a.name === b.name,
      (e: Quality) => `${e.category}: ${e.name}`
    );
  }

  requestDirections(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processService.listDirections().subscribe({
        next: (response: Direction[]) => {
          this.directions = response;
          this.fillDirectionDataLists();
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Process directions could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  fillDirectionDataLists(): void {
    this.directionSourceDataList = [];
    this.directionTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.directions,
      this.directions,
      this.directionSourceDataList,
      this.directionTargetDataList,
      (a: Direction, b: Direction) => a.name === b.name,
      (e: Direction) => e.name
    );
  }

  requestAutomationLevels(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processService.listAutomationLevels().subscribe({
        next: (response: AutomationLevel[]) => {
          this.automationLevels = response;
          this.fillAutomationLevelDataLists();
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Process automation levels could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  fillAutomationLevelDataLists(): void {
    this.automationLevelSourceDataList = [];
    this.automationLevelTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.automationLevels,
      this.automationLevels,
      this.automationLevelSourceDataList,
      this.automationLevelTargetDataList,
      (a: AutomationLevel, b: AutomationLevel) => a.name === b.name,
      (e: AutomationLevel) => e.name
    );
  }

  requestAnalysisTypes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processService.listAnalysisTypes().subscribe({
        next: (response: AnalysisType[]) => {
          this.analysisTypes = response;
          this.fillAnalysisTypeDataLists();
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Process analysis types could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  fillAnalysisTypeDataLists(): void {
    this.analysisTypeSourceDataList = [];
    this.analysisTypeTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.analysisTypes,
      this.analysisTypes,
      this.analysisTypeSourceDataList,
      this.analysisTypeTargetDataList,
      (a: AnalysisType, b: AnalysisType) => a.name === b.name,
      (e: AnalysisType) => e.name
    );
  }

  requestTechniques(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processService.listTechniques().subscribe({
        next: (response: Technique[]) => {
          this.techniques = response;
          this.fillTechniqueDataLists();
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Process techniques could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  fillTechniqueDataLists(): void {
    this.techniqueSourceDataList = [];
    this.techniqueTargetDataList = [];

    this.utilService.fillConnectedDataLists(
      this.isCreateView,
      this.refactoringApproach.approachProcess?.techniques,
      this.techniques,
      this.techniqueSourceDataList,
      this.techniqueTargetDataList,
      (a: Technique, b: Technique) => a.name === b.name,
      (e: Technique) => e.name
    );
  }

  requestArchitectures(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.outputService.listArchitectures().subscribe({
        next: (response: Architecture[]) => {
          this.architectures = response;
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Output architectures could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  requestServiceTypes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.outputService.listServiceTypes().subscribe({
        next: (response: ServiceType[]) => {
          this.serviceTypes = response;
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Output service types could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  requestResultsQualities(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usabilityService.listResultsQualities().subscribe({
        next: (response: ResultsQuality[]) => {
          this.resultsQualities = response;
          let defaultValue = this.resultsQualities.find(
            (value) => value.name === 'Not available'
          );
          if (defaultValue !== undefined) {
            this.selectedResultsQuality = defaultValue;
          } else {
            this.selectedResultsQuality = this.resultsQualities[0];
          }
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Results quality options could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  requestToolSupports(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usabilityService.listToolSupports().subscribe({
        next: (response: ToolSupport[]) => {
          this.toolSupports = response;
          let defaultValue = this.toolSupports.find(
            (value) => value.name === 'No tool support'
          );
          if (defaultValue !== undefined) {
            this.selectedToolSupport = defaultValue;
          } else {
            this.selectedToolSupport = this.toolSupports[0];
          }
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Tool support options could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  requestAccuracyPrecisions(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usabilityService.listAccuracyPrecisions().subscribe({
        next: (response: AccuracyPrecision[]) => {
          this.accuracyPrecisions = response;
          let defaultValue = this.accuracyPrecisions.find(
            (value) => value.name === 'Not available'
          );
          if (defaultValue !== undefined) {
            this.selectedAccuracyPrecision = defaultValue;
          } else {
            this.selectedAccuracyPrecision = this.accuracyPrecisions[0];
          }
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Accuracy/Precision options could not be retrieved.'
          );
          reject();
        }
      });
    });
  }

  requestValidationMethods(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usabilityService.listValidationMethods().subscribe({
        next: (response: ValidationMethod[]) => {
          this.validationMethods = response;
          let defaultValue = this.validationMethods.find(
            (value) => value.name === 'No validation'
          );
          if (defaultValue !== undefined) {
            this.selectedValidationMethod = defaultValue;
          } else {
            this.selectedValidationMethod = this.validationMethods[0];
          }
          resolve();
        },
        error: () => {
          this.utilService.callSnackBar(
            'Error! Validation method options could not be retrieved.'
          );
          reject();
        }
      });
    });
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
    let data: ConfirmDialogData = {
      title: 'Remove the selected output?',
      message: `Do you want to remove the output with architecture \"${output.architecture?.name}\" and service type \"${output.serviceType?.name}\"?`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data == null) return;

          removeElementFromArray(
            this.currentOutputList,
            output,
            (a, b) =>
              a.architecture?.name === b.architecture?.name &&
              a.serviceType?.name === b.serviceType?.name
          );
        }
      });
  }

  createRefactoringApproach(): void {
    let data: ConfirmDialogData = {
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

          let refactoringApproach =
            this.createRefactoringApproachFromFilledInData();
          this.refactoringApproachService
            .addRefactoringApproach({ body: refactoringApproach })
            .subscribe({
              next: (value: RefactoringApproach) => {
                this.refactoringApproach = value;
                this.isCreateView = false;
                this.router.navigate([value.refactoringApproachId], {
                  relativeTo: this.route
                });
              },
              error: () => {
                this.utilService.callSnackBar(
                  'Refactoring approach could not be created.'
                );
              }
            });
        }
      });
  }

  updateRefactoringApproach(): void {
    let data: ConfirmDialogData = {
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

          // TODO update
          this.processRefactoringApproachUpdate();
        }
      });
  }

  processRefactoringApproachUpdate(): void {
    if (this.refactoringApproach.refactoringApproachId == null) return;

    let refactoringApproach = this.createRefactoringApproachFromFilledInData();
    let updatePromises: Promise<void>[] = [];

    updatePromises.push(...this.updateDomainArtifacts(refactoringApproach));
    updatePromises.push(...this.updateRuntimeArtifacts(refactoringApproach));
    updatePromises.push(...this.updateModelArtifacts(refactoringApproach));
    updatePromises.push(...this.updateExecutables(refactoringApproach));

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

    Promise.all(updatePromises);
  }

  updateDomainArtifacts(
    refactoringApproach: RefactoringApproach
  ): Promise<void>[] {
    let elementsToRemove: DomainArtifactInput[] = findArrayDifference(
      this.refactoringApproach.domainArtifactInputs,
      refactoringApproach.domainArtifactInputs,
      (a: DomainArtifactInput, b: DomainArtifactInput) => a.name === b.name
    );
    let elementsToAdd: DomainArtifactInput[] = findArrayDifference(
      refactoringApproach.domainArtifactInputs,
      this.refactoringApproach.domainArtifactInputs,
      (a: DomainArtifactInput, b: DomainArtifactInput) => a.name === b.name
    );

    let updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addDomainArtifactAsInput({
            // @ts-ignore
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
            // @ts-ignore
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
    let elementsToRemove: RuntimeArtifactInput[] = findArrayDifference(
      this.refactoringApproach.runtimeArtifactInputs,
      refactoringApproach.runtimeArtifactInputs,
      (a: RuntimeArtifactInput, b: RuntimeArtifactInput) => a.name === b.name
    );
    let elementsToAdd: RuntimeArtifactInput[] = findArrayDifference(
      refactoringApproach.runtimeArtifactInputs,
      this.refactoringApproach.runtimeArtifactInputs,
      (a: RuntimeArtifactInput, b: RuntimeArtifactInput) => a.name === b.name
    );

    let updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addRuntimeArtifactAsInput({
            // @ts-ignore
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
            // @ts-ignore
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
    let elementsToRemove: ModelArtifactInput[] = findArrayDifference(
      this.refactoringApproach.modelArtifactInputs,
      refactoringApproach.modelArtifactInputs,
      (a: ModelArtifactInput, b: ModelArtifactInput) => a.name === b.name
    );
    let elementsToAdd: ModelArtifactInput[] = findArrayDifference(
      refactoringApproach.modelArtifactInputs,
      this.refactoringApproach.modelArtifactInputs,
      (a: ModelArtifactInput, b: ModelArtifactInput) => a.name === b.name
    );

    let updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addModelArtifactAsInput({
            // @ts-ignore
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
            // @ts-ignore
            id: this.refactoringApproach.refactoringApproachId,
            inputName: elementToRemove.name
          })
        )
      );
    }

    return updatePromises;
  }

  updateExecutables(refactoringApproach: RefactoringApproach): Promise<void>[] {
    let elementsToRemove: ExecutableInput[] = findArrayDifference(
      this.refactoringApproach.executableInputs,
      refactoringApproach.executableInputs,
      (a: ExecutableInput, b: ExecutableInput) =>
        a.name === b.name && a.language === b.language
    );
    let elementsToAdd: ExecutableInput[] = findArrayDifference(
      refactoringApproach.executableInputs,
      this.refactoringApproach.executableInputs,
      (a: ExecutableInput, b: ExecutableInput) =>
        a.name === b.name && a.language === b.language
    );

    let updatePromises: Promise<void>[] = [];
    for (const elementToAdd of elementsToAdd) {
      updatePromises.push(
        lastValueFrom(
          this.refactoringApproachService.addExecutableAsInput({
            // @ts-ignore
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
            // @ts-ignore
            id: this.refactoringApproach.refactoringApproachId,
            inputName: elementToRemove.name,
            language: elementToRemove.language
          })
        )
      );
    }

    return updatePromises;
  }

  createRefactoringApproachFromFilledInData(): RefactoringApproach {
    let domainArtifactInputs: DomainArtifactInput[] = [];
    for (const element of this.domainArtifactTargetDataList) {
      domainArtifactInputs.push(element.dataElement as DomainArtifactInput);
    }

    let runtimeArtifactInputs: RuntimeArtifactInput[] = [];
    for (const element of this.runtimeArtifactTargetDataList) {
      runtimeArtifactInputs.push(element.dataElement as RuntimeArtifactInput);
    }

    let modelArtifactInputs: ModelArtifactInput[] = [];
    for (const element of this.modelArtifactTargetDataList) {
      modelArtifactInputs.push(element.dataElement as ModelArtifactInput);
    }

    let executableInputs: ExecutableInput[] = [];
    for (const element of this.executableTargetDataList) {
      executableInputs.push(element.dataElement as ExecutableInput);
    }

    let qualities: Quality[] = [];
    for (const element of this.qualityTargetDataList) {
      qualities.push(element.dataElement as Quality);
    }

    let directions: Direction[] = [];
    for (const element of this.directionTargetDataList) {
      directions.push(element.dataElement as Direction);
    }

    let automationLevels: AutomationLevel[] = [];
    for (const element of this.automationLevelTargetDataList) {
      automationLevels.push(element.dataElement as AutomationLevel);
    }

    let analysisTypes: AnalysisType[] = [];
    for (const element of this.analysisTypeTargetDataList) {
      analysisTypes.push(element.dataElement as AnalysisType);
    }

    let techniques: Technique[] = [];
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
