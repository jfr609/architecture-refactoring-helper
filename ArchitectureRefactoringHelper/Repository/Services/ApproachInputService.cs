using Repository.Exceptions;
using Repository.Models;

namespace Repository.Services;

public class ApproachInputService
{
    public IEnumerable<DomainArtifactInput> ListDomainArtifactInputs()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.DomainArtifactInputs.ToList();
        }
    }

    public IEnumerable<RuntimeArtifactInput> ListRuntimeArtifactInputs()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.RuntimeArtifactInputs.ToList();
        }
    }

    public IEnumerable<ModelArtifactInput> ListModelArtifactInputs()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ModelArtifactInputs.ToList();
        }
    }

    public IEnumerable<ExecutableInput> ListExecutableInputs()
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ExecutableInputs.ToList();
        }
    }

    public DomainArtifactInput GetDomainArtifactInput(string inputName)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.DomainArtifactInputs.Find(inputName) ??
                   throw new ElementNotFoundException($"Domain artifact with name {inputName} does not exist");
        }
    }

    public RuntimeArtifactInput GetRuntimeArtifactInput(string inputName)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.RuntimeArtifactInputs.Find(inputName) ??
                   throw new ElementNotFoundException($"Runtime artifact with name {inputName} does not exist");
        }
    }

    public ModelArtifactInput GetModelArtifactInput(string inputName)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ModelArtifactInputs.Find(inputName) ??
                   throw new ElementNotFoundException($"Model artifact with name {inputName} does not exist");
        }
    }

    public ExecutableInput GetExecutableInput(string inputName, string language)
    {
        using (var db = new RefactoringApproachContext())
        {
            return db.ExecutableInputs.Find(inputName, language) ??
                   throw new ElementNotFoundException($"Executable with name {inputName} and language {language} does not exist");
        }
    }

    public void AddDomainArtifactInput(DomainArtifactInput input)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.DomainArtifactInputs.Add(input);
            db.SaveChanges();
        }
    }

    public void AddRuntimeArtifactInput(RuntimeArtifactInput input)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.RuntimeArtifactInputs.Add(input);
            db.SaveChanges();
        }
    }

    public void AddModelArtifactInput(ModelArtifactInput input)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.ModelArtifactInputs.Add(input);
            db.SaveChanges();
        }
    }

    public void AddExecutableInput(ExecutableInput input)
    {
        using (var db = new RefactoringApproachContext())
        {
            db.ExecutableInputs.Add(input);
            db.SaveChanges();
        }
    }

    public void DeleteDomainArtifactInput(string inputName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var input = db.DomainArtifactInputs.Find(inputName);
            if (input == null)
                return;
            db.DomainArtifactInputs.Remove(input);
            db.SaveChanges();
        }
    }

    public void DeleteRuntimeArtifactInput(string inputName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var input = db.RuntimeArtifactInputs.Find(inputName);
            if (input == null)
                return;
            db.RuntimeArtifactInputs.Remove(input);
            db.SaveChanges();
        }
    }

    public void DeleteModelArtifactInput(string inputName)
    {
        using (var db = new RefactoringApproachContext())
        {
            var input = db.ModelArtifactInputs.Find(inputName);
            if (input == null)
                return;
            db.ModelArtifactInputs.Remove(input);
            db.SaveChanges();
        }
    }

    public void DeleteExecutableInput(string inputName, string executableLanguage)
    {
        using (var db = new RefactoringApproachContext())
        {
            var input = db.ExecutableInputs.Find(inputName, executableLanguage);
            if (input == null)
                return;
            db.ExecutableInputs.Remove(input);
            db.SaveChanges();
        }
    }
}