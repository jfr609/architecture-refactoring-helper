import { Injectable } from '@angular/core';
import { DomainArtifactInput } from '../../../api/repository/models/domain-artifact-input';
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
import { ApiService } from './api.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeOptionsService {
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
  resultsQualities: ResultsQuality[] = [];
  toolSupports: ToolSupport[] = [];
  accuracyPrecisions: AccuracyPrecision[] = [];
  validationMethods: ValidationMethod[] = [];

  constructor(private apiService: ApiService) {}

  requestAttributeOptions(utilService: UtilService): Promise<Awaited<void>[]> {
    let dataLoadingPromises: Promise<void>[] = [];

    dataLoadingPromises.push(this.requestDomainArtifacts(utilService));
    dataLoadingPromises.push(this.requestRuntimeArtifacts(utilService));
    dataLoadingPromises.push(this.requestModelArtifacts(utilService));
    dataLoadingPromises.push(this.requestExecutables(utilService));
    dataLoadingPromises.push(this.requestQualities(utilService));
    dataLoadingPromises.push(this.requestDirections(utilService));
    dataLoadingPromises.push(this.requestAutomationLevels(utilService));
    dataLoadingPromises.push(this.requestAnalysisTypes(utilService));
    dataLoadingPromises.push(this.requestTechniques(utilService));
    dataLoadingPromises.push(this.requestArchitectures(utilService));
    dataLoadingPromises.push(this.requestServiceTypes(utilService));
    dataLoadingPromises.push(this.requestResultsQualities(utilService));
    dataLoadingPromises.push(this.requestToolSupports(utilService));
    dataLoadingPromises.push(this.requestAccuracyPrecisions(utilService));
    dataLoadingPromises.push(this.requestValidationMethods(utilService));

    return Promise.all(dataLoadingPromises);
  }

  requestDomainArtifacts(utilService: UtilService): Promise<void> {
    return this.apiService
      .listDomainArtifacts()
      .then((value: DomainArtifactInput[]) => {
        this.domainArtifacts = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Domain artifact inputs could not be retrieved.'
        );
      });
  }

  requestRuntimeArtifacts(utilService: UtilService): Promise<void> {
    return this.apiService
      .listRuntimeArtifact()
      .then((value: RuntimeArtifactInput[]) => {
        this.runtimeArtifacts = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Runtime artifact inputs could not be retrieved.'
        );
      });
  }

  requestModelArtifacts(utilService: UtilService): Promise<void> {
    return this.apiService
      .listModelArtifacts()
      .then((value: ModelArtifactInput[]) => {
        this.modelArtifacts = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Model artifact inputs could not be retrieved.'
        );
      });
  }

  requestExecutables(utilService: UtilService): Promise<void> {
    return this.apiService
      .listExecutables()
      .then((value: ExecutableInput[]) => {
        this.executables = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Executable inputs could not be retrieved.'
        );
      });
  }

  requestQualities(utilService: UtilService): Promise<void> {
    return this.apiService
      .listQualities()
      .then((value: Quality[]) => {
        this.qualities = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Process qualities could not be retrieved.'
        );
      });
  }

  requestDirections(utilService: UtilService): Promise<void> {
    return this.apiService
      .listDirections()
      .then((value: Direction[]) => {
        this.directions = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Process directions could not be retrieved.'
        );
      });
  }

  requestAutomationLevels(utilService: UtilService): Promise<void> {
    return this.apiService
      .listAutomationLevels()
      .then((value: AutomationLevel[]) => {
        this.automationLevels = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Process automation levels could not be retrieved.'
        );
      });
  }

  requestAnalysisTypes(utilService: UtilService): Promise<void> {
    return this.apiService
      .listAnalysisTypes()
      .then((value: AnalysisType[]) => {
        this.analysisTypes = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Process analysis types could not be retrieved.'
        );
      });
  }

  requestTechniques(utilService: UtilService): Promise<void> {
    return this.apiService
      .listTechniques()
      .then((value: Technique[]) => {
        this.techniques = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Process techniques could not be retrieved.'
        );
      });
  }

  requestArchitectures(utilService: UtilService): Promise<void> {
    return this.apiService
      .listArchitectures()
      .then((value: Architecture[]) => {
        this.architectures = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Output architectures could not be retrieved.'
        );
      });
  }

  requestServiceTypes(utilService: UtilService): Promise<void> {
    return this.apiService
      .listServiceTypes()
      .then((value: ServiceType[]) => {
        this.serviceTypes = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Output service types could not be retrieved.'
        );
      });
  }

  requestResultsQualities(utilService: UtilService): Promise<void> {
    return this.apiService
      .listResultsQualities()
      .then((value: ResultsQuality[]) => {
        this.resultsQualities = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Results quality options could not be retrieved.'
        );
      });
  }

  requestToolSupports(utilService: UtilService): Promise<void> {
    return this.apiService
      .listToolSupports()
      .then((value: ToolSupport[]) => {
        this.toolSupports = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Tool support options could not be retrieved.'
        );
      });
  }

  requestAccuracyPrecisions(utilService: UtilService): Promise<void> {
    return this.apiService
      .listAccuracyPrecisions()
      .then((value: AccuracyPrecision[]) => {
        this.accuracyPrecisions = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Accuracy/Precision options could not be retrieved.'
        );
      });
  }

  requestValidationMethods(utilService: UtilService): Promise<void> {
    return this.apiService
      .listValidationMethods()
      .then((value: ValidationMethod[]) => {
        this.validationMethods = value;
      })
      .catch(() => {
        utilService.callSnackBar(
          'Error! Validation method options could not be retrieved.'
        );
      });
  }
}
