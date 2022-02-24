import {Component, OnInit} from '@angular/core';
import {RefactoringApproach} from "../../../../../api/repository/models/refactoring-approach";
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {RefactoringApproachService} from "../../../../../api/repository/services/refactoring-approach.service";
import {UtilService} from "../../../services/util.service";

@Component({
  selector: 'app-approach-view',
  templateUrl: './approach-view.component.html',
  styleUrls: ['./approach-view.component.css']
})
export class ApproachViewComponent implements OnInit {

  refactoringApproach: RefactoringApproach = {};
  isCreateView: boolean = true;

  private routeSub!: Subscription;

  constructor(private refactoringApproachService: RefactoringApproachService,
              private utilService: UtilService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.isCreateView = !paramMap.has('approachId');
        if (this.isCreateView)
          return;

        let approachId = parseInt(<string>paramMap.get('approachId'));
        this.requestRefactoringApproach(approachId);
      }
    })
  }

  requestRefactoringApproach(approachId: number){
    this.refactoringApproachService.getRefactoringApproach({id: approachId})
      .subscribe({
        next: (response: RefactoringApproach) => {
          this.refactoringApproach = response;
        },
        error: () => {
          this.utilService.callSnackBar('Error! Refactoring approach could not be retrieved.');
        }
      });
  }
}
