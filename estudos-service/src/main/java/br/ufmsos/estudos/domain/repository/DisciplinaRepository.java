package br.ufmsos.estudos.domain.repository;

import br.ufmsos.estudos.domain.model.Disciplina;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DisciplinaRepository {
    Disciplina salvar(Disciplina disciplina);
    Optional<Disciplina> buscarPorId(UUID id);
    List<Disciplina> buscarPorCurso(UUID cursoId);
    boolean existePorCodigo(String codigo);
    List<Disciplina> buscarTodas();
}
