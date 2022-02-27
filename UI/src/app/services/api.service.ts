import { Injectable } from '@angular/core';
import { RefactoringApproach } from '../../../api/repository/models/refactoring-approach';
import { RefactoringApproachService } from '../../../api/repository/services/refactoring-approach.service';
import { lastValueFrom } from 'rxjs';
import { DomainArtifactInput } from '../../../api/repository/models/domain-artifact-input';
import { ApproachInputService } from '../../../api/repository/services/approach-input.service';
import { ApproachProcessService } from '../../../api/repository/services/approach-process.service';
import { ApproachOutputService } from '../../../api/repository/services/approach-output.service';
import { ApproachUsabilityService } from '../../../api/repository/services/approach-usability.service';
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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private refactoringApproachService: RefactoringApproachService,
    private inputService: ApproachInputService,
    private processService: ApproachProcessService,
    private outputService: ApproachOutputService,
    private usabilityService: ApproachUsabilityService
  ) {}

  getRefactoringApproach(approachId: number): Promise<RefactoringApproach> {
    return lastValueFrom(
      this.refactoringApproachService.getRefactoringApproach({ id: approachId })
    );
  }

  addRefactoringApproach(
    refactoringApproach: RefactoringApproach
  ): Promise<RefactoringApproach> {
    return lastValueFrom(
      this.refactoringApproachService.addRefactoringApproach({
        body: refactoringApproach
      })
    );
  }

  listDomainArtifacts(): Promise<DomainArtifactInput[]> {
    return lastValueFrom(this.inputService.listDomainArtifacts());
  }

  listRuntimeArtifact(): Promise<RuntimeArtifactInput[]> {
    return lastValueFrom(this.inputService.listRuntimeArtifact());
  }

  listModelArtifacts(): Promise<ModelArtifactInput[]> {
    return lastValueFrom(this.inputService.listModelArtifacts());
  }

  listExecutables(): Promise<ExecutableInput[]> {
    return lastValueFrom(this.inputService.listExecutables());
  }

  listQualities(): Promise<Quality[]> {
    return lastValueFrom(this.processService.listQualities());
  }

  listDirections(): Promise<Direction[]> {
    return lastValueFrom(this.processService.listDirections());
  }

  listAutomationLevels(): Promise<AutomationLevel[]> {
    return lastValueFrom(this.processService.listAutomationLevels());
  }

  listAnalysisTypes(): Promise<AnalysisType[]> {
    return lastValueFrom(this.processService.listAnalysisTypes());
  }

  listTechniques(): Promise<Technique[]> {
    return lastValueFrom(this.processService.listTechniques());
  }

  listArchitectures(): Promise<Architecture[]> {
    return lastValueFrom(this.outputService.listArchitectures());
  }

  listServiceTypes(): Promise<ServiceType[]> {
    return lastValueFrom(this.outputService.listServiceTypes());
  }

  listResultsQualities(): Promise<ResultsQuality[]> {
    return lastValueFrom(this.usabilityService.listResultsQualities());
  }

  listToolSupports(): Promise<ToolSupport[]> {
    return lastValueFrom(this.usabilityService.listToolSupports());
  }

  listAccuracyPrecisions(): Promise<AccuracyPrecision[]> {
    return lastValueFrom(this.usabilityService.listAccuracyPrecisions());
  }

  listValidationMethods(): Promise<ValidationMethod[]> {
    return lastValueFrom(this.usabilityService.listValidationMethods());
  }
}
