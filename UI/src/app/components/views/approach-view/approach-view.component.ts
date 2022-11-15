import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { RefactoringApproach } from '../../../../../api/repository/models/refactoring-approach';
import { NAV_PARAM_APPROACH_ID } from '../../../app.constants';
import { UtilService } from '../../../services/util.service';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { ApproachRecommendation } from '../../../../../api/repository/models/approach-recommendation';
import { ApproachRecommendationService } from '../../../services/approach-recommendation.service';
import { DomainArtifactInput } from '../../../../../api/repository/models/domain-artifact-input';
import { AttributeEvaluation } from '../../../../../api/repository/models/attribute-evaluation';
import { RuntimeArtifactInput } from '../../../../../api/repository/models/runtime-artifact-input';
import { ModelArtifactInput } from '../../../../../api/repository/models/model-artifact-input';
import { ExecutableInput } from '../../../../../api/repository/models/executable-input';
import { Quality } from '../../../../../api/repository/models/quality';
import { Direction } from '../../../../../api/repository/models/direction';
import { AutomationLevel } from '../../../../../api/repository/models/automation-level';
import { AnalysisType } from '../../../../../api/repository/models/analysis-type';
import { Technique } from '../../../../../api/repository/models/technique';
import { ServiceType } from '../../../../../api/repository/models/service-type';
import { Architecture } from '../../../../../api/repository/models/architecture';
import { ResultsQuality } from '../../../../../api/repository/models/results-quality';
import { AccuracyPrecision } from '../../../../../api/repository/models/accuracy-precision';
import { ToolSupport } from '../../../../../api/repository/models/tool-support';
import { ValidationMethod } from '../../../../../api/repository/models/validation-method';
import { Location } from '@angular/common';
import { PermissionService } from '../../../services/permission.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ApproachOutput } from '../../../../../api/repository/models/approach-output';
import { QualitySublevel } from 'api/repository/models';

interface OutputInfo {
  architecture: Architecture;
  serviceTypes: ServiceType[];
}

@Component({
  selector: 'app-approach-form',
  templateUrl: './approach-view.component.html',
  styleUrls: ['./approach-view.component.scss']
})
export class ApproachViewComponent implements OnInit, OnDestroy {
  refactoringApproach: RefactoringApproach = { identifier: '' };
  outputMap: Map<string, OutputInfo> = new Map<string, OutputInfo>();
  selectedRecommendation: ApproachRecommendation | undefined;

  routeSub!: Subscription;
  isDataLoading = true;

