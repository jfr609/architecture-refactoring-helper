using Repository.Models.Database;
using Repository.Models.Recommendation;

namespace Repository.Services;

public class SimpleRecommendationService : IRecommendationService
{
    private readonly RefactoringApproachService _refactoringApproachService;

    public SimpleRecommendationService(RefactoringApproachService refactoringApproachService)
    {
        _refactoringApproachService = refactoringApproachService;
    }

    public IEnumerable<ApproachRecommendation> GetApproachRecommendations(
        ApproachRecommendationRequest recommendationRequest,
        int numberOfRecommendations)
    {
        var refactoringApproaches = _refactoringApproachService.ListRefactoringApproachesWithFullDetails();

        var recommendations = refactoringApproaches
            .Select(refactoringApproach => EvaluateApproachSuitability(refactoringApproach, recommendationRequest))
            .ToList();

        return recommendations;
    }

    private ApproachRecommendation EvaluateApproachSuitability(RefactoringApproach refactoringApproach,
        ApproachRecommendationRequest recommendationRequest)
    {
        var attributeCount = 0;
        var matchCount = 0;
        var approachRecommendation = new ApproachRecommendation
        {
            ApproachSource = refactoringApproach.ApproachSource,
            DomainArtifactInputEvaluations = new List<ApproachAttributeEvaluation<DomainArtifactInput>>(),
            RuntimeArtifactInputEvaluations = new List<ApproachAttributeEvaluation<RuntimeArtifactInput>>(),
            ModelArtifactInputEvaluations = new List<ApproachAttributeEvaluation<ModelArtifactInput>>(),
            ExecutableInputEvaluations = new List<ApproachAttributeEvaluation<ExecutableInput>>(),
            QualityEvaluations = new List<ApproachAttributeEvaluation<Quality>>(),
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

                var evaluation =
                    EvaluateAttribute(domainArtifactInput, information, ref attributeCount, ref matchCount);

                approachRecommendation.DomainArtifactInputEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.RuntimeArtifactInputs != null)
        {
            foreach (var runtimeArtifactInput in refactoringApproach.RuntimeArtifactInputs)
            {
                var information = recommendationRequest.RuntimeArtifactInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(runtimeArtifactInput));

                var evaluation =
                    EvaluateAttribute(runtimeArtifactInput, information, ref attributeCount, ref matchCount);

                approachRecommendation.RuntimeArtifactInputEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ModelArtifactInputs != null)
        {
            foreach (var modelArtifactInput in refactoringApproach.ModelArtifactInputs)
            {
                var information = recommendationRequest.ModelArtifactInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(modelArtifactInput));

                var evaluation = EvaluateAttribute(modelArtifactInput, information, ref attributeCount, ref matchCount);

                approachRecommendation.ModelArtifactInputEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ExecutableInputs != null)
        {
            foreach (var executableInput in refactoringApproach.ExecutableInputs)
            {
                var information = recommendationRequest.ExecutableInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(executableInput));

                var evaluation = EvaluateAttribute(executableInput, information, ref attributeCount, ref matchCount);

                approachRecommendation.ExecutableInputEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachProcess.Qualities != null)
        {
            foreach (var quality in refactoringApproach.ApproachProcess.Qualities)
            {
                var information = recommendationRequest.QualityInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(quality));

                var evaluation = EvaluateAttribute(quality, information, ref attributeCount, ref matchCount);

                approachRecommendation.QualityEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachProcess.Directions != null)
        {
            foreach (var direction in refactoringApproach.ApproachProcess.Directions)
            {
                var information = recommendationRequest.DirectionInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(direction));

                var evaluation = EvaluateAttribute(direction, information, ref attributeCount, ref matchCount);

                approachRecommendation.DirectionEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachProcess.AutomationLevels != null)
        {
            foreach (var automationLevel in refactoringApproach.ApproachProcess.AutomationLevels)
            {
                var information = recommendationRequest.AutomationLevelInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(automationLevel));

                var evaluation = EvaluateAttribute(automationLevel, information, ref attributeCount, ref matchCount);

                approachRecommendation.AutomationLevelEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachProcess.AnalysisTypes != null)
        {
            foreach (var analysisType in refactoringApproach.ApproachProcess.AnalysisTypes)
            {
                var information = recommendationRequest.AnalysisTypeInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(analysisType));

                var evaluation = EvaluateAttribute(analysisType, information, ref attributeCount, ref matchCount);

                approachRecommendation.AnalysisTypeEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachProcess.Techniques != null)
        {
            foreach (var technique in refactoringApproach.ApproachProcess.Techniques)
            {
                var information = recommendationRequest.TechniqueInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(technique));

                var evaluation = EvaluateAttribute(technique, information, ref attributeCount, ref matchCount);

                approachRecommendation.TechniqueEvaluations.Add(evaluation);
            }
        }

