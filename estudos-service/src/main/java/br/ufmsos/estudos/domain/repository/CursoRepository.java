package br.ufmsos.estudos.domain.repository;

import br.ufmsos.estudos.domain.model.Curso;
import java.util.Optional;
import java.util.UUID;

/**
 * Interface de Repositório para a entidade Curso.
 * Define o contrato para persistência sem depender de frameworks.
 */
public interface CursoRepository {
    Curso salvar(Curso curso);
    Optional<Curso> buscarPorId(UUID id);
    boolean existePorNome(String nome);
}
