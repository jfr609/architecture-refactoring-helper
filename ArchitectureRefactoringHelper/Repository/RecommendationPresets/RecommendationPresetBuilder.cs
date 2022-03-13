using System.Text.Json;
using Repository.Models;
using Repository.Models.Database;
using Repository.Models.Recommendation;

namespace Repository.RecommendationPresets;

public static class RecommendationPresetBuilder
{
    public static ApproachRecommendationRequest GetRequest(RecommendationPreset recommendationPreset)
    {
        ApproachRecommendationRequest request;
        switch (recommendationPreset)
        {
            case RecommendationPreset.NewApplication:
                request = GetPresetDataFromJson("NewApplication.json");
                break;
            case RecommendationPreset.ReBuild:
                request = GetPresetDataFromJson("ReBuild.json");
                break;
            case RecommendationPreset.ReFactor:
                request = GetPresetDataFromJson("ReFactor.json");
                break;
            default:
                request = new ApproachRecommendationRequest();
                break;
        }

        using var db = new RefactoringApproachContext();

        var domainArtifactInformation = new List<AttributeRecommendationInformation<DomainArtifactInput>>();
        var runtimeArtifactInformation = new List<AttributeRecommendationInformation<RuntimeArtifactInput>>();
        var modelArtifactInformation = new List<AttributeRecommendationInformation<ModelArtifactInput>>();
        var executableInformation = new List<AttributeRecommendationInformation<ExecutableInput>>();
        var qualityInformation = new List<AttributeRecommendationInformation<Quality>>();
        var directionInformation = new List<AttributeRecommendationInformation<Direction>>();
        var automationLevelInformation = new List<AttributeRecommendationInformation<AutomationLevel>>();
        var analysisTypeInformation = new List<AttributeRecommendationInformation<AnalysisType>>();
        var techniqueInformation = new List<AttributeRecommendationInformation<Technique>>();
        var architectureInformation = new List<AttributeRecommendationInformation<Architecture>>();
        var serviceTypeInformation = new List<AttributeRecommendationInformation<ServiceType>>();
        var resultsQualityInformation = new List<AttributeRecommendationInformation<ResultsQuality>>();
        var toolSupportInformation = new List<AttributeRecommendationInformation<ToolSupport>>();
        var accuracyPrecisionInformation = new List<AttributeRecommendationInformation<AccuracyPrecision>>();
        var validationMethodInformation = new List<AttributeRecommendationInformation<ValidationMethod>>();

        foreach (var entity in db.DomainArtifactInputs)
        {
            if (request.DomainArtifactInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            domainArtifactInformation.Add(new AttributeRecommendationInformation<DomainArtifactInput>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.RuntimeArtifactInputs)
        {
            if (request.RuntimeArtifactInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            runtimeArtifactInformation.Add(new AttributeRecommendationInformation<RuntimeArtifactInput>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.ModelArtifactInputs)
        {
            if (request.ModelArtifactInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            modelArtifactInformation.Add(new AttributeRecommendationInformation<ModelArtifactInput>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.ExecutableInputs)
        {
            if (request.ExecutableInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            executableInformation.Add(new AttributeRecommendationInformation<ExecutableInput>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.Qualities)
        {
            if (request.QualityInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            qualityInformation.Add(new AttributeRecommendationInformation<Quality>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.Directions)
        {
            if (request.DirectionInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            directionInformation.Add(new AttributeRecommendationInformation<Direction>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.AutomationLevels)
        {
            if (request.AutomationLevelInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            automationLevelInformation.Add(new AttributeRecommendationInformation<AutomationLevel>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.AnalysisTypes)
        {
            if (request.AnalysisTypeInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            analysisTypeInformation.Add(new AttributeRecommendationInformation<AnalysisType>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.Techniques)
        {
            if (request.TechniqueInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            techniqueInformation.Add(new AttributeRecommendationInformation<Technique>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.Architectures)
        {
            if (request.ArchitectureInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            architectureInformation.Add(new AttributeRecommendationInformation<Architecture>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.ServiceTypes)
        {
            if (request.ServiceTypeInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            serviceTypeInformation.Add(new AttributeRecommendationInformation<ServiceType>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.ValidationMethods)
        {
            if (request.ValidationMethodInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            validationMethodInformation.Add(new AttributeRecommendationInformation<ValidationMethod>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.ToolSupports)
        {
            if (request.ToolSupportInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            toolSupportInformation.Add(new AttributeRecommendationInformation<ToolSupport>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.ResultsQualities)
        {
            if (request.ResultsQualityInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            resultsQualityInformation.Add(new AttributeRecommendationInformation<ResultsQuality>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        foreach (var entity in db.AccuracyPrecisions)
        {
            if (request.AccuracyPrecisionInformation.Any(e => e.Attribute.KeyEquals(entity)))
                continue;

            accuracyPrecisionInformation.Add(new AttributeRecommendationInformation<AccuracyPrecision>
            {
                Attribute = entity,
                RecommendationSuitability = RecommendationSuitability.Neutral
            });
        }

        request.DomainArtifactInformation.AddRange(domainArtifactInformation);
        request.RuntimeArtifactInformation.AddRange(runtimeArtifactInformation);
        request.ModelArtifactInformation.AddRange(modelArtifactInformation);
        request.ExecutableInformation.AddRange(executableInformation);
        request.QualityInformation.AddRange(qualityInformation);
        request.DirectionInformation.AddRange(directionInformation);
        request.AutomationLevelInformation.AddRange(automationLevelInformation);
        request.AnalysisTypeInformation.AddRange(analysisTypeInformation);
        request.TechniqueInformation.AddRange(techniqueInformation);
        request.ArchitectureInformation.AddRange(architectureInformation);
        request.ServiceTypeInformation.AddRange(serviceTypeInformation);
        request.ValidationMethodInformation.AddRange(validationMethodInformation);
        request.ToolSupportInformation.AddRange(toolSupportInformation);
        request.ResultsQualityInformation.AddRange(resultsQualityInformation);
        request.AccuracyPrecisionInformation.AddRange(accuracyPrecisionInformation);

        return request;
    }

    private static ApproachRecommendationRequest GetPresetDataFromJson(string presetFile)
    {
        var filePath = Environment.CurrentDirectory + "/RecommendationPresets/PresetData/" + presetFile;

        using var reader = new StreamReader(filePath);
        var jsonString = reader.ReadToEnd();

        return JsonSerializer.Deserialize<ApproachRecommendationRequest>(jsonString) ??
               new ApproachRecommendationRequest();
    }
}