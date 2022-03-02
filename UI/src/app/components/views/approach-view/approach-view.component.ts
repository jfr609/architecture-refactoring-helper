import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RefactoringApproach } from '../../../../../api/repository/models/refactoring-approach';
import { NAV_PARAM_APPROACH_ID } from '../../../app.constants';
import { UtilService } from '../../../services/util.service';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';

@Component({
  selector: 'app-approach-form',
  templateUrl: './approach-view.component.html',
  styleUrls: ['./approach-view.component.scss']
})
export class ApproachViewComponent implements OnInit {
  refactoringApproach: RefactoringApproach = {};

  routeSub!: Subscription;
  isDataLoading = true;

  constructor(
    private refactoringApproachService: RefactoringApproachService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.isDataLoading = true;

        const approachId = parseInt(
          paramMap.get(NAV_PARAM_APPROACH_ID) as string
        );
        this.requestRefactoringApproach(approachId);
      }
    });
  }

  requestRefactoringApproach(approachId: number): void {
    this.refactoringApproachService
      .getRefactoringApproach({
        id: approachId
      })
      .subscribe({
        next: (value) => {
          this.refactoringApproach = value;
          this.temperWithApproachDescriptions();
          this.isDataLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.utilService.callSnackBar(
            'Error! Refactoring approach could not be retrieved.'
          );
        }
      });
  }

  temperWithApproachDescriptions(): void {
    if (this.refactoringApproach.domainArtifactInputs != null) {
      for (const item of this.refactoringApproach.domainArtifactInputs) {
        item.description = 'Test domain artifact description';
      }
    }

    if (this.refactoringApproach.runtimeArtifactInputs != null) {
      for (const item of this.refactoringApproach.runtimeArtifactInputs) {
        item.description = 'Test runtime artifact description';
      }
    }

    if (this.refactoringApproach.modelArtifactInputs != null) {
      for (const item of this.refactoringApproach.modelArtifactInputs) {
        item.description = 'Test model artifact description';
      }
    }

    if (this.refactoringApproach.executableInputs != null) {
      for (const item of this.refactoringApproach.executableInputs) {
        item.description = 'test executable description';
      }
    }
  }

  goToEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
