import { Injectable } from '@angular/core';
import { DomainArtifactInput } from '../../../api/repository/models/domain-artifact-input';
import { RuntimeArtifactInput } from '../../../api/repository/models/runtime-artifact-input';
import { ModelArtifactInput } from '../../../api/repository/models/model-artifact-input';
import { ExecutableInput } from '../../../api/repository/models/executable-input';
import { Quality } from '../../../api/repository/models/quality';
import { Direction } from '../../../api/repository/models/direction';
import { AutomationLevel } from '../../../api/repository/models/automation-level';
import { AnalysisType } from '../../../api/repository/models/analysis-type';
import { Technique } from '../../../api/repository/models/technique';
import { Architecture } from '../../../api/repository/models/architecture';
import { ServiceType } from '../../../api/repository/models/service-type';
import { ResultsQuality } from '../../../api/repository/models/results-quality';
import { ToolSupport } from '../../../api/repository/models/tool-support';
import { AccuracyPrecision } from '../../../api/repository/models/accuracy-precision';
import { ValidationMethod } from '../../../api/repository/models/validation-method';
import { UtilService } from './util.service';
import { RefactoringApproachService } from '../../../api/repository/services/refactoring-approach.service';
import { ApproachInputService } from '../../../api/repository/services/approach-input.service';
import { ApproachProcessService } from '../../../api/repository/services/approach-process.service';
import { ApproachOutputService } from '../../../api/repository/services/approach-output.service';
import { ApproachUsabilityService } from '../../../api/repository/services/approach-usability.service';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import {
  CreateAttributeDialogComponent,
  CreateAttributeDialogData
} from '../components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import {
  DeleteAttributeDialogComponent,
  DeleteAttributeDialogData
} from '../components/dialogs/delete-attribute-dialog/delete-attribute-dialog.component';
import { Validators } from '@angular/forms';
import { removeValueFromArray } from '../utils/utils';
import { QualityCategory } from '../../../api/repository/models/quality-category';
import { QualitySublevel } from 'api/repository/models';