        if (refactoringApproach.ApproachOutputs != null)
        {
            var architectures = refactoringApproach.ApproachOutputs.Select(output => output.Architecture).ToHashSet();
            foreach (var architecture in architectures)
            {
                var information = recommendationRequest.ArchitectureInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(architecture));

                var evaluation = EvaluateAttribute(architecture, information, ref attributeCount, ref matchCount);

                approachRecommendation.ArchitectureEvaluations.Add(evaluation);
            }

            var serviceTypes = refactoringApproach.ApproachOutputs.Select(output => output.ServiceType).ToHashSet();
            foreach (var serviceType in serviceTypes)
            {
                var information = recommendationRequest.ServiceTypeInformation.FirstOrDefault(information =>
                    information.Attribute.KeyEquals(serviceType));

                var evaluation = EvaluateAttribute(serviceType, information, ref attributeCount, ref matchCount);

                approachRecommendation.ServiceTypeEvaluations.Add(evaluation);
            }
        }

        var validationMethodInformation = recommendationRequest.ValidationMethodInformation.FirstOrDefault(
            information => information.Attribute.KeyEquals(refactoringApproach.ApproachUsability.ValidationMethod));
        approachRecommendation.ValidationMethodEvaluations.Add(EvaluateAttribute(
            refactoringApproach.ApproachUsability.ValidationMethod, validationMethodInformation, ref attributeCount,
            ref matchCount));

        var toolSupportInformation = recommendationRequest.ToolSupportInformation.FirstOrDefault(
            information => information.Attribute.KeyEquals(refactoringApproach.ApproachUsability.ToolSupport));
        approachRecommendation.ToolSupportEvaluations.Add(EvaluateAttribute(
            refactoringApproach.ApproachUsability.ToolSupport, toolSupportInformation, ref attributeCount,
            ref matchCount));

        var resultsQualityInformation = recommendationRequest.ResultsQualityInformation.FirstOrDefault(
            information => information.Attribute.KeyEquals(refactoringApproach.ApproachUsability.ResultsQuality));
        approachRecommendation.ResultsQualityEvaluations.Add(EvaluateAttribute(
            refactoringApproach.ApproachUsability.ResultsQuality, resultsQualityInformation, ref attributeCount,
            ref matchCount));

        var accuracyPrecisionInformation = recommendationRequest.AccuracyPrecisionInformation.FirstOrDefault(
            information => information.Attribute.KeyEquals(refactoringApproach.ApproachUsability.AccuracyPrecision));
        approachRecommendation.AccuracyPrecisionEvaluations.Add(EvaluateAttribute(
            refactoringApproach.ApproachUsability.AccuracyPrecision, accuracyPrecisionInformation, ref attributeCount,
            ref matchCount));

        approachRecommendation.SuitabilityScore = CalculateSuitabilityScore(attributeCount, matchCount);

        return approachRecommendation;
    }

    private ApproachAttributeEvaluation<T> EvaluateAttribute<T>(T attribute,
        AttributeRecommendationInformation<T>? information, ref int attributeCount, ref int matchCount)
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
                    break;
                case RecommendationSuitability.Neutral:
                    evaluation.AttributeEvaluation = AttributeEvaluation.Neutral;
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

    private static int CalculateSuitabilityScore(int attributeCount, int matchCount)
    {
        if (attributeCount < 1)
        {
            return -1;
        }

        return (int)Math.Round((double)matchCount * 100 / attributeCount);
    }
}