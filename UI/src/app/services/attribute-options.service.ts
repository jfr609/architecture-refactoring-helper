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
import { lastValueFrom } from 'rxjs';
import {
  CreateAttributeDialogComponent,
  CreateAttributeDialogData
} from '../components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import {
  DeleteAttributeDialogComponent,
  DeleteAttributeDialogData
} from '../components/dialogs/delete-attribute-dialog/delete-attribute-dialog.component';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AttributeOptionsService {
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

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    private inputService: ApproachInputService,
    private processService: ApproachProcessService,
    private outputService: ApproachOutputService,
    private usabilityService: ApproachUsabilityService,
    private utilService: UtilService
  ) {}

  requestAttributeOptions(): Promise<Awaited<void>[]> {
    const dataLoadingPromises: Promise<void>[] = [];

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

    return Promise.all(dataLoadingPromises);
  }

  requestDomainArtifacts(): Promise<void> {
    return lastValueFrom(this.inputService.listDomainArtifacts())
      .then((value: DomainArtifactInput[]) => {
        this.domainArtifacts = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Domain artifact inputs could not be retrieved.'
        );
      });
  }

  requestRuntimeArtifacts(): Promise<void> {
    return lastValueFrom(this.inputService.listRuntimeArtifact())
      .then((value: RuntimeArtifactInput[]) => {
        this.runtimeArtifacts = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Runtime artifact inputs could not be retrieved.'
        );
      });
  }

  requestModelArtifacts(): Promise<void> {
    return lastValueFrom(this.inputService.listModelArtifacts())
      .then((value: ModelArtifactInput[]) => {
        this.modelArtifacts = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Model artifact inputs could not be retrieved.'
        );
      });
  }

  requestExecutables(): Promise<void> {
    return lastValueFrom(this.inputService.listExecutables())
      .then((value: ExecutableInput[]) => {
        this.executables = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Executable inputs could not be retrieved.'
        );
      });
  }

  requestQualities(): Promise<void> {
    return lastValueFrom(this.processService.listQualities())
      .then((value: Quality[]) => {
        this.qualities = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Process qualities could not be retrieved.'
        );
      });
  }

  requestDirections(): Promise<void> {
    return lastValueFrom(this.processService.listDirections())
      .then((value: Direction[]) => {
        this.directions = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Process directions could not be retrieved.'
        );
      });
  }

  requestAutomationLevels(): Promise<void> {
    return lastValueFrom(this.processService.listAutomationLevels())
      .then((value: AutomationLevel[]) => {
        this.automationLevels = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Process automation levels could not be retrieved.'
        );
      });
  }

  requestAnalysisTypes(): Promise<void> {
    return lastValueFrom(this.processService.listAnalysisTypes())
      .then((value: AnalysisType[]) => {
        this.analysisTypes = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Process analysis types could not be retrieved.'
        );
      });
  }

  requestTechniques(): Promise<void> {
    return lastValueFrom(this.processService.listTechniques())
      .then((value: Technique[]) => {
        this.techniques = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Process techniques could not be retrieved.'
        );
      });
  }

  requestArchitectures(): Promise<void> {
    return lastValueFrom(this.outputService.listArchitectures())
      .then((value: Architecture[]) => {
        this.architectures = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Output architectures could not be retrieved.'
        );
      });
  }

  requestServiceTypes(): Promise<void> {
    return lastValueFrom(this.outputService.listServiceTypes())
      .then((value: ServiceType[]) => {
        this.serviceTypes = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Output service types could not be retrieved.'
        );
      });
  }

  requestValidationMethods(): Promise<void> {
    return lastValueFrom(this.usabilityService.listValidationMethods())
      .then((value: ValidationMethod[]) => {
        this.validationMethods = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Validation method options could not be retrieved.'
        );
      });
  }

  requestToolSupports(): Promise<void> {
    return lastValueFrom(this.usabilityService.listToolSupports())
      .then((value: ToolSupport[]) => {
        this.toolSupports = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Tool support options could not be retrieved.'
        );
      });
  }

  requestResultsQualities(): Promise<void> {
    return lastValueFrom(this.usabilityService.listResultsQualities())
      .then((value: ResultsQuality[]) => {
        this.resultsQualities = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Results quality options could not be retrieved.'
        );
      });
  }

  requestAccuracyPrecisions(): Promise<void> {
    return lastValueFrom(this.usabilityService.listAccuracyPrecisions())
      .then((value: AccuracyPrecision[]) => {
        this.accuracyPrecisions = value;
      })
      .catch((err) => {
        console.log(err);
        this.utilService.callSnackBar(
          'Error! Accuracy/Precision options could not be retrieved.'
        );
      });
  }

  createDomainArtifactWithDialog(): void {
    const data: CreateAttributeDialogData<DomainArtifactInput> = {
      title: 'Create a new domain artifact input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.domainArtifacts,
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

          const createPromises: Promise<void>[] = [];
          for (const attribute of data.attributesToCreate) {
            createPromises.push(this.createDomainArtifact(attribute));
          }
          Promise.all(createPromises);
        }
      });
  }

  createDomainArtifact(domainArtifact: DomainArtifactInput): Promise<void> {
    return lastValueFrom(
      this.inputService.addDomainArtifact({ body: domainArtifact })
    )
      .then((value: DomainArtifactInput) => {
        this.domainArtifacts.push(value);
        this.utilService.callSnackBar('Created domain artifact input.');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Domain artifact input could ne be created.'
        );
      });
  }

  deleteDomainArtifactWithDialog(): void {
    const data: DeleteAttributeDialogData<DomainArtifactInput> = {
      title: 'Delete an existing domain artifact input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.domainArtifacts,
      getDisplayName: (value: DomainArtifactInput) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<DomainArtifactInput>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          const deletePromises: Promise<void>[] = [];
          for (const attribute of data.attributesToDelete) {
            console.log('delete');
            deletePromises.push(this.deleteDomainArtifact(attribute));
          }
          Promise.all(deletePromises);
        }
      });
  }

  deleteDomainArtifact(domainArtifact: DomainArtifactInput) {
    return lastValueFrom(
      this.inputService.deleteDomainArtifact({ name: domainArtifact.name })
    )
      .then(() => {
        this.utilService.callSnackBar('Deleted domain artifact input.');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Domain artifact input could not be deleted.'
        );
      });
  }

  createRuntimeArtifactWithDialog(): void {
    const data: CreateAttributeDialogData<RuntimeArtifactInput> = {
      title: 'Create a new runtime artifact input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.runtimeArtifacts,
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

          this.createRuntimeArtifact();
        }
      });
  }

  createRuntimeArtifact() {
    this.utilService.callSnackBar('Test create');
  }

  deleteRuntimeArtifactWithDialog(): void {
    const data: DeleteAttributeDialogData<RuntimeArtifactInput> = {
      title: 'Delete an existing runtime artifact input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.runtimeArtifacts,
      getDisplayName: (value: RuntimeArtifactInput) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<RuntimeArtifactInput>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteRuntimeArtifact();
        }
      });
  }

  deleteRuntimeArtifact() {
    this.utilService.callSnackBar('Test delete');
  }

  createModelArtifactWithDialog(): void {
    const data: CreateAttributeDialogData<ModelArtifactInput> = {
      title: 'Create a new model artifact input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.modelArtifacts,
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

          this.createModelArtifact();
        }
      });
  }

  createModelArtifact() {
    this.utilService.callSnackBar('Test create');
  }

  deleteModelArtifactWithDialog(): void {
    const data: DeleteAttributeDialogData<ModelArtifactInput> = {
      title: 'Delete an existing model artifact input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.modelArtifacts,
      getDisplayName: (value: ModelArtifactInput) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ModelArtifactInput>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteModelArtifact();
        }
      });
  }

  deleteModelArtifact() {
    this.utilService.callSnackBar('Test delete');
  }

  createExecutableWithDialog(): void {
    const data: CreateAttributeDialogData<ExecutableInput> = {
      title: 'Create a new executable input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.executables,
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

          console.log(data.attributesToCreate);
          this.createExecutable();
        }
      });
  }

  createExecutable() {
    this.utilService.callSnackBar('Test create');
  }

  deleteExecutableWithDialog(): void {
    const data: DeleteAttributeDialogData<ExecutableInput> = {
      title: 'Delete an existing executable input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.executables,
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

          this.deleteExecutable();
        }
      });
  }

  deleteExecutable() {
    this.utilService.callSnackBar('Test delete');
  }

  createQualityWithDialog(): void {
    const data: CreateAttributeDialogData<Quality> = {
      title: 'Create a new process quality option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.qualities,
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

          this.createQuality();
        }
      });
  }

  createQuality() {
    this.utilService.callSnackBar('Test create');
  }

  deleteQualityWithDialog(): void {
    const data: DeleteAttributeDialogData<Quality> = {
      title: 'Delete an existing process quality option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.qualities,
      getDisplayName: (value: Quality) => `${value.category}: ${value.name}`
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<Quality>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteQuality();
        }
      });
  }

  deleteQuality() {
    this.utilService.callSnackBar('Test delete');
  }

  createDirectionWithDialog(): void {
    const data: CreateAttributeDialogData<Direction> = {
      title: 'Create a new process direction option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.directions,
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

          this.createDirection();
        }
      });
  }

  createDirection() {
    this.utilService.callSnackBar('Test create');
  }

  deleteDirectionWithDialog(): void {
    const data: DeleteAttributeDialogData<Direction> = {
      title: 'Delete an existing process direction option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.directions,
      getDisplayName: (value: Direction) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<Direction>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteDirection();
        }
      });
  }

  deleteDirection() {
    this.utilService.callSnackBar('Test delete');
  }

  createAutomationLevelWithDialog(): void {
    const data: CreateAttributeDialogData<AutomationLevel> = {
      title: 'Create a new process level of automation option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.automationLevels,
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

          this.createAutomationLevel();
        }
      });
  }

  createAutomationLevel() {
    this.utilService.callSnackBar('Test create');
  }

  deleteAutomationLevelWithDialog(): void {
    const data: DeleteAttributeDialogData<AutomationLevel> = {
      title: 'Delete an existing process level of automation option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.automationLevels,
      getDisplayName: (value: AutomationLevel) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<AutomationLevel>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAutomationLevel();
        }
      });
  }

  deleteAutomationLevel() {
    this.utilService.callSnackBar('Test delete');
  }

  createAnalysisTypeWithDialog(): void {
    const data: CreateAttributeDialogData<AnalysisType> = {
      title: 'Create a new process analysis type option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.analysisTypes,
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

          this.createAnalysisType();
        }
      });
  }

  createAnalysisType() {
    this.utilService.callSnackBar('Test create');
  }

  deleteAnalysisTypeWithDialog(): void {
    const data: DeleteAttributeDialogData<AnalysisType> = {
      title: 'Delete an existing process analysis type option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.analysisTypes,
      getDisplayName: (value: AnalysisType) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<AnalysisType>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAnalysisType();
        }
      });
  }

  deleteAnalysisType() {
    this.utilService.callSnackBar('Test delete');
  }

  createTechniqueWithDialog(): void {
    const data: CreateAttributeDialogData<Technique> = {
      title: 'Create a new process technique option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.techniques,
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

          this.createTechnique();
        }
      });
  }

  createTechnique() {
    this.utilService.callSnackBar('Test create');
  }

  deleteTechniqueWithDialog(): void {
    const data: DeleteAttributeDialogData<Technique> = {
      title: 'Delete an existing process technique option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.techniques,
      getDisplayName: (value: Technique) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<Technique>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteTechnique();
        }
      });
  }

  deleteTechnique() {
    this.utilService.callSnackBar('Test delete');
  }

  createArchitectureWithDialog(): void {
    const data: CreateAttributeDialogData<Architecture> = {
      title: 'Create a new output architecture option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.architectures,
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

          this.createArchitecture();
        }
      });
  }

  createArchitecture() {
    this.utilService.callSnackBar('Test create');
  }

  deleteArchitectureWithDialog(): void {
    const data: DeleteAttributeDialogData<Architecture> = {
      title: 'Delete an existing output architecture option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.architectures,
      getDisplayName: (value: Architecture) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<Architecture>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteArchitecture();
        }
      });
  }

  deleteArchitecture() {
    this.utilService.callSnackBar('Test delete');
  }

  createServiceTypeWithDialog(): void {
    const data: CreateAttributeDialogData<ServiceType> = {
      title: 'Create a new output service type option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.serviceTypes,
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

          this.createServiceType();
        }
      });
  }

  createServiceType() {
    this.utilService.callSnackBar('Test create');
  }

  deleteServiceTypeWithDialog(): void {
    const data: DeleteAttributeDialogData<ServiceType> = {
      title: 'Delete an existing output service type option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.serviceTypes,
      getDisplayName: (value: ServiceType) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ServiceType>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteServiceType();
        }
      });
  }

  deleteServiceType() {
    this.utilService.callSnackBar('Test delete');
  }

  createValidationMethodWithDialog(): void {
    const data: CreateAttributeDialogData<ValidationMethod> = {
      title: 'Create a new validation method option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.validationMethods,
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

          this.createValidationMethod();
        }
      });
  }

  createValidationMethod() {
    this.utilService.callSnackBar('Test create');
  }

  deleteValidationMethodWithDialog(): void {
    const data: DeleteAttributeDialogData<ValidationMethod> = {
      title: 'Delete an existing validation method option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.validationMethods,
      getDisplayName: (value: ValidationMethod) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ValidationMethod>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteValidationMethod();
        }
      });
  }

  deleteValidationMethod() {
    this.utilService.callSnackBar('Test delete');
  }

  createToolSupportWithDialog(): void {
    const data: CreateAttributeDialogData<ToolSupport> = {
      title: 'Create a new tool support option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.toolSupports,
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

          this.createToolSupport();
        }
      });
  }

  createToolSupport() {
    this.utilService.callSnackBar('Test create');
  }

  deleteToolSupportWithDialog(): void {
    const data: DeleteAttributeDialogData<ToolSupport> = {
      title: 'Delete an existing tool support option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.toolSupports,
      getDisplayName: (value: ToolSupport) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ToolSupport>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteToolSupport();
        }
      });
  }

  deleteToolSupport() {
    this.utilService.callSnackBar('Test delete');
  }

  createResultsQualityWithDialog(): void {
    const data: CreateAttributeDialogData<ResultsQuality> = {
      title: 'Create a new quality of results option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.resultsQualities,
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

          this.createResultsQuality();
        }
      });
  }

  createResultsQuality() {
    this.utilService.callSnackBar('Test create');
  }

  deleteResultsQualityWithDialog(): void {
    const data: DeleteAttributeDialogData<ResultsQuality> = {
      title: 'Delete an existing quality of results option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.resultsQualities,
      getDisplayName: (value: ResultsQuality) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<ResultsQuality>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteResultsQuality();
        }
      });
  }

  deleteResultsQuality() {
    this.utilService.callSnackBar('Test delete');
  }

  createAccuracyPrecisionWithDialog(): void {
    const data: CreateAttributeDialogData<AccuracyPrecision> = {
      title: 'Create a new accuracy/precision option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.accuracyPrecisions,
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

          this.createAccuracyPrecision();
        }
      });
  }

  createAccuracyPrecision() {
    this.utilService.callSnackBar('Test create');
  }

  deleteAccuracyPrecisionWithDialog(): void {
    const data: DeleteAttributeDialogData<AccuracyPrecision> = {
      title: 'Delete an existing accuracy/precision option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      currentAttributeList: this.accuracyPrecisions,
      getDisplayName: (value: AccuracyPrecision) => value.name
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData<AccuracyPrecision>) => {
          if (data === undefined || data.attributesToDelete === undefined)
            return;

          this.deleteAccuracyPrecision();
        }
      });
  }

  deleteAccuracyPrecision() {
    this.utilService.callSnackBar('Test delete');
  }
}