@Injectable({
  providedIn: 'root'
})
export class AttributeOptionsService {
  public domainArtifacts: BehaviorSubject<DomainArtifactInput[]> =
    new BehaviorSubject<DomainArtifactInput[]>([]);
  public runtimeArtifacts: BehaviorSubject<RuntimeArtifactInput[]> =
    new BehaviorSubject<RuntimeArtifactInput[]>([]);
  public modelArtifacts: BehaviorSubject<ModelArtifactInput[]> =
    new BehaviorSubject<ModelArtifactInput[]>([]);
  public executables: BehaviorSubject<ExecutableInput[]> = new BehaviorSubject<
    ExecutableInput[]
  >([]);
  public qualities: BehaviorSubject<Quality[]> = new BehaviorSubject<Quality[]>(
    []
  );
  public qualitySublevels: BehaviorSubject<QualitySublevel[]> =
    new BehaviorSubject<QualitySublevel[]>([]);
  public directions: BehaviorSubject<Direction[]> = new BehaviorSubject<
    Direction[]
  >([]);
  public automationLevels: BehaviorSubject<AutomationLevel[]> =
    new BehaviorSubject<AutomationLevel[]>([]);
  public analysisTypes: BehaviorSubject<AnalysisType[]> = new BehaviorSubject<
    AnalysisType[]
  >([]);
  public techniques: BehaviorSubject<Technique[]> = new BehaviorSubject<
    Technique[]
  >([]);
  public architectures: BehaviorSubject<Architecture[]> = new BehaviorSubject<
    Architecture[]
  >([]);
  public serviceTypes: BehaviorSubject<ServiceType[]> = new BehaviorSubject<
    ServiceType[]
  >([]);
  public resultsQualities: BehaviorSubject<ResultsQuality[]> =
    new BehaviorSubject<ResultsQuality[]>([]);
  public toolSupports: BehaviorSubject<ToolSupport[]> = new BehaviorSubject<
    ToolSupport[]
  >([]);
  public accuracyPrecisions: BehaviorSubject<AccuracyPrecision[]> =
    new BehaviorSubject<AccuracyPrecision[]>([]);
  public validationMethods: BehaviorSubject<ValidationMethod[]> =
    new BehaviorSubject<ValidationMethod[]>([]);

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    private inputService: ApproachInputService,
    private processService: ApproachProcessService,
    private outputService: ApproachOutputService,
    private usabilityService: ApproachUsabilityService,
    private utilService: UtilService
  ) {}

  getQualitiesByCategory(category: QualityCategory): Quality[] {
    return this.qualities.value.filter(
      (value: Quality) => value.category === category
    );
  }

  requestAttributeOptions(): Promise<Awaited<void>[]> {
    const dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestDomainArtifacts());
    dataLoadingPromises.push(this.requestRuntimeArtifacts());
    dataLoadingPromises.push(this.requestModelArtifacts());
    dataLoadingPromises.push(this.requestExecutables());
    dataLoadingPromises.push(this.requestQualities());
    dataLoadingPromises.push(this.requestQualitySublevels());
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

    return Promise.all(dataLoadingPromises);
  }

  async requestDomainArtifacts(): Promise<void> {
    try {
      this.domainArtifacts.next(
        await lastValueFrom(this.inputService.listDomainArtifacts())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Domain artifact inputs could not be retrieved.'
      );
    }
  }

  async requestRuntimeArtifacts(): Promise<void> {
    try {
      this.runtimeArtifacts.next(
        await lastValueFrom(this.inputService.listRuntimeArtifact())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Runtime artifact inputs could not be retrieved.'
      );
    }
  }

  async requestModelArtifacts(): Promise<void> {
    try {
      this.modelArtifacts.next(
        await lastValueFrom(this.inputService.listModelArtifacts())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Model artifact inputs could not be retrieved.'
      );
    }
  }

  async requestExecutables(): Promise<void> {
    try {
      this.executables.next(
        await lastValueFrom(this.inputService.listExecutables())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Executable inputs could not be retrieved.'
      );
    }
  }

  async requestQualities(): Promise<void> {
    try {
      this.qualities.next(
        await lastValueFrom(this.processService.listQualities())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Process qualities could not be retrieved.'
      );
    }
  }

  async requestQualitySublevels(): Promise<void> {
    try {
      this.qualitySublevels.next(
        await lastValueFrom(this.processService.listQualitySublevels())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Process quality sublevels could not be retrieved.'
      );
    }
  }

  async requestDirections(): Promise<void> {
    try {
      this.directions.next(
        await lastValueFrom(this.processService.listDirections())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Process directions could not be retrieved.'
      );
    }
  }

  async requestAutomationLevels(): Promise<void> {
    try {
      this.automationLevels.next(
        await lastValueFrom(this.processService.listAutomationLevels())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Process automation levels could not be retrieved.'
      );
    }
  }

  async requestAnalysisTypes(): Promise<void> {
    try {
      this.analysisTypes.next(
        await lastValueFrom(this.processService.listAnalysisTypes())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Process analysis types could not be retrieved.'
      );
    }
  }

  async requestTechniques(): Promise<void> {
    try {
      this.techniques.next(
        await lastValueFrom(this.processService.listTechniques())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Process techniques could not be retrieved.'
      );
    }
  }

  async requestArchitectures(): Promise<void> {
    try {
      this.architectures.next(
        await lastValueFrom(this.outputService.listArchitectures())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Output architectures could not be retrieved.'
      );
    }
  }

  async requestServiceTypes(): Promise<void> {
    try {
      this.serviceTypes.next(
        await lastValueFrom(this.outputService.listServiceTypes())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Output service types could not be retrieved.'
      );
    }
  }

  async requestValidationMethods(): Promise<void> {
    try {
      this.validationMethods.next(
        await lastValueFrom(this.usabilityService.listValidationMethods())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Validation method options could not be retrieved.'
      );
    }
  }

  async requestToolSupports(): Promise<void> {
    try {
      this.toolSupports.next(
        await lastValueFrom(this.usabilityService.listToolSupports())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Tool support options could not be retrieved.'
      );
    }
  }

  async requestResultsQualities(): Promise<void> {
    try {
      this.resultsQualities.next(
        await lastValueFrom(this.usabilityService.listResultsQualities())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Results quality options could not be retrieved.'
      );
    }
  }

  async requestAccuracyPrecisions(): Promise<void> {
    try {
      this.accuracyPrecisions.next(
        await lastValueFrom(this.usabilityService.listAccuracyPrecisions())
      );
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Accuracy/Precision options could not be retrieved.'
      );
    }
  }

  createDomainArtifactWithDialog(): void {
    const data: CreateAttributeDialogData<DomainArtifactInput> = {
      title: 'Create a new domain artifact input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.domainArtifacts.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<DomainArtifactInput>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.domainArtifacts,
            (params) => this.inputService.addDomainArtifact(params)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Created domain artifact input(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some domain artifact inputs could not be created.'
              );
            });
        }
      });
  }

  deleteDomainArtifactWithDialog(): void {
    const data: DeleteAttributeDialogData<DomainArtifactInput> = {
      title: 'Delete an existing domain artifact input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.domainArtifacts.value,
      getDisplayName: (value: DomainArtifactInput) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<DomainArtifactInput>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.domainArtifacts,
            (value: DomainArtifactInput) =>
              this.inputService.deleteDomainArtifact(value)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Deleted domain artifact input(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some domain artifact inputs could not be deleted.'
              );
            });
        }
      });
  }

  createRuntimeArtifactWithDialog(): void {
    const data: CreateAttributeDialogData<RuntimeArtifactInput> = {
      title: 'Create a new runtime artifact input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.runtimeArtifacts.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<RuntimeArtifactInput>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.runtimeArtifacts,
            (params) => this.inputService.addRuntimeArtifact(params)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Created runtime artifact input(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some runtime artifact inputs could not be created.'
              );
            });
        }
      });
  }

  deleteRuntimeArtifactWithDialog(): void {
    const data: DeleteAttributeDialogData<RuntimeArtifactInput> = {
      title: 'Delete an existing runtime artifact input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.runtimeArtifacts.value,
      getDisplayName: (value: RuntimeArtifactInput) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<RuntimeArtifactInput>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.runtimeArtifacts,
            (value: RuntimeArtifactInput) =>
              this.inputService.deleteRuntimeArtifact(value)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Deleted runtime artifact input(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some runtime artifact inputs could not be deleted.'
              );
            });
        }
      });
  }

  createModelArtifactWithDialog(): void {
    const data: CreateAttributeDialogData<ModelArtifactInput> = {
      title: 'Create a new model artifact input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.modelArtifacts.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<ModelArtifactInput>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.modelArtifacts,
            (params) => this.inputService.addModelArtifact(params)
          )
            .then(() => {
              this.utilService.callSnackBar('Created model artifact input(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some model artifact inputs could not be created.'
              );
            });
        }
      });
  }

  deleteModelArtifactWithDialog(): void {
    const data: DeleteAttributeDialogData<ModelArtifactInput> = {
      title: 'Delete an existing model artifact input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.modelArtifacts.value,
      getDisplayName: (value: ModelArtifactInput) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ModelArtifactInput>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.modelArtifacts,
            (value: ModelArtifactInput) =>
              this.inputService.deleteModelArtifact(value)
          )
            .then(() => {
              this.utilService.callSnackBar('Deleted model artifact input(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some model artifact inputs could not be deleted.'
              );
            });
        }
      });
  }

  createExecutableWithDialog(): void {
    const data: CreateAttributeDialogData<ExecutableInput> = {
      title: 'Create a new executable input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.executables.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          autocompleteActive: true,
          validators: [Validators.required]
        },
        {
          title: 'language',
          variableName: 'language',
          isTextArea: false,
          autocompleteActive: true,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<ExecutableInput>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.executables,
            (params) => this.inputService.addExecutable(params)
          )
            .then(() => {
              this.utilService.callSnackBar('Created executable input(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some executable inputs could not be created.'
              );
            });
        }
      });
  }

  deleteExecutableWithDialog(): void {
    const data: DeleteAttributeDialogData<ExecutableInput> = {
      title: 'Delete an existing executable input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.executables.value,
      getDisplayName: (value: ExecutableInput) =>
        `${value.name}: ${value.language}`
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ExecutableInput>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.executables,
            (value: ExecutableInput) =>
              this.inputService.deleteExecutable(value)
          )
            .then(() => {
              this.utilService.callSnackBar('Deleted executable input(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some model artifact inputs could not be deleted.'
              );
            });
        }
      });
  }

  createQualityWithDialog(): void {
    const data: CreateAttributeDialogData<Quality> = {
      title: 'Create a new process quality option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.qualities.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'category',
          variableName: 'category',
          isTextArea: false,
          autocompleteActive: true,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<Quality>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.qualities,
            (params) => this.processService.addQuality(params)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Created process quality option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process quality options could not be created.'
              );
            });
        }
      });
  }

  deleteQualityWithDialog(): void {
    const data: DeleteAttributeDialogData<Quality> = {
      title: 'Delete an existing process quality option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.qualities.value,
      getDisplayName: (value: Quality) => `${value.category}: ${value.name}`
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<Quality>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.qualities,
            (value: Quality) => this.processService.deleteQuality(value)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Deleted process quality option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process quality options could not be deleted.'
              );
            });
        }
      });
  }

  createQualitySubWithDialog(): void {
    const data: CreateAttributeDialogData<QualitySublevel> = {
      title: 'Create a new process quality sublevel option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.qualitySublevels.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        },
        {
          title: 'qualityName',
          variableName: 'qualityName',
          isTextArea: false,
          validators: [Validators.required]
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<QualitySublevel>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.qualitySublevels,
            (params) => this.processService.addQualitySublevel(params)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Created process quality sublevel option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process quality sublevel options could not be created.'
              );
            });
        }
      });
  }

  deleteQualitySubWithDialog(): void {
    const data: DeleteAttributeDialogData<QualitySublevel> = {
      title: 'Delete an existing process quality sublevel option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.qualitySublevels.value,
      getDisplayName: (value: QualitySublevel) =>
        `${value.name} (${value.qualityName})`
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<QualitySublevel>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.qualitySublevels,
            (value: QualitySublevel) => this.processService.deleteQualitySublevel(value)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Deleted process quality sublevel option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process quality sublevel options could not be deleted.'
              );
            });
        }
      });
  }

  createDirectionWithDialog(): void {
    const data: CreateAttributeDialogData<Direction> = {
      title: 'Create a new process direction option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.directions.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<Direction>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.directions,
            (params) => this.processService.addDirection(params)
          )
            .then(() => {
              this.utilService.callSnackBar('Created process direction(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process directions could not be created.'
              );
            });
        }
      });
  }

  deleteDirectionWithDialog(): void {
    const data: DeleteAttributeDialogData<Direction> = {
      title: 'Delete an existing process direction option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.directions.value,
      getDisplayName: (value: Direction) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<Direction>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.directions,
            (value: Direction) => this.processService.deleteDirection(value)
          )
            .then(() => {
              this.utilService.callSnackBar('Deleted process direction(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process directions could not be deleted.'
              );
            });
        }
      });
  }

  createAutomationLevelWithDialog(): void {
    const data: CreateAttributeDialogData<AutomationLevel> = {
      title: 'Create a new process level of automation option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.automationLevels.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<AutomationLevel>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.automationLevels,
            (params) => this.processService.addAutomationLevel(params)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Created process automation level(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process automation levels could not be created.'
              );
            });
        }
      });
  }

  deleteAutomationLevelWithDialog(): void {
    const data: DeleteAttributeDialogData<AutomationLevel> = {
      title: 'Delete an existing process level of automation option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.automationLevels.value,
      getDisplayName: (value: AutomationLevel) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<AutomationLevel>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.automationLevels,
            (value: AutomationLevel) =>
              this.processService.deleteAutomationLevel(value)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Deleted process automation level(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process automation levels could not be deleted.'
              );
            });
        }
      });
  }

  createAnalysisTypeWithDialog(): void {
    const data: CreateAttributeDialogData<AnalysisType> = {
      title: 'Create a new process analysis type option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.analysisTypes.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<AnalysisType>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.analysisTypes,
            (params) => this.processService.addAnalysisType(params)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Created process analysis type(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process analysis types could not be created.'
              );
            });
        }
      });
  }

  deleteAnalysisTypeWithDialog(): void {
    const data: DeleteAttributeDialogData<AnalysisType> = {
      title: 'Delete an existing process analysis type option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.analysisTypes.value,
      getDisplayName: (value: AnalysisType) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<AnalysisType>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.analysisTypes,
            (value: AnalysisType) =>
              this.processService.deleteAnalysisType(value)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Deleted process analysis type(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process analysis types could not be deleted.'
              );
            });
        }
      });
  }

  createTechniqueWithDialog(): void {
    const data: CreateAttributeDialogData<Technique> = {
      title: 'Create a new process technique option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.techniques.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<Technique>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.techniques,
            (params) => this.processService.addTechnique(params)
          )
            .then(() => {
              this.utilService.callSnackBar('Created process technique(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process techniques could not be created.'
              );
            });
        }
      });
  }

  deleteTechniqueWithDialog(): void {
    const data: DeleteAttributeDialogData<Technique> = {
      title: 'Delete an existing process technique option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.techniques.value,
      getDisplayName: (value: Technique) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<Technique>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.techniques,
            (value: Technique) => this.processService.deleteTechnique(value)
          )
            .then(() => {
              this.utilService.callSnackBar('Deleted process technique(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some process techniques could not be deleted.'
              );
            });
        }
      });
  }

  createArchitectureWithDialog(): void {
    const data: CreateAttributeDialogData<Architecture> = {
      title: 'Create a new output architecture option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.architectures.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<Architecture>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.architectures,
            (params) => this.outputService.addArchitecture(params)
          )
            .then(() => {
              this.utilService.callSnackBar('Created output architecture(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some output architectures could not be created.'
              );
            });
        }
      });
  }

  deleteArchitectureWithDialog(): void {
    const data: DeleteAttributeDialogData<Architecture> = {
      title: 'Delete an existing output architecture option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.architectures.value,
      getDisplayName: (value: Architecture) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<Architecture>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.architectures,
            (value: Architecture) =>
              this.outputService.deleteArchitecture(value)
          )
            .then(() => {
              this.utilService.callSnackBar('Deleted output architecture(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some output architectures could not be deleted.'
              );
            });
        }
      });
  }

  createServiceTypeWithDialog(): void {
    const data: CreateAttributeDialogData<ServiceType> = {
      title: 'Create a new output service type option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.serviceTypes.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<ServiceType>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.serviceTypes,
            (params) => this.outputService.addServiceType(params)
          )
            .then(() => {
              this.utilService.callSnackBar('Created output service type(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some output service types could not be created.'
              );
            });
        }
      });
  }

  deleteServiceTypeWithDialog(): void {
    const data: DeleteAttributeDialogData<ServiceType> = {
      title: 'Delete an existing output service type option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.serviceTypes.value,
      getDisplayName: (value: ServiceType) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ServiceType>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.serviceTypes,
            (value: ServiceType) => this.outputService.deleteServiceType(value)
          )
            .then(() => {
              this.utilService.callSnackBar('Deleted output service type(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some output service types could not be deleted.'
              );
            });
        }
      });
  }

  createValidationMethodWithDialog(): void {
    const data: CreateAttributeDialogData<ValidationMethod> = {
      title: 'Create a new validation method option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.validationMethods.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<ValidationMethod>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.validationMethods,
            (params) => this.usabilityService.addValidationMethod(params)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Created validation method option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some validation method options could not be created.'
              );
            });
        }
      });
  }

  deleteValidationMethodWithDialog(): void {
    const data: DeleteAttributeDialogData<ValidationMethod> = {
      title: 'Delete an existing validation method option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.validationMethods.value,
      getDisplayName: (value: ValidationMethod) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ValidationMethod>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.validationMethods,
            (value: ValidationMethod) =>
              this.usabilityService.deleteValidationMethod(value)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Deleted validation method option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some validation method options could not be deleted.'
              );
            });
        }
      });
  }

  createToolSupportWithDialog(): void {
    const data: CreateAttributeDialogData<ToolSupport> = {
      title: 'Create a new tool support option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.toolSupports.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<ToolSupport>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.toolSupports,
            (params) => this.usabilityService.addToolSupport(params)
          )
            .then(() => {
              this.utilService.callSnackBar('Created tool support option(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some tool support options could not be created.'
              );
            });
        }
      });
  }

  deleteToolSupportWithDialog(): void {
    const data: DeleteAttributeDialogData<ToolSupport> = {
      title: 'Delete an existing tool support option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.toolSupports.value,
      getDisplayName: (value: ToolSupport) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ToolSupport>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.toolSupports,
            (value: ToolSupport) =>
              this.usabilityService.deleteToolSupport(value)
          )
            .then(() => {
              this.utilService.callSnackBar('Deleted tool support option(s).');
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some tool support options could not be deleted.'
              );
            });
        }
      });
  }

  createResultsQualityWithDialog(): void {
    const data: CreateAttributeDialogData<ResultsQuality> = {
      title: 'Create a new quality of results option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.resultsQualities.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<ResultsQuality>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.resultsQualities,
            (params) => this.usabilityService.addResultsQuality(params)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Created quality of results option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some quality of results options could not be created.'
              );
            });
        }
      });
  }

  deleteResultsQualityWithDialog(): void {
    const data: DeleteAttributeDialogData<ResultsQuality> = {
      title: 'Delete an existing quality of results option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.resultsQualities.value,
      getDisplayName: (value: ResultsQuality) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ResultsQuality>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.resultsQualities,
            (value: ResultsQuality) =>
              this.usabilityService.deleteResultsQuality(value)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Deleted quality of results option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some quality of results options could not be deleted.'
              );
            });
        }
      });
  }

  createAccuracyPrecisionWithDialog(): void {
    const data: CreateAttributeDialogData<AccuracyPrecision> = {
      title: 'Create a new accuracy/precision option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.accuracyPrecisions.value,
      configs: [
        {
          title: 'name',
          variableName: 'name',
          isTextArea: false,
          validators: [Validators.required]
        },
        {
          title: 'description',
          variableName: 'description',
          isTextArea: true,
          validators: null
        }
      ]
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData<AccuracyPrecision>) => {
          if (data === undefined || data.attributesToCreate === undefined)
            return;

          this.createAttributes(
            data.attributesToCreate,
            this.accuracyPrecisions,
            (params) => this.usabilityService.addAccuracyPrecision(params)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Created accuracy/precision option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some accuracy/precision options could not be created.'
              );
            });
        }
      });
  }

  deleteAccuracyPrecisionWithDialog(): void {
    const data: DeleteAttributeDialogData<AccuracyPrecision> = {
      title: 'Delete an existing accuracy/precision option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.accuracyPrecisions.value,
      getDisplayName: (value: AccuracyPrecision) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<AccuracyPrecision>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAttributes(
            data.attributesToDelete,
            this.accuracyPrecisions,
            (value: AccuracyPrecision) =>
              this.usabilityService.deleteAccuracyPrecision(value)
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Deleted accuracy/precision option(s).'
              );
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Some accuracy/precision options could not be deleted.'
              );
            });
        }
      });
  }

  createAttributes<T>(
    attributes: T[],
    attributeList: BehaviorSubject<T[]>,
    createFunction: (params?: { body?: T }) => Observable<T>
  ): Promise<void> {
    const createPromises: Promise<void>[] = [];
    for (const attribute of attributes) {
      createPromises.push(
        AttributeOptionsService.createAttribute(
          attribute,
          attributeList,
          createFunction
        )
      );
    }

    return Promise.all(createPromises).then(() => {
      attributeList.next(attributeList.value);
    });
  }

  private static async createAttribute<T>(
    attribute: T,
    attributeList: BehaviorSubject<T[]>,
    createFunction: (params?: { body?: T }) => Observable<T>
  ): Promise<void> {
    const value: T = await lastValueFrom(createFunction({ body: attribute }));
    attributeList.value.push(value);
  }

  deleteAttributes<T>(
    attributes: T[],
    attributeList: BehaviorSubject<T[]>,
    deleteFunction: (value: T) => Observable<void>
  ): Promise<void> {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of attributes) {
      deletePromises.push(
        AttributeOptionsService.deleteAttribute(
          attribute,
          attributeList,
          (value: T) => deleteFunction(value)
        )
      );
    }

    return Promise.all(deletePromises).then(() => {
      attributeList.next(attributeList.value);
    });
  }

  private static async deleteAttribute<T>(
    attribute: T,
    attributeList: BehaviorSubject<T[]>,
    deleteFunction: (value: T) => Observable<void>
  ): Promise<void> {
    await lastValueFrom(deleteFunction(attribute));
    removeValueFromArray(attributeList.value, attribute);
  }
}
