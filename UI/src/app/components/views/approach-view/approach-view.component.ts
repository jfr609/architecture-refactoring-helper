import {Component, OnInit, ViewChild} from '@angular/core';
import {RefactoringApproach} from "../../../../../api/repository/models/refactoring-approach";
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {RefactoringApproachService} from "../../../../../api/repository/services/refactoring-approach.service";
import {UtilService} from "../../../services/util.service";
import {NAV_PARAM_APPROACH_ID} from "../../../app.constants";
import {MatAccordion} from "@angular/material/expansion";
import {FormControl, Validators} from "@angular/forms";
import {CustomValidators} from "../../../utils/custom-validators";
import {ConfirmDialogComponent, ConfirmDialogData} from "../../dialogs/confirm-dialog/confirm-dialog.component";
import {DomainArtifactInput} from "../../../../../api/repository/models/domain-artifact-input";
import {RuntimeArtifactInput} from "../../../../../api/repository/models/runtime-artifact-input";
import {ModelArtifactInput} from "../../../../../api/repository/models/model-artifact-input";
import {ExecutableInput} from "../../../../../api/repository/models/executable-input";
import {ApproachInputService} from "../../../../../api/repository/services/approach-input.service";
import {ApproachProcessService} from "../../../../../api/repository/services/approach-process.service";
import {ApproachOutputService} from "../../../../../api/repository/services/approach-output.service";
import {ApproachUsabilityService} from "../../../../../api/repository/services/approach-usability.service";
import {ConnectedDataListElement} from "../../generics/connected-data-lists/connected-data-lists.component";
import {Quality} from "../../../../../api/repository/models/quality";
import {Direction} from "../../../../../api/repository/models/direction";
import {AutomationLevel} from "../../../../../api/repository/models/automation-level";
import {AnalysisType} from "../../../../../api/repository/models/analysis-type";
import {Technique} from "../../../../../api/repository/models/technique";
import {Architecture} from "../../../../../api/repository/models/architecture";
import {ServiceType} from "../../../../../api/repository/models/service-type";
import {ApproachOutput} from "../../../../../api/repository/models/approach-output";
import {removeElementFromArray} from "../../../utils/utils";