  constructor(
    public permissionService: PermissionService,
    private refactoringApproachService: RefactoringApproachService,
    public recommendationService: ApproachRecommendationService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
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

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  requestRefactoringApproach(approachId: number): void {
    this.refactoringApproachService
      .getRefactoringApproach({
        id: approachId
      })
      .subscribe({
        next: (value) => {
          this.refactoringApproach = value;
          this.mapOutputs();
          this.getRecommendationData();
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

  mapOutputs(): void {
    this.refactoringApproach.approachOutputs?.forEach(
      (output: ApproachOutput) => {
        let outputInfo: OutputInfo | undefined = this.outputMap.get(
          output.architecture.name
        );
        if (outputInfo === undefined) {
          outputInfo = {
            architecture: output.architecture,
            serviceTypes: []
          };
        }
        outputInfo.serviceTypes.push(output.serviceType);

        this.outputMap.set(output.architecture.name, outputInfo);
      }
    );
  }

  getRecommendationData(): void {
    const queryParamMap: ParamMap = this.route.snapshot.queryParamMap;
    if (
      queryParamMap.has('from') &&
      queryParamMap.get('from') === 'recommendation'
    ) {
      this.selectedRecommendation =
        this.recommendationService.recommendations.find(
          (value: ApproachRecommendation) =>
            value.refactoringApproachId ===
            this.refactoringApproach.refactoringApproachId
        );
    }
  }

  goToEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  goBack(): void {
    this.location.back();
  }

  getSuitabilityColor(): string {
    if (this.selectedRecommendation == null) {
      return '';
    }

    if (this.selectedRecommendation.suitabilityScore < 50) {
      return 'suitability-low';
    } else if (this.selectedRecommendation.suitabilityScore < 75) {
      return 'suitability-medium';
    } else {
      return 'suitability-high';
    }
  }

  getDomainArtifactColor(attribute: DomainArtifactInput): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.domainArtifactInputEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getRuntimeArtifactColor(attribute: RuntimeArtifactInput): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.runtimeArtifactInputEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getModelArtifactColor(attribute: ModelArtifactInput): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.modelArtifactInputEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getExecutableColor(attribute: ExecutableInput): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.executableInputEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getQualityColor(attribute: Quality): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation = this.selectedRecommendation.qualityEvaluations?.find(
      (value) => value.approachAttribute.name === attribute.name
    );

    return this.getAttributeColor(evaluation);
  }

  getQualitySubColor(attribute: QualitySublevel): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation = this.selectedRecommendation.qualitySubEvaluations?.find(
      (value) => value.approachAttribute.name === attribute.name
    );

    return this.getAttributeColor(evaluation);
  }


  getDirectionColor(attribute: Direction): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation = this.selectedRecommendation.directionEvaluations?.find(
      (value) => value.approachAttribute.name === attribute.name
    );

    return this.getAttributeColor(evaluation);
  }

  getAutomationLevelColor(attribute: AutomationLevel): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.automationLevelEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getAnalysisTypeColor(attribute: AnalysisType): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.analysisTypeEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getTechniqueColor(attribute: Technique): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation = this.selectedRecommendation.techniqueEvaluations?.find(
      (value) => value.approachAttribute.name === attribute.name
    );

    return this.getAttributeColor(evaluation);
  }

  getArchitectureColor(attribute: Architecture): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.architectureEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getServiceTypeColor(attribute: ServiceType): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation = this.selectedRecommendation.serviceTypeEvaluations?.find(
      (value) => value.approachAttribute.name === attribute.name
    );

    return this.getAttributeColor(evaluation);
  }

  getValidationMethodColor(attribute: ValidationMethod): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.validationMethodEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getToolSupportColor(attribute: ToolSupport): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation = this.selectedRecommendation.toolSupportEvaluations?.find(
      (value) => value.approachAttribute.name === attribute.name
    );

    return this.getAttributeColor(evaluation);
  }

  getResultsQualityColor(attribute: ResultsQuality): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.resultsQualityEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getAccuracyPrecisionColor(attribute: AccuracyPrecision): string {
    if (this.selectedRecommendation == null) return '';

    const evaluation =
      this.selectedRecommendation.accuracyPrecisionEvaluations?.find(
        (value) => value.approachAttribute.name === attribute.name
      );

    return this.getAttributeColor(evaluation);
  }

  getAttributeColor(evaluation: any): string {
    switch (evaluation.attributeEvaluation) {
      case AttributeEvaluation.Match:
        return 'match-item';
      case AttributeEvaluation.Mismatch:
        return 'mismatch-item';
      default:
        return '';
    }
  }

  deleteRefactoringApproach() {
    const data: ConfirmDialogData = {
      title: 'Delete Refactoring Approach?',
      message: `Do you really want to delete the refactoring approach "${this.refactoringApproach.approachSource?.title}"?`,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, data)
      .afterClosed()
      .subscribe({
        next: (data: ConfirmDialogData) => {
          if (
            data == null ||
            this.refactoringApproach.refactoringApproachId == null
          )
            return;

          lastValueFrom(
            this.refactoringApproachService.deleteRefactoringApproach({
              id: this.refactoringApproach.refactoringApproachId
            })
          )
            .then(() => {
              this.utilService.callSnackBar(
                'Refactoring approach deleted successfully'
              );
              this.router.navigate(['home']);
            })
            .catch((reason) => {
              console.log(reason);
              this.utilService.callSnackBar(
                'Error! Refactoring approach could not be deleted'
              );
            });
        }
      });
  }
}
