namespace Repository;

public static class Constants
{
    // Table name constants
    public const string JOIN_TABLE_PREFIX = "JoinTable.";
    public const string TABLE_NAME_APPROACH = "Approach";
    public const string TABLE_NAME_APPROACH_SOURCE = TABLE_NAME_APPROACH + ".Source";
    public const string TABLE_NAME_APPROACH_SOURCE_AUTHOR = TABLE_NAME_APPROACH_SOURCE + ".Author";
    
    public const string TABLE_NAME_APPROACH_INPUT = TABLE_NAME_APPROACH + ".Input";
    public const string TABLE_NAME_APPROACH_INPUT_DOMAINARTIFACT = TABLE_NAME_APPROACH_INPUT + ".DomainArtifact";
    public const string TABLE_NAME_APPROACH_INPUT_RUNTIMEARTIFACT = TABLE_NAME_APPROACH_INPUT + ".RuntimeArtifact";
    public const string TABLE_NAME_APPROACH_INPUT_MODELARTIFACT = TABLE_NAME_APPROACH_INPUT + ".ModelArtifact";
    public const string TABLE_NAME_APPROACH_INPUT_EXECUTABLE = TABLE_NAME_APPROACH_INPUT + ".Executable";
    
    public const string TABLE_NAME_APPROACH_PROCESS = TABLE_NAME_APPROACH + ".Process";
    public const string TABLE_NAME_APPROACH_PROCESS_QUALITY = TABLE_NAME_APPROACH_PROCESS + ".Quality";
    public const string TABLE_NAME_APPROACH_PROCESS_DIRECTION = TABLE_NAME_APPROACH_PROCESS + ".Direction";
    public const string TABLE_NAME_APPROACH_PROCESS_AUTOMATIONLEVEL = TABLE_NAME_APPROACH_PROCESS + ".AutomationLevel";
    public const string TABLE_NAME_APPROACH_PROCESS_ANALYSISTYPE = TABLE_NAME_APPROACH_PROCESS + ".AnalysisType";
    public const string TABLE_NAME_APPROACH_PROCESS_TECHNIQUE = TABLE_NAME_APPROACH_PROCESS + ".Technique";
    
    public const string TABLE_NAME_APPROACH_OUTPUT = TABLE_NAME_APPROACH + ".Output";
    public const string TABLE_NAME_APPROACH_OUTPUT_ARCHITECTURE = TABLE_NAME_APPROACH_OUTPUT + ".Architecture";
    public const string TABLE_NAME_APPROACH_OUTPUT_SERVICETYPE = TABLE_NAME_APPROACH_OUTPUT + ".ServiceType";
    
    public const string TABLE_NAME_APPROACH_USABILITY = TABLE_NAME_APPROACH + ".Usability";
    public const string TABLE_NAME_APPROACH_USABILITY_RESULTSQUALITY = TABLE_NAME_APPROACH_USABILITY + ".ResultsQuality";
    public const string TABLE_NAME_APPROACH_USABILITY_TOOLSUPPORT = TABLE_NAME_APPROACH_USABILITY + ".ToolSupport";
    public const string TABLE_NAME_APPROACH_USABILITY_ACCURACYPRECISION = TABLE_NAME_APPROACH_USABILITY + ".AccuracyPrecision";
    public const string TABLE_NAME_APPROACH_USABILITY_VALIDATIONMETHOD = TABLE_NAME_APPROACH_USABILITY + ".ValidationMethod";
    
    // Controller constants
    public const string API_VERSION = "1";
    public const string API_SUBPATH_APPROACHES = "approaches";
    public const string API_SUBPATH_INPUTS = "inputs";
    public const string API_SUBPATH_PROCESSES = "processes";
    public const string API_SUBPATH_OUTPUTS = "outputs";
    public const string API_SUBPATH_USABILITIES = "usabilities";
}