@Component({
  selector: 'app-approach-view',
  templateUrl: './approach-view.component.html',
  styleUrls: ['./approach-view.component.scss']
})
export class ApproachViewComponent implements OnInit {

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  titleFormControl = new FormControl('', [Validators.required])
  yearFormControl = new FormControl('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())])
  linkFormControl = new FormControl('', [Validators.required, CustomValidators.url])
  authorsFormControl = new FormControl('', [Validators.required])

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

  isCreateView: boolean = true;

  private routeSub!: Subscription;

  constructor(private refactoringApproachService: RefactoringApproachService,
              private inputService: ApproachInputService,
              private processService: ApproachProcessService,
              private outputService: ApproachOutputService,
              private usabilityService: ApproachUsabilityService,
              private utilService: UtilService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.isCreateView = !paramMap.has(NAV_PARAM_APPROACH_ID);
        if (this.isCreateView)
          return;

        let approachId = parseInt(<string>paramMap.get(NAV_PARAM_APPROACH_ID));
        this.requestRefactoringApproach(approachId);
      }
    });
    this.requestDomainArtifacts();
    this.requestRuntimeArtifacts();
    this.requestModelArtifacts();
    this.requestExecutables();
    this.requestQualities();
    this.requestDirections();
    this.requestAutomationLevels();
    this.requestAnalysisTypes();
    this.requestTechniques();
    this.requestArchitectures();
    this.requestServiceTypes();

    if (this.isCreateView) {

    } else {
      if (this.refactoringApproach.approachOutputs != null) {
        this.currentOutputList = this.refactoringApproach.approachOutputs;
      }
    }
  }

  requestRefactoringApproach(approachId: number): void {
    this.refactoringApproachService.getRefactoringApproach({id: approachId}).subscribe({
      next: (response: RefactoringApproach) => {
        this.refactoringApproach = response;
      },
      error: () => {
        this.utilService.callSnackBar('Error! Refactoring approach could not be retrieved.');
      }
    });
  }

  requestDomainArtifacts(): void {
    this.inputService.listDomainArtifacts().subscribe({
      next: (response: DomainArtifactInput[]) => {
        this.domainArtifacts = response;
        this.fillDomainArtifactDataLists();
      },
      error: () => {
        this.utilService.callSnackBar('Error! Input domain artifacts could not be retrieved.');
      }
    });
  }

  fillDomainArtifactDataLists(): void {
    if (this.isCreateView) {
      this.domainArtifactSourceDataList = this.utilService.createConnectedDataListFromList<DomainArtifactInput>(
        this.domainArtifacts, (e: DomainArtifactInput) => e.name);
    } else {
      // TODO
    }
  }

  requestRuntimeArtifacts(): void {
    this.inputService.listRuntimeArtifact().subscribe({
      next: (response: RuntimeArtifactInput[]) => {
        this.runtimeArtifacts = response;
        this.fillRuntimeArtifactDataLists();
      },
      error: () => {
        this.utilService.callSnackBar('Error! Input runtime artifacts could not be retrieved.');
      }
    });
  }

  fillRuntimeArtifactDataLists(): void {
    if (this.isCreateView) {
      this.runtimeArtifactSourceDataList = this.utilService.createConnectedDataListFromList<RuntimeArtifactInput>(
        this.runtimeArtifacts, (e: RuntimeArtifactInput) => e.name);
    } else {
      // TODO
    }
  }

  requestModelArtifacts(): void {
    this.inputService.listModelArtifacts().subscribe({
      next: (response: ModelArtifactInput[]) => {
        this.modelArtifacts = response;
        this.fillModelArtifactDataLists();
      },
      error: () => {
        this.utilService.callSnackBar('Error! Input model artifacts could not be retrieved.');
      }
    });
  }

  fillModelArtifactDataLists(): void {
    if (this.isCreateView) {
      this.modelArtifactSourceDataList = this.utilService.createConnectedDataListFromList<ModelArtifactInput>(
        this.modelArtifacts, (e: ModelArtifactInput) => e.name);
    } else {
      // TODO
    }
  }

  requestExecutables(): void {
    this.inputService.listExecutables().subscribe({
      next: (response: ExecutableInput[]) => {
        this.executables = response;
        this.fillExecutableDataLists();
      },
      error: () => {
        this.utilService.callSnackBar('Error! Input executables could not be retrieved.');
      }
    });
  }

  fillExecutableDataLists(): void {
    if (this.isCreateView) {
      this.executableSourceDataList = this.utilService.createConnectedDataListFromList<ExecutableInput>(
        this.executables, (e: ExecutableInput) => `${e.name}: ${e.language}`);
    } else {
      // TODO
    }
  }

  requestQualities(): void {
    this.processService.listQualities().subscribe({
      next: (response: Quality[]) => {
        this.qualities = response;
        this.fillQualityDataLists();
      },
      error: () => {
        this.utilService.callSnackBar('Error! Process qualities could not be retrieved.');
      }
    });
  }

  fillQualityDataLists(): void {
    if (this.isCreateView) {
      this.qualitySourceDataList = this.utilService.createConnectedDataListFromList<Quality>(
        this.qualities, (e: Quality) => `${e.category}: ${e.name}`);
    } else {
      // TODO
    }
  }

  requestDirections(): void {
    this.processService.listDirections().subscribe({
      next: (response: Direction[]) => {
        this.directions = response;
        this.fillDirectionDataLists();
      },
      error: () => {
        this.utilService.callSnackBar('Error! Process directions could not be retrieved.');
      }
    });
  }

  fillDirectionDataLists(): void {
    if (this.isCreateView) {
      this.directionSourceDataList = this.utilService.createConnectedDataListFromList<Direction>(
        this.directions, (e: Direction) => e.name);
    } else {
      // TODO
    }
  }

  requestAutomationLevels(): void {
    this.processService.listAutomationLevels().subscribe({
      next: (response: AutomationLevel[]) => {
        this.automationLevels = response;
        this.fillAutomationLevelDataLists();
      },
      error: () => {
        this.utilService.callSnackBar('Error! Process automation levels could not be retrieved.');
      }
    });
  }

  fillAutomationLevelDataLists(): void {
    if (this.isCreateView) {
      this.automationLevelSourceDataList = this.utilService.createConnectedDataListFromList<AutomationLevel>(
        this.automationLevels, (e: AutomationLevel) => e.name);
    } else {
      // TODO
    }
  }

  requestAnalysisTypes(): void {
    this.processService.listAnalysisTypes().subscribe({
      next: (response: AnalysisType[]) => {
        this.analysisTypes = response;
        this.fillAnalysisTypeDataLists();
      },
      error: () => {
        this.utilService.callSnackBar('Error! Process analysis types could not be retrieved.');
      }
    });
  }

  fillAnalysisTypeDataLists(): void {
    if (this.isCreateView) {
      this.analysisTypeSourceDataList = this.utilService.createConnectedDataListFromList<AnalysisType>(
        this.analysisTypes, (e: AnalysisType) => e.name);
    } else {
      // TODO
    }
  }

  requestTechniques(): void {
    this.processService.listTechniques().subscribe({
      next: (response: Technique[]) => {
        this.techniques = response;
        this.fillTechniqueDataLists();
      },
      error: () => {
        this.utilService.callSnackBar('Error! Process techniques could not be retrieved.');
      }
    });
  }

  fillTechniqueDataLists(): void {
    if (this.isCreateView) {
      this.techniqueSourceDataList = this.utilService.createConnectedDataListFromList<Technique>(
        this.techniques, (e: Technique) => e.name);
    } else {
      // TODO
    }
  }

  requestArchitectures(): void {
    this.outputService.listArchitectures().subscribe({
      next: (response: Architecture[]) => {
        this.architectures = response;
      },
      error: () => {
        this.utilService.callSnackBar('Error! Output architectures could not be retrieved.');
      }
    });
  }

  requestServiceTypes(): void {
    this.outputService.listServiceTypes().subscribe({
      next: (response: ServiceType[]) => {
        this.serviceTypes = response;
      },
      error: () => {
        this.utilService.callSnackBar('Error! Output service types could not be retrieved.');
      }
    });
  }

  addOutput(): void {
    if (this.selectedOutputArchitecture === undefined || this.selectedOutputServiceType === undefined) {
      this.utilService.callSnackBar('Error! Output must have an architecture and service type selected');
      return;
    }

    if (this.currentOutputList.find(output =>
      output.architecture?.name === this.selectedOutputArchitecture.name &&
      output.serviceType?.name === this.selectedOutputServiceType.name) !== undefined) {
      this.utilService.callSnackBar('Output already exists.');
      // TODO return
    }

    // TODO maybe dialog
    this.currentOutputList.push({
      architecture: this.selectedOutputArchitecture,
      serviceType: this.selectedOutputServiceType
    })
  }

  removeOutput(output: ApproachOutput): void {
    let data: ConfirmDialogData = {
      title: 'Remove the selected output?',
      message: `Do you want to remove the output with architecture \"${output.architecture?.name}\" and service type \"${output.serviceType?.name}\"?`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }
    this.utilService.createDialog(ConfirmDialogComponent, data).afterClosed().subscribe({
      next: data => {
        if (data == null)
          return

        removeElementFromArray<ApproachOutput>(this.currentOutputList, output,
          (a, b) =>
            a.architecture?.name === b.architecture?.name &&
            a.serviceType?.name === b.serviceType?.name);
      }
    });
  }

  createRefactoringApproach(): void {
    let data: ConfirmDialogData = {
      title: 'Create a new refactoring approach?',
      message: 'Do you want to create a new refactoring approach based on the given data?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }

    this.utilService.createDialog(ConfirmDialogComponent, data).afterClosed().subscribe({
      next: (data: ConfirmDialogData) => {
        if (data === undefined)
          return

        // TODO create
      },
    })
  }

  updateRefactoringApproach(): void {
    let data: ConfirmDialogData = {
      title: 'Update the current refactoring approach?',
      message: 'Do you want to update the current refactoring approach based on the current changes?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }

    this.utilService.createDialog(ConfirmDialogComponent, data).afterClosed().subscribe({
      next: (data: ConfirmDialogData) => {
        if (data === undefined)
          return

        // TODO update
      },
    })
  }

  cancel(): void {
    let data: ConfirmDialogData;
    if (this.isCreateView) {
      data = {
        title: 'Stop adding new refactoring approach?',
        message: 'Do you want to stop adding a refactoring approach? All filled in data will be lost.',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      }
    } else {
      data = {
        title: 'Stop updating refactoring approach?',
        message: 'Do you want to stop updating the refactoring approach? All unsaved changed will be lost.',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      }
    }

    this.utilService.createDialog(ConfirmDialogComponent, data).afterClosed().subscribe({
      next: (data: ConfirmDialogData) => {
        if (data === undefined)
          return

        this.router.navigate(['/home']);
      },
    })
  }
}
