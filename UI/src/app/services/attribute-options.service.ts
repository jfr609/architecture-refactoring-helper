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
import { removeValueFromArray } from '../utils/utils';

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

  async requestDomainArtifacts(): Promise<void> {
    try {
      this.domainArtifacts = await lastValueFrom(
        this.inputService.listDomainArtifacts()
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
      this.runtimeArtifacts = await lastValueFrom(
        this.inputService.listRuntimeArtifact()
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
      this.modelArtifacts = await lastValueFrom(
        this.inputService.listModelArtifacts()
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
      this.executables = await lastValueFrom(
        this.inputService.listExecutables()
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
      this.qualities = await lastValueFrom(this.processService.listQualities());
    } catch (err) {
      console.log(err);
      this.utilService.callSnackBar(
        'Error! Process qualities could not be retrieved.'
      );
    }
  }

  async requestDirections(): Promise<void> {
    try {
      this.directions = await lastValueFrom(
        this.processService.listDirections()
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
      this.automationLevels = await lastValueFrom(
        this.processService.listAutomationLevels()
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
      this.analysisTypes = await lastValueFrom(
        this.processService.listAnalysisTypes()
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
      this.techniques = await lastValueFrom(
        this.processService.listTechniques()
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
      this.architectures = await lastValueFrom(
        this.outputService.listArchitectures()
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
      this.serviceTypes = await lastValueFrom(
        this.outputService.listServiceTypes()
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
      this.validationMethods = await lastValueFrom(
        this.usabilityService.listValidationMethods()
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
      this.toolSupports = await lastValueFrom(
        this.usabilityService.listToolSupports()
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
      this.resultsQualities = await lastValueFrom(
        this.usabilityService.listResultsQualities()
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
      this.accuracyPrecisions = await lastValueFrom(
        this.usabilityService.listAccuracyPrecisions()
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

          this.createDomainArtifacts(data.attributesToCreate);
        }
      });
  }

  createDomainArtifacts(domainArtifacts: DomainArtifactInput[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of domainArtifacts) {
      createPromises.push(this.createDomainArtifact(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.domainArtifacts = [...this.domainArtifacts];
        this.utilService.callSnackBar('Created domain artifact input(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some domain artifact inputs could not be created.'
        );
      });
  }

  private async createDomainArtifact(
    domainArtifact: DomainArtifactInput
  ): Promise<void> {
    const value: DomainArtifactInput = await lastValueFrom(
      this.inputService.addDomainArtifact({ body: domainArtifact })
    );
    this.domainArtifacts.push(value);
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

          this.deleteDomainArtifacts(data.attributesToDelete);
        }
      });
  }

  deleteDomainArtifacts(domainArtifacts: DomainArtifactInput[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of domainArtifacts) {
      deletePromises.push(this.deleteDomainArtifact(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.domainArtifacts = [...this.domainArtifacts];
        this.utilService.callSnackBar('Deleted domain artifact input(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some domain artifact inputs could not be deleted.'
        );
      });
  }

  private async deleteDomainArtifact(
    domainArtifact: DomainArtifactInput
  ): Promise<void> {
    await lastValueFrom(
      this.inputService.deleteDomainArtifact({ name: domainArtifact.name })
    );
    removeValueFromArray(this.domainArtifacts, domainArtifact);
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

          this.createRuntimeArtifacts(data.attributesToCreate);
        }
      });
  }

  createRuntimeArtifacts(runtimeArtifacts: RuntimeArtifactInput[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of runtimeArtifacts) {
      createPromises.push(this.createRuntimeArtifact(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.runtimeArtifacts = [...this.runtimeArtifacts];
        this.utilService.callSnackBar('Created runtime artifact input(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some runtime artifact inputs could not be created.'
        );
      });
  }

  private async createRuntimeArtifact(
    runtimeArtifact: RuntimeArtifactInput
  ): Promise<void> {
    const value: RuntimeArtifactInput = await lastValueFrom(
      this.inputService.addRuntimeArtifact({ body: runtimeArtifact })
    );
    this.runtimeArtifacts.push(value);
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

          this.deleteRuntimeArtifacts(data.attributesToDelete);
        }
      });
  }

  deleteRuntimeArtifacts(runtimeArtifacts: RuntimeArtifactInput[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of runtimeArtifacts) {
      deletePromises.push(this.deleteRuntimeArtifact(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.runtimeArtifacts = [...this.runtimeArtifacts];
        this.utilService.callSnackBar('Deleted runtime artifact input(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some runtime artifact inputs could not be deleted.'
        );
      });
  }

  private async deleteRuntimeArtifact(
    runtimeArtifactInput: RuntimeArtifactInput
  ): Promise<void> {
    await lastValueFrom(
      this.inputService.deleteRuntimeArtifact({
        name: runtimeArtifactInput.name
      })
    );
    removeValueFromArray(this.runtimeArtifacts, runtimeArtifactInput);
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

          this.createModelArtifacts(data.attributesToCreate);
        }
      });
  }

  createModelArtifacts(modelArtifacts: ModelArtifactInput[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of modelArtifacts) {
      createPromises.push(this.createModelArtifact(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.modelArtifacts = [...this.modelArtifacts];
        this.utilService.callSnackBar('Created model artifact input(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some model artifact inputs could not be created.'
        );
      });
  }

  private async createModelArtifact(
    modelArtifact: ModelArtifactInput
  ): Promise<void> {
    const value: ModelArtifactInput = await lastValueFrom(
      this.inputService.addModelArtifact({ body: modelArtifact })
    );
    this.modelArtifacts.push(value);
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

          this.deleteModelArtifacts(data.attributesToDelete);
        }
      });
  }

  deleteModelArtifacts(modelArtifacts: ModelArtifactInput[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of modelArtifacts) {
      deletePromises.push(this.deleteModelArtifact(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.modelArtifacts = [...this.modelArtifacts];
        this.utilService.callSnackBar('Deleted model artifact input(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some model artifact inputs could not be deleted.'
        );
      });
  }

  private async deleteModelArtifact(
    modelArtifact: ModelArtifactInput
  ): Promise<void> {
    await lastValueFrom(
      this.inputService.deleteModelArtifact({ name: modelArtifact.name })
    );
    removeValueFromArray(this.modelArtifacts, modelArtifact);
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

          this.createExecutables(data.attributesToCreate);
        }
      });
  }

  createExecutables(executables: ExecutableInput[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of executables) {
      createPromises.push(this.createExecutable(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.executables = [...this.executables];
        this.utilService.callSnackBar('Created executable input(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some executable inputs could not be created.'
        );
      });
  }

  private async createExecutable(executable: ExecutableInput): Promise<void> {
    const value: ExecutableInput = await lastValueFrom(
      this.inputService.addExecutable({ body: executable })
    );
    this.executables.push(value);
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

          this.deleteExecutables(data.attributesToDelete);
        }
      });
  }

  deleteExecutables(executables: ExecutableInput[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of executables) {
      deletePromises.push(this.deleteExecutable(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.executables = [...this.executables];
        this.utilService.callSnackBar('Deleted executable input(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some executable inputs could not be deleted.'
        );
      });
  }

  private async deleteExecutable(executable: ExecutableInput): Promise<void> {
    await lastValueFrom(
      this.inputService.deleteExecutable({
        name: executable.name,
        language: executable.language
      })
    );
    removeValueFromArray(this.executables, executable);
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

          this.createQualities(data.attributesToCreate);
        }
      });
  }

  createQualities(qualities: Quality[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of qualities) {
      createPromises.push(this.createQuality(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.qualities = [...this.qualities];
        this.utilService.callSnackBar('Created process quality option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process quality options could not be created.'
        );
      });
  }

  private async createQuality(quality: Quality): Promise<void> {
    const value: Quality = await lastValueFrom(
      this.processService.addQuality({ body: quality })
    );
    this.qualities.push(value);
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

          this.deleteQualities(data.attributesToDelete);
        }
      });
  }

  deleteQualities(qualities: Quality[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of qualities) {
      deletePromises.push(this.deleteQuality(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.qualities = [...this.qualities];
        this.utilService.callSnackBar('Deleted process quality option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process quality options could not be deleted.'
        );
      });
  }

  private async deleteQuality(quality: Quality): Promise<void> {
    await lastValueFrom(
      this.processService.deleteQuality({ name: quality.name })
    );
    removeValueFromArray(this.qualities, quality);
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

          this.createDirections(data.attributesToCreate);
        }
      });
  }

  createDirections(directions: Direction[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of directions) {
      createPromises.push(this.createDirection(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.directions = [...this.directions];
        this.utilService.callSnackBar('Created process direction(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process directions could not be created.'
        );
      });
  }

  private async createDirection(direction: Direction): Promise<void> {
    const value: Direction = await lastValueFrom(
      this.processService.addDirection({ body: direction })
    );
    this.directions.push(value);
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

          this.deleteDirections(data.attributesToDelete);
        }
      });
  }

  deleteDirections(directions: Direction[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of directions) {
      deletePromises.push(this.deleteDirection(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.directions = [...this.directions];
        this.utilService.callSnackBar('Deleted process direction(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process directions could not be deleted.'
        );
      });
  }

  private async deleteDirection(direction: Direction): Promise<void> {
    await lastValueFrom(
      this.processService.deleteDirection({ name: direction.name })
    );
    removeValueFromArray(this.directions, direction);
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

          this.createAutomationLevels(data.attributesToCreate);
        }
      });
  }

  createAutomationLevels(automationLevels: AutomationLevel[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of automationLevels) {
      createPromises.push(this.createAutomationLevel(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.automationLevels = [...this.automationLevels];
        this.utilService.callSnackBar('Created process automation level(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process automation levels could not be created.'
        );
      });
  }

  private async createAutomationLevel(
    automationLevel: AutomationLevel
  ): Promise<void> {
    const value: AutomationLevel = await lastValueFrom(
      this.processService.addAutomationLevel({ body: automationLevel })
    );
    this.automationLevels.push(value);
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

          this.deleteAutomationLevels(data.attributesToDelete);
        }
      });
  }

  deleteAutomationLevels(automationLevels: AutomationLevel[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of automationLevels) {
      deletePromises.push(this.deleteAutomationLevel(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.automationLevels = [...this.automationLevels];
        this.utilService.callSnackBar('Deleted process automation level(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process automation levels could not be deleted.'
        );
      });
  }

  private async deleteAutomationLevel(
    automationLevel: AutomationLevel
  ): Promise<void> {
    await lastValueFrom(
      this.processService.deleteAutomationLevel({ name: automationLevel.name })
    );
    removeValueFromArray(this.automationLevels, automationLevel);
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

          this.createAnalysisTypes(data.attributesToCreate);
        }
      });
  }

  createAnalysisTypes(analysisTypes: AnalysisType[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of analysisTypes) {
      createPromises.push(this.createAnalysisType(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.analysisTypes = [...this.analysisTypes];
        this.utilService.callSnackBar('Created process analysis type(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process analysis types could not be created.'
        );
      });
  }

  private async createAnalysisType(analysisType: AnalysisType): Promise<void> {
    const value: AnalysisType = await lastValueFrom(
      this.processService.addAnalysisType({ body: analysisType })
    );
    this.techniques.push(value);
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

          this.deleteAnalysisTypes(data.attributesToDelete);
        }
      });
  }

  deleteAnalysisTypes(analysisTypes: AnalysisType[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of analysisTypes) {
      deletePromises.push(this.deleteAnalysisType(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.analysisTypes = [...this.analysisTypes];
        this.utilService.callSnackBar('Deleted process analysis type(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process analysis types could not be deleted.'
        );
      });
  }

  private async deleteAnalysisType(analysisType: AnalysisType): Promise<void> {
    await lastValueFrom(
      this.processService.deleteAnalysisType({ name: analysisType.name })
    );
    removeValueFromArray(this.analysisTypes, analysisType);
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

          this.createTechniques(data.attributesToCreate);
        }
      });
  }

  createTechniques(techniques: Technique[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of techniques) {
      createPromises.push(this.createTechnique(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.techniques = [...this.techniques];
        this.utilService.callSnackBar('Created process technique(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process techniques could not be created.'
        );
      });
  }

  private async createTechnique(technique: Technique): Promise<void> {
    const value: Technique = await lastValueFrom(
      this.processService.addTechnique({ body: technique })
    );
    this.techniques.push(value);
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

          this.deleteTechniques(data.attributesToDelete);
        }
      });
  }

  deleteTechniques(techniques: Technique[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of techniques) {
      deletePromises.push(this.deleteTechnique(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.techniques = [...this.techniques];
        this.utilService.callSnackBar('Deleted process technique(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some process techniques could not be deleted.'
        );
      });
  }

  private async deleteTechnique(technique: Technique): Promise<void> {
    await lastValueFrom(
      this.processService.deleteTechnique({ name: technique.name })
    );
    removeValueFromArray(this.techniques, technique);
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

          this.createArchitectures(data.attributesToCreate);
        }
      });
  }

  createArchitectures(architectures: Architecture[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of architectures) {
      createPromises.push(this.createArchitecture(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.architectures = [...this.architectures];
        this.utilService.callSnackBar('Created output architecture(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some output architectures could not be created.'
        );
      });
  }

  private async createArchitecture(architecture: Architecture): Promise<void> {
    const value: Architecture = await lastValueFrom(
      this.outputService.addArchitecture({ body: architecture })
    );
    this.architectures.push(value);
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

          this.deleteArchitectures(data.attributesToDelete);
        }
      });
  }

  deleteArchitectures(architectures: Architecture[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of architectures) {
      deletePromises.push(this.deleteArchitecture(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.architectures = [...this.architectures];
        this.utilService.callSnackBar('Deleted output architecture(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some output architectures could not be deleted.'
        );
      });
  }

  private async deleteArchitecture(architecture: Architecture): Promise<void> {
    await lastValueFrom(
      this.outputService.deleteArchitecture({ name: architecture.name })
    );
    removeValueFromArray(this.architectures, architecture);
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

          this.createServiceTypes(data.attributesToCreate);
        }
      });
  }

  createServiceTypes(serviceTypes: ServiceType[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of serviceTypes) {
      createPromises.push(this.createServiceType(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.serviceTypes = [...this.serviceTypes];
        this.utilService.callSnackBar('Created output service type(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some output service types could not be created.'
        );
      });
  }

  private async createServiceType(serviceType: ServiceType): Promise<void> {
    const value: ServiceType = await lastValueFrom(
      this.outputService.addServiceType({ body: serviceType })
    );
    this.serviceTypes.push(value);
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

          this.deleteServiceTypes(data.attributesToDelete);
        }
      });
  }

  deleteServiceTypes(serviceTypes: ServiceType[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of serviceTypes) {
      deletePromises.push(this.deleteServiceType(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.serviceTypes = [...this.serviceTypes];
        this.utilService.callSnackBar('Deleted output service type(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some output service types could not be deleted.'
        );
      });
  }

  private async deleteServiceType(serviceType: ServiceType): Promise<void> {
    await lastValueFrom(
      this.outputService.deleteServiceType({ name: serviceType.name })
    );
    removeValueFromArray(this.serviceTypes, serviceType);
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

          this.createValidationMethods(data.attributesToCreate);
        }
      });
  }

  createValidationMethods(validationMethods: ValidationMethod[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of validationMethods) {
      createPromises.push(this.createValidationMethod(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.validationMethods = [...this.validationMethods];
        this.utilService.callSnackBar('Created validation method option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some validation method options could not be created.'
        );
      });
  }

  private async createValidationMethod(
    validationMethod: ValidationMethod
  ): Promise<void> {
    const value: ValidationMethod = await lastValueFrom(
      this.usabilityService.addValidationMethod({ body: validationMethod })
    );
    this.validationMethods.push(value);
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

          this.deleteValidationMethods(data.attributesToDelete);
        }
      });
  }

  deleteValidationMethods(validationMethods: ValidationMethod[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of validationMethods) {
      deletePromises.push(this.deleteValidationMethod(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.validationMethods = [...this.validationMethods];
        this.utilService.callSnackBar('Deleted validation method option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some validation method options could not be deleted.'
        );
      });
  }

  private async deleteValidationMethod(
    validationMethod: ValidationMethod
  ): Promise<void> {
    await lastValueFrom(
      this.usabilityService.deleteValidationMethod({
        name: validationMethod.name
      })
    );
    removeValueFromArray(this.validationMethods, validationMethod);
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

          this.createToolSupports(data.attributesToCreate);
        }
      });
  }

  createToolSupports(toolSupports: ToolSupport[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of toolSupports) {
      createPromises.push(this.createToolSupport(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.toolSupports = [...this.toolSupports];
        this.utilService.callSnackBar('Created tool support option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some tool support options could not be created.'
        );
      });
  }

  private async createToolSupport(toolSupport: ToolSupport): Promise<void> {
    const value: ToolSupport = await lastValueFrom(
      this.usabilityService.addToolSupport({ body: toolSupport })
    );
    this.toolSupports.push(value);
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

          this.deleteToolSupports(data.attributesToDelete);
        }
      });
  }

  deleteToolSupports(toolSupports: ToolSupport[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of toolSupports) {
      deletePromises.push(this.deleteToolSupport(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.toolSupports = [...this.toolSupports];
        this.utilService.callSnackBar('Deleted tool support option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some tool support options could not be deleted.'
        );
      });
  }

  private async deleteToolSupport(toolSupport: ToolSupport): Promise<void> {
    await lastValueFrom(
      this.usabilityService.deleteToolSupport({ name: toolSupport.name })
    );
    removeValueFromArray(this.toolSupports, toolSupport);
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

          this.createResultsQualities(data.attributesToCreate);
        }
      });
  }

  createResultsQualities(resultsQualities: ResultsQuality[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of resultsQualities) {
      createPromises.push(this.createResultsQuality(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.resultsQualities = [...this.resultsQualities];
        this.utilService.callSnackBar('Created quality of results option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some quality of results options could not be created.'
        );
      });
  }

  private async createResultsQuality(
    resultsQuality: ResultsQuality
  ): Promise<void> {
    const value: ResultsQuality = await lastValueFrom(
      this.usabilityService.addResultsQuality({ body: resultsQuality })
    );
    this.resultsQualities.push(value);
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

          this.deleteResultsQualities(data.attributesToDelete);
        }
      });
  }

  deleteResultsQualities(resultsQualities: ResultsQuality[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of resultsQualities) {
      deletePromises.push(this.deleteResultsQuality(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.resultsQualities = [...this.resultsQualities];
        this.utilService.callSnackBar('Deleted quality of results option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some quality of results options could not be deleted.'
        );
      });
  }

  private async deleteResultsQuality(
    resultsQuality: ResultsQuality
  ): Promise<void> {
    await lastValueFrom(
      this.usabilityService.deleteResultsQuality({ name: resultsQuality.name })
    );
    removeValueFromArray(this.resultsQualities, resultsQuality);
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

          this.createAccuracyPrecisions(data.attributesToCreate);
        }
      });
  }

  createAccuracyPrecisions(accuracyPrecisions: AccuracyPrecision[]): void {
    const createPromises: Promise<void>[] = [];
    for (const attribute of accuracyPrecisions) {
      createPromises.push(this.createAccuracyPrecision(attribute));
    }
    Promise.all(createPromises)
      .then(() => {
        this.accuracyPrecisions = [...this.accuracyPrecisions];
        this.utilService.callSnackBar('Created accuracy/precision option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some accuracy/precision options could not be created.'
        );
      });
  }

  private async createAccuracyPrecision(
    accuracyPrecision: AccuracyPrecision
  ): Promise<void> {
    const value: AccuracyPrecision = await lastValueFrom(
      this.usabilityService.addAccuracyPrecision({ body: accuracyPrecision })
    );
    this.accuracyPrecisions.push(value);
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

          this.deleteAccuracyPrecisions(data.attributesToDelete);
        }
      });
  }

  deleteAccuracyPrecisions(accuracyPrecisions: AccuracyPrecision[]): void {
    const deletePromises: Promise<void>[] = [];
    for (const attribute of accuracyPrecisions) {
      deletePromises.push(this.deleteAccuracyPrecision(attribute));
    }

    Promise.all(deletePromises)
      .then(() => {
        this.accuracyPrecisions = [...this.accuracyPrecisions];
        this.utilService.callSnackBar('Deleted accuracy/precision option(s).');
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Some accuracy/precision options could not be deleted.'
        );
      });
  }

  private async deleteAccuracyPrecision(
    accuracyPrecision: AccuracyPrecision
  ): Promise<void> {
    await lastValueFrom(
      this.usabilityService.deleteAccuracyPrecision({
        name: accuracyPrecision.name
      })
    );
    removeValueFromArray(this.accuracyPrecisions, accuracyPrecision);
  }
}
