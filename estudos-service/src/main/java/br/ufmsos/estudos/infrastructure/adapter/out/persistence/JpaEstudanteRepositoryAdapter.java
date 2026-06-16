package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import br.ufmsos.estudos.domain.model.Estudante;
import br.ufmsos.estudos.domain.repository.EstudanteRepository;
import org.springframework.stereotype.Component;
import java.util.Optional;
import java.util.UUID;

@Component
public class JpaEstudanteRepositoryAdapter implements EstudanteRepository {
    private final SpringDataEstudanteRepository repository;

    public JpaEstudanteRepositoryAdapter(SpringDataEstudanteRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Estudante> buscarPorId(UUID id) {
        return repository.findById(id).map(e -> new Estudante(
            e.getId(),
            e.getNomeCompleto(),
            e.getMatricula(),
            e.getEmail(),
            e.getCursoId(),
            e.getSemestreAtual()
        ));
    }
}
