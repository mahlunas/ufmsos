package br.ufmsos.estudos.application.usecase;

import br.ufmsos.estudos.domain.model.Curso;
import br.ufmsos.estudos.domain.repository.CursoRepository;
import java.util.List;

public class ListarCursosUseCase {
    private final CursoRepository repository;

    public ListarCursosUseCase(CursoRepository repository) {
        this.repository = repository;
    }

    public List<Curso> executar() {
        return repository.buscarTodos();
    }
}
