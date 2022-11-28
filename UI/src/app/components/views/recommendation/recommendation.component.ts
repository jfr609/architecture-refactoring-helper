import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { ApproachRecommendationService } from '../../../services/approach-recommendation.service';
import { lastValueFrom } from 'rxjs';
import { ApproachRecommendation } from '../../../../../api/repository/models/approach-recommendation';
import { RefactoringApproachService } from '../../../../../api/repository/services/refactoring-approach.service';
import { UtilService } from '../../../services/util.service';
import { Router } from '@angular/router';
import { RecommendationPreset } from '../../../../../api/repository/models/recommendation-preset';
import { getCoordinates, wait } from '../../../utils/utils';

interface Coordinates {
  x: number;
  y: number;
}

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements AfterViewChecked {
  @ViewChild('ParentNode', { read: ElementRef })
  parentNode!: ElementRef;
  @ViewChild('GreenfieldNode', { read: ElementRef })
  greenfieldNode!: ElementRef;
  @ViewChild('BrownfieldNode', { read: ElementRef })
  brownfieldNode!: ElementRef;
  @ViewChild('NewApplicationNode', { read: ElementRef })
  newApplicationNode!: ElementRef;
  @ViewChild('ReBuildNode', { read: ElementRef })
  reBuildNode!: ElementRef;
  @ViewChild('ReFactorNode', { read: ElementRef })
  reFactorNode!: ElementRef;
  @ViewChild('RequirementDocumentsNode', { read: ElementRef })
  requirementDocumentsNode!: ElementRef;
  @ViewChild('RequirementModelNode', { read: ElementRef })
  requirementModelNode!: ElementRef;
  @ViewChild('DesignDocumentsNode', { read: ElementRef })
  designDocumentsNode!: ElementRef;
  @ViewChild('CodebaseNode', { read: ElementRef })
  codebaseNode!: ElementRef;
  @ViewChild('LogDataNode', { read: ElementRef })
  logDataNode!: ElementRef;

  parentCoordinates: Coordinates = { x: 0, y: 0 };

  greenFieldCoordinates: Coordinates = { x: 0, y: 0 };
  brownFieldCoordinates: Coordinates = { x: 0, y: 0 };

  newApplicationCoordinates: Coordinates = { x: 0, y: 0 };
  reBuildCoordinates: Coordinates = { x: 0, y: 0 };
  reFactorCoordinates: Coordinates = { x: 0, y: 0 };

  requirementDocumentsCoordinates: Coordinates = { x: 0, y: 0 };
  requirementModelsCoordinates: Coordinates = { x: 0, y: 0 };
  designDocumentsCoordinates: Coordinates = { x: 0, y: 0 };
  codebaseCoordinates: Coordinates = { x: 0, y: 0 };
  logDataCoordinates: Coordinates = { x: 0, y: 0 };

  constructor(
    private recommendationService: ApproachRecommendationService,
    private refactoringApproachService: RefactoringApproachService,
    private utilService: UtilService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    // behaves weird sometimes when routing to this component without using wait
    wait(0).then(() => {
      this.setDiagramCoordinates();
      this.changeDetectorRef.detectChanges();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setDiagramCoordinates();
  }

  setDiagramCoordinates(): void {
    if (
      this.parentNode == null ||
      this.greenfieldNode == null ||
      this.brownfieldNode == null ||
      this.newApplicationNode == null ||
      this.reBuildNode == null ||
      this.reFactorNode == null ||
      this.requirementDocumentsCoordinates == null ||
      this.requirementModelsCoordinates == null ||
      this.designDocumentsCoordinates == null ||
      this.codebaseCoordinates == null ||
      this.logDataCoordinates == null
    )
      return;

    this.parentCoordinates = getCoordinates(this.parentNode.nativeElement);
    this.greenFieldCoordinates = getCoordinates(
      this.greenfieldNode.nativeElement
    );
    this.brownFieldCoordinates = getCoordinates(
      this.brownfieldNode.nativeElement
    );
    this.newApplicationCoordinates = getCoordinates(
      this.newApplicationNode.nativeElement
    );
    this.reBuildCoordinates = getCoordinates(this.reBuildNode.nativeElement);
    this.reFactorCoordinates = getCoordinates(this.reFactorNode.nativeElement);

    this.requirementDocumentsCoordinates = getCoordinates(
      this.requirementDocumentsNode.nativeElement
    );
    this.requirementModelsCoordinates = getCoordinates(
      this.requirementModelNode.nativeElement
    );
    this.designDocumentsCoordinates = getCoordinates(
      this.designDocumentsNode.nativeElement
    );
    this.codebaseCoordinates = getCoordinates(this.codebaseNode.nativeElement);
    this.logDataCoordinates = getCoordinates(this.logDataNode.nativeElement);
  }

  searchNewApplicationRecommendations() {
    lastValueFrom(
      this.refactoringApproachService.recommendRefactoringApproaches({
        preset: RecommendationPreset.NewApplication
      })
    )
      .then((value: ApproachRecommendation[]) => {
        this.recommendationService.recommendations = value;
        this.recommendationService.selectedPreset =
          RecommendationPreset.NewApplication;
        this.router.navigate(['/phase/2/recommendation/result/preset']);
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended refactoring approaches failed.'
        );
      });
  }

  searchReBuildRecommendations() {
    lastValueFrom(
      this.refactoringApproachService.recommendRefactoringApproaches({
        preset: RecommendationPreset.ReBuild
      })
    )
      .then((value: ApproachRecommendation[]) => {
        this.recommendationService.recommendations = value;
        this.recommendationService.selectedPreset =
          RecommendationPreset.ReBuild;
        this.router.navigate(['/phase/2/recommendation/result/preset']);
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended refactoring approaches failed.'
        );
      });
  }

  searchReFactorRecommendations() {
    lastValueFrom(
      this.refactoringApproachService.recommendRefactoringApproaches({
        preset: RecommendationPreset.ReFactor
      })
    )
      .then((value: ApproachRecommendation[]) => {
        this.recommendationService.recommendations = value;
        this.recommendationService.selectedPreset =
          RecommendationPreset.ReFactor;
        this.router.navigate(['/phase/2/recommendation/result/preset']);
      })
      .catch((reason) => {
        console.log(reason);
        this.utilService.callSnackBar(
          'Error! Receiving recommended refactoring approaches failed.'
        );
      });
  }
}
