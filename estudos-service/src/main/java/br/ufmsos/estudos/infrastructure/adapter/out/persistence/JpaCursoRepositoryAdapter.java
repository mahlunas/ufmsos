package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import br.ufmsos.estudos.domain.model.Curso;
import br.ufmsos.estudos.domain.repository.CursoRepository;
import org.springframework.stereotype.Component;
import java.util.Optional;
import java.util.UUID;

/**
 * Adaptador de Persistência que implementa a interface do domínio usando Spring Data JPA.
 */
@Component
public class JpaCursoRepositoryAdapter implements CursoRepository {

    private final SpringDataCursoRepository springDataRepository;

    public JpaCursoRepositoryAdapter(final SpringDataCursoRepository springDataRepository) {
        this.springDataRepository = springDataRepository;
    }

    @Override
    public Curso salvar(final Curso curso) {
        final var entity = new CursoEntity(curso.id(), curso.nome(), curso.unidadeAcademica());
        final var savedEntity = springDataRepository.save(entity);
        return new Curso(savedEntity.getId(), savedEntity.getNome(), savedEntity.getUnidadeAcademica());
    }

    @Override
    public Optional<Curso> buscarPorId(final UUID id) {
        return springDataRepository.findById(id)
                .map(entity -> new Curso(entity.getId(), entity.getNome(), entity.getUnidadeAcademica()));
    }

    @Override
    public boolean existePorNome(final String nome) {
        return springDataRepository.existsByNome(nome);
    }

    @Override
    public java.util.List<Curso> buscarTodos() {
        return springDataRepository.findAll().stream()
                .map(entity -> new Curso(entity.getId(), entity.getNome(), entity.getUnidadeAcademica()))
                .collect(java.util.stream.Collectors.toList());
    }
}
