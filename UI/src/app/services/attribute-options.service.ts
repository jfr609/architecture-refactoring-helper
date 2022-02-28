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

  createDomainArtifactWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new domain artifact input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createDomainArtifact();
        }
      });
  }

  createDomainArtifact() {
    this.utilService.callSnackBar('Test create');
  }

  deleteDomainArtifactWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing domain artifact input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteDomainArtifact();
        }
      });
  }

  deleteDomainArtifact() {
    this.utilService.callSnackBar('Test delete');
  }

  createRuntimeArtifactWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new runtime artifact input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createRuntimeArtifact();
        }
      });
  }

  createRuntimeArtifact() {
    this.utilService.callSnackBar('Test create');
  }

  deleteRuntimeArtifactWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing runtime artifact input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteRuntimeArtifact();
        }
      });
  }

  deleteRuntimeArtifact() {
    this.utilService.callSnackBar('Test delete');
  }

  createModelArtifactWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new model artifact input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createModelArtifact();
        }
      });
  }

  createModelArtifact() {
    this.utilService.callSnackBar('Test create');
  }

  deleteModelArtifactWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing model artifact input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteModelArtifact();
        }
      });
  }

  deleteModelArtifact() {
    this.utilService.callSnackBar('Test delete');
  }

  createExecutableWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new executable input option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createExecutable();
        }
      });
  }

  createExecutable() {
    this.utilService.callSnackBar('Test create');
  }

  deleteExecutableWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing executable input option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteExecutable();
        }
      });
  }

  deleteExecutable() {
    this.utilService.callSnackBar('Test delete');
  }

  createQualityWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new process quality option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createQuality();
        }
      });
  }

  createQuality() {
    this.utilService.callSnackBar('Test create');
  }

  deleteQualityWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing process quality option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteQuality();
        }
      });
  }

  deleteQuality() {
    this.utilService.callSnackBar('Test delete');
  }

  createDirectionWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new process direction option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createDirection();
        }
      });
  }

  createDirection() {
    this.utilService.callSnackBar('Test create');
  }

  deleteDirectionWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing process direction option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteDirection();
        }
      });
  }

  deleteDirection() {
    this.utilService.callSnackBar('Test delete');
  }

  createAutomationLevelWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new process level of automation option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createAutomationLevel();
        }
      });
  }

  createAutomationLevel() {
    this.utilService.callSnackBar('Test create');
  }

  deleteAutomationLevelWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing process level of automation option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteAutomationLevel();
        }
      });
  }

  deleteAutomationLevel() {
    this.utilService.callSnackBar('Test delete');
  }

  createAnalysisTypeWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new process analysis type option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createAnalysisType();
        }
      });
  }

  createAnalysisType() {
    this.utilService.callSnackBar('Test create');
  }

  deleteAnalysisTypeWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing process analysis type option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteAnalysisType();
        }
      });
  }

  deleteAnalysisType() {
    this.utilService.callSnackBar('Test delete');
  }

  createTechniqueWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new process technique option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createTechnique();
        }
      });
  }

  createTechnique() {
    this.utilService.callSnackBar('Test create');
  }

  deleteTechniqueWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing process technique option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteTechnique();
        }
      });
  }

  deleteTechnique() {
    this.utilService.callSnackBar('Test delete');
  }

  createArchitectureWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new output architecture option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createArchitecture();
        }
      });
  }

  createArchitecture() {
    this.utilService.callSnackBar('Test create');
  }

  deleteArchitectureWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing output architecture option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteArchitecture();
        }
      });
  }

  deleteArchitecture() {
    this.utilService.callSnackBar('Test delete');
  }

  createServiceTypeWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new output service type option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createServiceType();
        }
      });
  }

  createServiceType() {
    this.utilService.callSnackBar('Test create');
  }

  deleteServiceTypeWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing output service type option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteServiceType();
        }
      });
  }

  deleteServiceType() {
    this.utilService.callSnackBar('Test delete');
  }

  createValidationMethodWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new validation method option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createValidationMethod();
        }
      });
  }

  createValidationMethod() {
    this.utilService.callSnackBar('Test create');
  }

  deleteValidationMethodWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing validation method option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteValidationMethod();
        }
      });
  }

  deleteValidationMethod() {
    this.utilService.callSnackBar('Test delete');
  }

  createToolSupportWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new tool support option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createToolSupport();
        }
      });
  }

  createToolSupport() {
    this.utilService.callSnackBar('Test create');
  }

  deleteToolSupportWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing tool support option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteToolSupport();
        }
      });
  }

  deleteToolSupport() {
    this.utilService.callSnackBar('Test delete');
  }

  createResultsQualityWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new quality of results option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createResultsQuality();
        }
      });
  }

  createResultsQuality() {
    this.utilService.callSnackBar('Test create');
  }

  deleteResultsQualityWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing quality of results option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteResultsQuality();
        }
      });
  }

  deleteResultsQuality() {
    this.utilService.callSnackBar('Test delete');
  }

  createAccuracyPrecisionWithDialog() {
    let data: CreateAttributeDialogData = {
      title: 'Create a new accuracy/precision option',
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(CreateAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: CreateAttributeDialogData) => {
          if (data === undefined) return;

          this.createAccuracyPrecision();
        }
      });
  }

  createAccuracyPrecision() {
    this.utilService.callSnackBar('Test create');
  }

  deleteAccuracyPrecisionWithDialog() {
    let data: DeleteAttributeDialogData = {
      title: 'Delete an existing accuracy/precision option',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(DeleteAttributeDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: DeleteAttributeDialogData) => {
          if (data === undefined) return;

          this.deleteAccuracyPrecision();
        }
      });
  }

  deleteAccuracyPrecision() {
    this.utilService.callSnackBar('Test delete');
  }
}
