using Repository.Exceptions;
using Repository.Models;

namespace Repository.Services;

public class ApproachInputService
{
    public IEnumerable<DomainArtifactInput> ListDomainArtifactInputs()
    {
        var db = new RefactoringApproachContext();

        return db.DomainArtifactInputs
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<RuntimeArtifactInput> ListRuntimeArtifactInputs()
    {
        var db = new RefactoringApproachContext();

        return db.RuntimeArtifactInputs
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<ModelArtifactInput> ListModelArtifactInputs()
    {
        var db = new RefactoringApproachContext();

        return db.ModelArtifactInputs
            .OrderBy(e => e.Name)
            .ToList();
    }

    public IEnumerable<ExecutableInput> ListExecutableInputs()
    {
        var db = new RefactoringApproachContext();

        return db.ExecutableInputs
            .OrderBy(e => e.Name)
            .ThenBy(e => e.Language)
            .ToList();
    }

    public DomainArtifactInput GetDomainArtifactInput(string inputName)
    {
        var db = new RefactoringApproachContext();
        return GetDomainArtifactInput(inputName, ref db);
    }

    public DomainArtifactInput GetDomainArtifactInput(string inputName, ref RefactoringApproachContext db)
    {
        return db.DomainArtifactInputs.Find(inputName) ??
               throw new ElementNotFoundException($"Domain artifact with name {inputName} does not exist");
    }

    public RuntimeArtifactInput GetRuntimeArtifactInput(string inputName)
    {
        var db = new RefactoringApproachContext();
        return GetRuntimeArtifactInput(inputName, ref db);
    }

    public RuntimeArtifactInput GetRuntimeArtifactInput(string inputName, ref RefactoringApproachContext db)
    {
        return db.RuntimeArtifactInputs.Find(inputName) ??
               throw new ElementNotFoundException($"Runtime artifact with name {inputName} does not exist");
    }

    public ModelArtifactInput GetModelArtifactInput(string inputName)
    {
        var db = new RefactoringApproachContext();
        return GetModelArtifactInput(inputName, ref db);
    }

    public ModelArtifactInput GetModelArtifactInput(string inputName, ref RefactoringApproachContext db)
    {
        return db.ModelArtifactInputs.Find(inputName) ??
               throw new ElementNotFoundException($"Model artifact with name {inputName} does not exist");
    }

    public ExecutableInput GetExecutableInput(string inputName, string language)
    {
        var db = new RefactoringApproachContext();
        return GetExecutableInput(inputName, language, ref db);
    }

    public ExecutableInput GetExecutableInput(string inputName, string language, ref RefactoringApproachContext db)
    {
        return db.ExecutableInputs.Find(inputName, language) ??
               throw new ElementNotFoundException(
                   $"Executable with name {inputName} and language {language} does not exist");
    }

    public DomainArtifactInput AddDomainArtifactInput(DomainArtifactInput input)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(input, ref db);
    }

    public DomainArtifactInput AddDomainArtifactInput(DomainArtifactInput input, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(input, ref db);
    }

    public ICollection<DomainArtifactInput> AddDomainArtifactsIfNotExist(ICollection<DomainArtifactInput>? inputs,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(inputs, e => new object[] { e.Name }, ref db);
    }

    public RuntimeArtifactInput AddRuntimeArtifactInput(RuntimeArtifactInput input)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(input, ref db);
    }

    public RuntimeArtifactInput AddRuntimeArtifactInput(RuntimeArtifactInput input, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(input, ref db);
    }

    public ICollection<RuntimeArtifactInput> AddRuntimeArtifactsIfNotExist(ICollection<RuntimeArtifactInput>? inputs,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(inputs, e => new object[] { e.Name }, ref db);
    }

    public ModelArtifactInput AddModelArtifactInput(ModelArtifactInput input)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(input, ref db);
    }

    public ModelArtifactInput AddModelArtifactInput(ModelArtifactInput input, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(input, ref db);
    }

    public ICollection<ModelArtifactInput> AddModelArtifactsIfNotExist(ICollection<ModelArtifactInput>? inputs,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(inputs, e => new object[] { e.Name }, ref db);
    }

    public ExecutableInput AddExecutableInput(ExecutableInput input)
    {
        var db = new RefactoringApproachContext();
        return Utils.AddEntityAndSaveChanges(input, ref db);
    }

    public ExecutableInput AddExecutableInput(ExecutableInput input, ref RefactoringApproachContext db)
    {
        return Utils.AddEntity(input, ref db);
    }

    public ICollection<ExecutableInput> AddExecutablesIfNotExist(ICollection<ExecutableInput>? inputs,
        ref RefactoringApproachContext db)
    {
        return Utils.AddEntitiesIfNotExist(inputs, e => new object[] { e.Name, e.Language }, ref db);
    }

    public void DeleteDomainArtifactInput(string inputName)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<DomainArtifactInput>(ref db, inputName);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Domain artifact with name {inputName} could not be deleted because entity does not exist");
    }

    public void DeleteRuntimeArtifactInput(string inputName)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<RuntimeArtifactInput>(ref db, inputName);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Runtime artifact with name {inputName} could not be deleted because entity does not exist");
    }

    public void DeleteModelArtifactInput(string inputName)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<ModelArtifactInput>(ref db, inputName);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Model artifact with name {inputName} could not be deleted because entity does not exist");
    }

    public void DeleteExecutableInput(string inputName, string language)
    {
        var db = new RefactoringApproachContext();
        var deleteSuccess = Utils.DeleteEntity<ExecutableInput>(ref db, inputName, language);
        if (deleteSuccess)
            throw new ElementNotFoundException(
                $"Executable with name {inputName} and language {language} could not be deleted because entity does not exist");
    }
}