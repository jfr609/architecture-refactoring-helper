namespace Repository;

public static class Constants
{
    // Table name constants
    public const string JoinTablePrefix = "JoinTable.";
    public const string TableNameApproach = "Approach";
    public const string TableNameApproachSource = TableNameApproach + ".Source";

    public const string TableNameApproachInput = TableNameApproach + ".Input";
    public const string TableNameApproachInputDomainArtifact = TableNameApproachInput + ".DomainArtifact";
    public const string TableNameApproachInputRuntimeArtifact = TableNameApproachInput + ".RuntimeArtifact";
    public const string TableNameApproachInputModelArtifact = TableNameApproachInput + ".ModelArtifact";
    public const string TableNameApproachInputExecutable = TableNameApproachInput + ".Executable";

    public const string TableNameApproachProcess = TableNameApproach + ".Process";
    public const string TableNameApproachProcessQuality = TableNameApproachProcess + ".Quality";
    public const string TableNameApproachProcessDirection = TableNameApproachProcess + ".Direction";
    public const string TableNameApproachProcessAutomationLevel = TableNameApproachProcess + ".AutomationLevel";
    public const string TableNameApproachProcessAnalysisType = TableNameApproachProcess + ".AnalysisType";
    public const string TableNameApproachProcessTechnique = TableNameApproachProcess + ".Technique";

    public const string TableNameApproachOutput = TableNameApproach + ".Output";
    public const string TableNameApproachOutputArchitecture = TableNameApproachOutput + ".Architecture";
    public const string TableNameApproachOutputServiceType = TableNameApproachOutput + ".ServiceType";

    public const string TableNameApproachUsability = TableNameApproach + ".Usability";
    public const string TableNameApproachUsabilityResultsQuality = TableNameApproachUsability + ".ResultsQuality";
    public const string TableNameApproachUsabilityToolSupport = TableNameApproachUsability + ".ToolSupport";
    public const string TableNameApproachUsabilityAccuracyPrecision = TableNameApproachUsability + ".AccuracyPrecision";
    public const string TableNameApproachUsabilityValidationMethod = TableNameApproachUsability + ".ValidationMethod";

    // Controller api path constants
    public const string ApiVersion = "1";
    public const string ApiSubPathApproaches = "approaches";

    public const string ApiSubPathInputs = "inputs";
    public const string ApiSubPathDomainArtifacts = "domain-artifacts";
    public const string ApiSubPathRuntimeArtifacts = "runtime-artifacts";
    public const string ApiSubPathModelArtifacts = "model-artifacts";
    public const string ApiSubPathExecutables = "executables";

    public const string ApiSubPathProcesses = "processes";
    public const string ApiSubPathQualities = "qualities";
    public const string ApiSubPathDirections = "directions";
    public const string ApiSubPathAutomationLevels = "automation-levels";
    public const string ApiSubPathAnalysisTypes = "analysis-types";
    public const string ApiSubPathTechniques = "techniques";

    public const string ApiSubPathOutputs = "outputs";
    public const string ApiSubPathArchitectures = "architectures";
    public const string ApiSubPathServiceTypes = "service-types";

    public const string ApiSubPathUsabilities = "usabilities";
    public const string ApiSubPathResultsQualities = "result-qualities";
    public const string ApiSubPathToolSupports = "tool-supports";
    public const string ApiSubPathAccuracyPrecisions = "accuracy-precisions";
    public const string ApiSubPathValidationMethods = "validation-methods";

    // Default attribute options
    public const string AttributeDefaultHigh = "High";
    public const string AttributeDefaultMedium = "Medium";
    public const string AttributeDefaultLow = "Low";
    public const string AttributeDefaultNotAvailable = "Not available";
    public const string AttributeDefaultNoToolSupport = "No tool support";
    public const string AttributeDefaultNoValidation = "No validation";
    
    // RecommendationService
    public const int DefaultNumberOfRecommendations = 10;
}