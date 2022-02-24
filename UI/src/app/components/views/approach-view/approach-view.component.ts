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

@Component({
  selector: 'app-approach-view',
  templateUrl: './approach-view.component.html',
  styleUrls: ['./approach-view.component.css']
})
export class ApproachViewComponent implements OnInit {

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  titleFormControl = new FormControl('', [Validators.required])
  yearFormControl = new FormControl('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())])
  linkFormControl = new FormControl('', [Validators.required, CustomValidators.url])
  authorsFormControl = new FormControl('', [Validators.required])

  refactoringApproach: RefactoringApproach = {};
  isCreateView: boolean = true;

  private routeSub!: Subscription;

  constructor(private refactoringApproachService: RefactoringApproachService,
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
    })
  }

  requestRefactoringApproach(approachId: number) {
    this.refactoringApproachService.getRefactoringApproach({id: approachId}).subscribe({
      next: (response: RefactoringApproach) => {
        this.refactoringApproach = response;
      },
      error: () => {
        this.utilService.callSnackBar('Error! Refactoring approach could not be retrieved.');
      }
    });
  }

  createRefactoringApproach() {
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

  updateRefactoringApproach() {
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

  cancel() {
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
