
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RefactoringApproach, ApproachRecommendation, ApproachOutput, DomainArtifactInput, RuntimeArtifactInput, ModelArtifactInput, ExecutableInput, Quality, QualitySublevel, AutomationLevel, AnalysisType, Technique, Architecture, ServiceType, ValidationMethod, ToolSupport, ResultsQuality, AccuracyPrecision, AttributeEvaluation, Direction, ArchitecturalDesign, ArchitecturalCategory } from 'api/repository/models';
import { ArchitecturalDesignService, RefactoringApproachService } from 'api/repository/services';
import { Subscription, lastValueFrom } from 'rxjs';
import { NAV_PARAM_DESIGN_ID } from 'src/app/app.constants';
import { ApproachRecommendationService } from 'src/app/services/approach-recommendation.service';
import { PermissionService } from 'src/app/services/permission.service';
import { UtilService } from 'src/app/services/util.service';
import { ConfirmDialogData, ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';



@Component({
  selector: 'app-architectural-design-view',
  templateUrl: './architectural-design-view.component.html',
  styleUrls: ['./architectural-design-view.component.css']
})
export class ArchitecturalDesignViewComponent implements OnInit {

  architecturalDesign: ArchitecturalDesign = { identifier: '' , category: ArchitecturalCategory.Pattern};
  readonly ArchitecturalCategory = ArchitecturalCategory;
  routeSub!: Subscription;
  isDataLoading = true;

  constructor(
    private architecturalDesignService: ArchitecturalDesignService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.isDataLoading = true;

        const designId = parseInt(
          paramMap.get(NAV_PARAM_DESIGN_ID) as string
        );
        this.requestarchitecturalDesign(designId);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  requestarchitecturalDesign(designId: number): void {
    this.architecturalDesignService
      .getArchitecturalDesign({
        id: designId
      })
      .subscribe({
        next: (value) => {
          this.architecturalDesign = value;
          this.isDataLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.utilService.callSnackBar(
            'Error! Architectural Design could not be retrieved.'
          );
        }
      });
  }

}

