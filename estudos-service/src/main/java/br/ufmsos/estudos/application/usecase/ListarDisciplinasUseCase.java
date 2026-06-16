package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Disciplina;
import br.ufmsos.estudos.domain.repository.DisciplinaRepository;
import java.util.List;

public class ListarDisciplinasUseCase {
    private final DisciplinaRepository repository;

    public ListarDisciplinasUseCase(DisciplinaRepository repository) {
        this.repository = repository;
    }

    public List<Disciplina> executar() {
        return repository.buscarTodas();
    }
}
