import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { RefactoringApproach } from '../../../../../api/repository/models/refactoring-approach';
import { NAV_PARAM_APPROACH_ID } from '../../../app.constants';
import { ApiService } from '../../../services/api.service';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-approach-form',
  templateUrl: './approach-view.component.html',
  styleUrls: ['./approach-view.component.scss']
})
export class ApproachViewComponent implements OnInit {
  refactoringApproach: RefactoringApproach = {};

  routeSub!: Subscription;
  isDataLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.isDataLoading = true;

        let approachId = parseInt(
          paramMap.get(NAV_PARAM_APPROACH_ID) as string
        );

        this.apiService
          .getRefactoringApproach(approachId)
          .then((value: RefactoringApproach) => {
            this.refactoringApproach = value;
            this.isDataLoading = false;
          })
          .catch(() => {
            this.utilService.callSnackBar(
              'Error! Refactoring approach could not be retrieved.'
            );
          });
      }
    });
  }

  getTempRefactoringApproach(): string {
    return JSON.stringify(this.refactoringApproach);
  }
}
