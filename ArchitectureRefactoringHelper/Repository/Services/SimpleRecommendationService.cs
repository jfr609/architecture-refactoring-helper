using Repository.Models.Database;
using Repository.Models.Recommendation;
using Repository.RecommendationPresets;

namespace Repository.Services;

public class SimpleRecommendationService : IRecommendationService
{
    private readonly RefactoringApproachService _refactoringApproachService;
    private readonly ScenarioService _scenarioService;

    public SimpleRecommendationService(RefactoringApproachService refactoringApproachService, ScenarioService scenarioService)
    {
        _refactoringApproachService = refactoringApproachService;
        _scenarioService = scenarioService;
    }

    public IEnumerable<ApproachRecommendation> GetApproachRecommendations(
        ApproachRecommendationRequest recommendationRequest,
        int numberOfRecommendations)
    {
        var refactoringApproaches = _refactoringApproachService.ListRefactoringApproaches(true);

        if (numberOfRecommendations < 0)
            numberOfRecommendations = int.MaxValue;

        var recommendations = refactoringApproaches
            .Select(refactoringApproach => EvaluateApproachSuitability(refactoringApproach, recommendationRequest))
            .OrderByDescending(e => e.SuitabilityScore)
            .Take(numberOfRecommendations)
            .ToList();

        return recommendations;
    }

    public IEnumerable<ApproachRecommendation> GetApproachRecommendations(RecommendationPreset recommendationPreset,
        int numberOfRecommendations)
    {
        var recommendationRequest = RecommendationPresetBuilder.GetRequest(recommendationPreset);

        return GetApproachRecommendations(recommendationRequest, numberOfRecommendations);
    }

