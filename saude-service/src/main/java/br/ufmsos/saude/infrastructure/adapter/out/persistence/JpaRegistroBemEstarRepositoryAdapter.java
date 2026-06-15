package br.ufmsos.saude.infrastructure.adapter.out.persistence;

import br.ufmsos.saude.domain.model.RegistroBemEstar;
import br.ufmsos.saude.domain.repository.RegistroBemEstarRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JpaRegistroBemEstarRepositoryAdapter implements RegistroBemEstarRepository {
    private final SpringDataSaudeRepository repository;

    public JpaRegistroBemEstarRepositoryAdapter(SpringDataSaudeRepository repository) {
        this.repository = repository;
    }

    @Override
    public RegistroBemEstar salvar(RegistroBemEstar r) {
        final var entity = new RegistroBemEstarEntity(
            r.id(), 
            r.nivelHumor(), 
            r.nivelExaustao(), 
            r.observacao(), 
            r.dataRegistro(), 
            r.estudanteId()
        );
        final var saved = repository.save(entity);
        return toDomain(saved);
    }

    @Override
    public List<RegistroBemEstar> buscarUltimosPorEstudante(UUID estudanteId, int limite) {
        return repository.findTopNByEstudanteId(estudanteId, PageRequest.of(0, limite)).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    private RegistroBemEstar toDomain(RegistroBemEstarEntity e) {
        return new RegistroBemEstar(
                e.getId(),
                e.getNivelHumor(),
                e.getNivelExaustao(),
                e.getObservacao(),
                e.getDataRegistro(),
                e.getEstudanteId()
        );
    }
}
