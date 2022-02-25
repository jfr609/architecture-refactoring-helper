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

  domainArtifactDataList1: ConnectedDataListElement[] = [];
  domainArtifactDataList2: ConnectedDataListElement[] = [];
  runtimeArtifactDataList1: ConnectedDataListElement[] = [];
  runtimeArtifactDataList2: ConnectedDataListElement[] = [];
  modelArtifactDataList1: ConnectedDataListElement[] = [];
  modelArtifactDataList2: ConnectedDataListElement[] = [];
  executableDataList1: ConnectedDataListElement[] = [];
  executableDataList2: ConnectedDataListElement[] = [];

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
    this.requestAllDomainArtifacts();
    this.requestAllRuntimeArtifacts();
    this.requestAllModelArtifacts();
    this.requestAllExecutables();

    if (this.isCreateView) {

    } else {

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

  requestAllDomainArtifacts(): void {
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
      this.domainArtifactDataList1 = this.utilService.createConnectedDataListFromList<DomainArtifactInput>(
        this.domainArtifacts, (e: DomainArtifactInput) => e.name);
    } else {
      // TODO
    }
  }

  requestAllRuntimeArtifacts(): void {
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
      this.runtimeArtifactDataList1 = this.utilService.createConnectedDataListFromList<RuntimeArtifactInput>(
        this.runtimeArtifacts, (e: RuntimeArtifactInput) => e.name);
    } else {
      // TODO
    }
  }

  requestAllModelArtifacts(): void {
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
      this.modelArtifactDataList1 = this.utilService.createConnectedDataListFromList<ModelArtifactInput>(
        this.modelArtifacts, (e: ModelArtifactInput) => e.name);
    } else {
      // TODO
    }
  }

  requestAllExecutables(): void {
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
      this.executableDataList1 = this.utilService.createConnectedDataListFromList<ExecutableInput>(
        this.executables, (e: ExecutableInput) => `${e.name}: ${e.language}`);
    } else {
      // TODO
    }
  }

  createRefactoringApproach(): void {
    let data: ConfirmDialogData = {
      title: "Create a new refactoring approach?",
      message: "Do you want to create a new refactoring approach based on the given data?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
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
      title: "Update the current refactoring approach?",
      message: "Do you want to update the current refactoring approach based on the current changes?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
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
        title: "Stop adding new refactoring approach?",
        message: "Do you want to stop adding a refactoring approach? All filled in data will be lost.",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }
    } else {
      data = {
        title: "Stop updating refactoring approach?",
        message: "Do you want to stop updating the refactoring approach? All unsaved changed will be lost.",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
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