    private ApproachRecommendation EvaluateApproachSuitability(RefactoringApproach refactoringApproach,
        ApproachRecommendationRequest recommendationRequest)
    {
        var attributeCount = 0;
        var matchCount = 0;
        var neutralCount = 0;
        var mismatchCount = 0;
        var qualityAttributeCount = 0;
        var qualityAttributeTotalCount = recommendationRequest.QualityInformation.Where(q => q.Attribute.Category == QualityCategory.Attribute && q.RecommendationSuitability == RecommendationSuitability.Include).ToList().Count + recommendationRequest.QualitySublevelInformation.Where(q => q.RecommendationSuitability == RecommendationSuitability.Include).ToList().Count;
        var systemPropertyCount = 0;
        var systemPropertyTotalCount = recommendationRequest.QualityInformation.Where(q => q.Attribute.Category == QualityCategory.SystemProperty && q.RecommendationSuitability == RecommendationSuitability.Include).ToList().Count;
        var weightedQualityCount = 0;

        var approachRecommendation = new ApproachRecommendation
        {
            RefactoringApproachId = refactoringApproach.RefactoringApproachId,
            Identifier = refactoringApproach.Identifier,
            ApproachSource = refactoringApproach.ApproachSource,
            DomainArtifactInputEvaluations = new List<ApproachAttributeEvaluation<DomainArtifactInput>>(),
            RuntimeArtifactInputEvaluations = new List<ApproachAttributeEvaluation<RuntimeArtifactInput>>(),
            ModelArtifactInputEvaluations = new List<ApproachAttributeEvaluation<ModelArtifactInput>>(),
            ExecutableInputEvaluations = new List<ApproachAttributeEvaluation<ExecutableInput>>(),
            QualityEvaluations = new List<ApproachAttributeEvaluation<Quality>>(),
            QualitySublevelEvaluations = new List<ApproachAttributeEvaluation<QualitySublevel>>(),
            DirectionEvaluations = new List<ApproachAttributeEvaluation<Direction>>(),
            AutomationLevelEvaluations = new List<ApproachAttributeEvaluation<AutomationLevel>>(),
            AnalysisTypeEvaluations = new List<ApproachAttributeEvaluation<AnalysisType>>(),
            TechniqueEvaluations = new List<ApproachAttributeEvaluation<Technique>>(),
            ArchitectureEvaluations = new List<ApproachAttributeEvaluation<Architecture>>(),
            ServiceTypeEvaluations = new List<ApproachAttributeEvaluation<ServiceType>>(),
            ValidationMethodEvaluations = new List<ApproachAttributeEvaluation<ValidationMethod>>(),
            ToolSupportEvaluations = new List<ApproachAttributeEvaluation<ToolSupport>>(),
            ResultsQualityEvaluations = new List<ApproachAttributeEvaluation<ResultsQuality>>(),
            AccuracyPrecisionEvaluations = new List<ApproachAttributeEvaluation<AccuracyPrecision>>(),
        };

        if (refactoringApproach.DomainArtifactInputs != null)
        {
            foreach (var domainArtifactInput in refactoringApproach.DomainArtifactInputs)
            {
                var information = recommendationRequest.DomainArtifactInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(domainArtifactInput));

                var evaluation = EvaluateAttribute(domainArtifactInput, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.DomainArtifactInputEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.RuntimeArtifactInputs != null)
        {
            foreach (var runtimeArtifactInput in refactoringApproach.RuntimeArtifactInputs)
            {
                var information = recommendationRequest.RuntimeArtifactInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(runtimeArtifactInput));

                var evaluation = EvaluateAttribute(runtimeArtifactInput, information, ref attributeCount,
                    ref matchCount, ref neutralCount, ref mismatchCount);

                approachRecommendation.RuntimeArtifactInputEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ModelArtifactInputs != null)
        {
            foreach (var modelArtifactInput in refactoringApproach.ModelArtifactInputs)
            {
                var information = recommendationRequest.ModelArtifactInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(modelArtifactInput));

                var evaluation = EvaluateAttribute(modelArtifactInput, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.ModelArtifactInputEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ExecutableInputs != null)
        {
            foreach (var executableInput in refactoringApproach.ExecutableInputs)
            {
                var information = recommendationRequest.ExecutableInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(executableInput));

                var evaluation = EvaluateAttribute(executableInput, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.ExecutableInputEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachProcess.Qualities != null)
        {
            foreach (var quality in refactoringApproach.ApproachProcess.Qualities)
            {
                var information = recommendationRequest.QualityInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(quality));

                var evaluation = EvaluateAttribute(quality, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.QualityEvaluations.Add(evaluation);

                CountQualityMatches(quality.Category, information, ref qualityAttributeCount, ref systemPropertyCount, ref weightedQualityCount, quality.Name);

            }
        }

        if (refactoringApproach.ApproachProcess.QualitySublevels != null)
        {
            foreach (var qualitySublevel in refactoringApproach.ApproachProcess.QualitySublevels)
            {
                var information = recommendationRequest.QualitySublevelInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(qualitySublevel));

                var evaluation = EvaluateAttribute(qualitySublevel, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.QualitySublevelEvaluations.Add(evaluation);

                CountQualitySubMatches(information, ref qualityAttributeCount, ref weightedQualityCount, qualitySublevel.Name);
            }
        }


        if (refactoringApproach.ApproachProcess.Directions != null)
        {
            foreach (var direction in refactoringApproach.ApproachProcess.Directions)
            {
                var information = recommendationRequest.DirectionInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(direction));

                var evaluation = EvaluateAttribute(direction, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.DirectionEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachProcess.AutomationLevels != null)
        {
            foreach (var automationLevel in refactoringApproach.ApproachProcess.AutomationLevels)
            {
                var information = recommendationRequest.AutomationLevelInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(automationLevel));

                var evaluation = EvaluateAttribute(automationLevel, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.AutomationLevelEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachProcess.AnalysisTypes != null)
        {
            foreach (var analysisType in refactoringApproach.ApproachProcess.AnalysisTypes)
            {
                var information = recommendationRequest.AnalysisTypeInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(analysisType));

                var evaluation = EvaluateAttribute(analysisType, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.AnalysisTypeEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachProcess.Techniques != null)
        {
            foreach (var technique in refactoringApproach.ApproachProcess.Techniques)
            {
                var information = recommendationRequest.TechniqueInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(technique));

                var evaluation = EvaluateAttribute(technique, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.TechniqueEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachOutputs != null)
        {
            var architectures = refactoringApproach.ApproachOutputs
                .Select(output => output.Architecture)
                .ToHashSet();
            foreach (var architecture in architectures)
            {
                var information = recommendationRequest.ArchitectureInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(architecture));

                var evaluation = EvaluateAttribute(architecture, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.ArchitectureEvaluations.Add(evaluation);
            }

            var serviceTypes = refactoringApproach.ApproachOutputs
                .Select(output => output.ServiceType)
                .ToHashSet();
            foreach (var serviceType in serviceTypes)
            {
                var information = recommendationRequest.ServiceTypeInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(serviceType));

                var evaluation = EvaluateAttribute(serviceType, information, ref attributeCount, ref matchCount,
                    ref neutralCount, ref mismatchCount);

                approachRecommendation.ServiceTypeEvaluations.Add(evaluation);
            }
        }

        var validationMethodInformation = recommendationRequest.ValidationMethodInformation.FirstOrDefault(
            information => information.Attribute.KeyEquals(refactoringApproach.ApproachUsability.ValidationMethod));
        approachRecommendation.ValidationMethodEvaluations.Add(EvaluateAttribute(
            refactoringApproach.ApproachUsability.ValidationMethod, validationMethodInformation, ref attributeCount,
            ref matchCount, ref neutralCount, ref mismatchCount));

        var toolSupportInformation = recommendationRequest.ToolSupportInformation.FirstOrDefault(
            information => information.Attribute.KeyEquals(refactoringApproach.ApproachUsability.ToolSupport));
        approachRecommendation.ToolSupportEvaluations.Add(EvaluateAttribute(
            refactoringApproach.ApproachUsability.ToolSupport, toolSupportInformation, ref attributeCount,
            ref matchCount, ref neutralCount, ref mismatchCount));

        var resultsQualityInformation = recommendationRequest.ResultsQualityInformation.FirstOrDefault(
            information => information.Attribute.KeyEquals(refactoringApproach.ApproachUsability.ResultsQuality));
        approachRecommendation.ResultsQualityEvaluations.Add(EvaluateAttribute(
            refactoringApproach.ApproachUsability.ResultsQuality, resultsQualityInformation, ref attributeCount,
            ref matchCount, ref neutralCount, ref mismatchCount));

        var accuracyPrecisionInformation = recommendationRequest.AccuracyPrecisionInformation.FirstOrDefault(
            information => information.Attribute.KeyEquals(refactoringApproach.ApproachUsability.AccuracyPrecision));
        approachRecommendation.AccuracyPrecisionEvaluations.Add(EvaluateAttribute(
            refactoringApproach.ApproachUsability.AccuracyPrecision, accuracyPrecisionInformation, ref attributeCount,
            ref matchCount, ref neutralCount, ref mismatchCount));

        approachRecommendation.SuitabilityScore =
            CalculateSuitabilityScore(attributeCount, matchCount, neutralCount, mismatchCount);

        approachRecommendation.QualityScore =
            CalculateQualityScore(ref qualityAttributeCount,
        ref qualityAttributeTotalCount);

        approachRecommendation.SystemPropertiesScore =
            CaluclateSystemPropertiesScore(ref systemPropertyCount,
        ref systemPropertyTotalCount);

        approachRecommendation.WeightedScore = CalculateTotalWeightedScore(approachRecommendation, recommendationRequest, ref weightedQualityCount);

        approachRecommendation.TotalScore = CalculateTotalScore(approachRecommendation);

        return approachRecommendation;
    }

    private ApproachAttributeEvaluation<T> EvaluateAttribute<T>(T attribute,
        AttributeRecommendationInformation<T>? information, ref int attributeCount, ref int matchCount,
        ref int neutralCount, ref int mismatchCount)
    {
        var evaluation = new ApproachAttributeEvaluation<T>
        {
            ApproachAttribute = attribute
        };

        if (information != null)
        {
            switch (information.RecommendationSuitability)
            {
                case RecommendationSuitability.Include:
                    evaluation.AttributeEvaluation = AttributeEvaluation.Match;
                    matchCount++;
                    break;
                case RecommendationSuitability.Exclude:
                    evaluation.AttributeEvaluation = AttributeEvaluation.Mismatch;
                    mismatchCount++;
                    break;
                case RecommendationSuitability.Neutral:
                    evaluation.AttributeEvaluation = AttributeEvaluation.Neutral;
                    neutralCount++;
                    break;
                default:
                    evaluation.AttributeEvaluation = AttributeEvaluation.Error;
                    break;
            }
        }
        else
        {
            evaluation.AttributeEvaluation = AttributeEvaluation.Error;
        }

        attributeCount++;

        return evaluation;
    }

    private static int CalculateSuitabilityScore(int attributeCount, int matchCount, int neutralCount,
        int mismatchCount)
    {
        var hitCount = attributeCount - neutralCount;
        var notEnoughInformation = attributeCount < 1 || hitCount < Constants.NumberOfSuitabilityHits;
        if (notEnoughInformation)
        {
            return -1;
        }

        return (int)Math.Round((double)matchCount * 100 / hitCount);
    }

    private void CountQualityMatches<T>(QualityCategory category, AttributeRecommendationInformation<T>? information,
    ref int qualityAttributeCount, ref int systemPropertyCount, ref int weightedQualityCount, string qualityName)
    {
        if (information != null)
        {
            if (information.RecommendationSuitability == RecommendationSuitability.Include)
            {
                switch (category)
                {
                    case QualityCategory.Attribute:
                        qualityAttributeCount++;
                        weightedQualityCount += _scenarioService.GetWeightByQualityName(qualityName);
                        break;

                    case QualityCategory.SystemProperty:
                        systemPropertyCount++;
                        break;
                }
            }
        }
    }

    private void CountQualitySubMatches<T>(AttributeRecommendationInformation<T>? information, ref int qualityAttributeCount,
    ref int weightedQualityCount, string qualitySubName)
    {
        if (information != null)
        {
            if (information.RecommendationSuitability == RecommendationSuitability.Include)
            {
                qualityAttributeCount++;
                weightedQualityCount += _scenarioService.GetWeightByQualitySubName(qualitySubName);
            }
        }
    }

    private static QualityScore CalculateQualityScore(ref int qualityAttributeCount, ref int qualityAttributeTotalCount)
    {

        return new QualityScore
        {
            SelectedAttributes = qualityAttributeCount,
            TotalAttributes = qualityAttributeTotalCount,
            Tendency = (qualityAttributeCount > 0) ? (int)Math.Round((double)qualityAttributeCount / (double)qualityAttributeTotalCount) : 0
        };
    }

    private static SystemPropertiesScore CaluclateSystemPropertiesScore(ref int systemPropertyCount, ref int systemPropertyTotalCount)
    {
        return new SystemPropertiesScore
        {
            SelectedAttributes = systemPropertyCount,
            TotalAttributes = systemPropertyTotalCount,
            Tendency = (systemPropertyCount > 0) ? (int)Math.Round((double)systemPropertyCount / (double)systemPropertyTotalCount) : 0
        };
    }

    private int CalculateTotalScore(ApproachRecommendation approachRecommendation)
    {
        var totalScore = 0;
        if (approachRecommendation.QualityScore != null && approachRecommendation.SystemPropertiesScore != null)
        {
            totalScore = (int)Math.Round(
                ((double)approachRecommendation.QualityScore.SelectedAttributes +
                (double)approachRecommendation.SystemPropertiesScore.SelectedAttributes) /
                ((double)approachRecommendation.QualityScore.TotalAttributes + (double)approachRecommendation.SystemPropertiesScore.TotalAttributes) *
                100);

        }

        return totalScore;
    }

    private int CalculateTotalWeightedScore(ApproachRecommendation approachRecommendation, ApproachRecommendationRequest recommendationRequest, ref int weightedQualityCount)
    {
        var totalWeightedScore = 0;
        var totalWeight = 0;

        foreach (var quality in recommendationRequest.QualityInformation
        .Where(q => q.Attribute.Category == QualityCategory.Attribute && q.RecommendationSuitability == RecommendationSuitability.Include).ToList())
        {
            totalWeight += _scenarioService.GetWeightByQualityName(quality.Attribute.Name);
        }

        foreach (var qualitySub in recommendationRequest.QualitySublevelInformation
        .Where(q => q.RecommendationSuitability == RecommendationSuitability.Include).ToList())
        {
            totalWeight += _scenarioService.GetWeightByQualitySubName(qualitySub.Attribute.Name);
        }

        if (approachRecommendation.SystemPropertiesScore != null)
        {
            totalWeightedScore = (int)Math.Round(
                ((double)weightedQualityCount +
                (double)approachRecommendation.SystemPropertiesScore.SelectedAttributes) /
                ((double)totalWeight + (double)approachRecommendation.SystemPropertiesScore.TotalAttributes) * 
                100);
        }
        return totalWeightedScore;
    }
}