package br.ufmsos.curriculo.infrastructure.adapter.out.persistence;

import br.ufmsos.curriculo.domain.model.Curriculo;
import br.ufmsos.curriculo.domain.repository.CurriculoRepository;
import org.springframework.stereotype.Component;
import java.util.Optional;
import java.util.UUID;

@Component
public class JpaCurriculoRepositoryAdapter implements CurriculoRepository {
    private final SpringDataCurriculoRepository repository;

    public JpaCurriculoRepositoryAdapter(SpringDataCurriculoRepository repository) {
        this.repository = repository;
    }

    @Override
    public Curriculo salvar(Curriculo c) {
        CurriculoEntity entity;
        if (c.id() != null) {
            entity = repository.findById(c.id())
                    .orElseGet(CurriculoEntity::new);
        } else {
            entity = repository.findByEstudanteId(c.estudanteId())
                    .orElseGet(CurriculoEntity::new);
        }

        entity.setId(c.id());
        entity.setNomeCompleto(c.nomeCompleto());
        entity.setObjetivo(c.objetivo());
        entity.setCompetencias(c.competencias());
        entity.setExperiencias(c.experiencias());
        entity.setEstudanteId(c.estudanteId());

        var saved = repository.save(entity);
        return new Curriculo(saved.getId(), saved.getNomeCompleto(), saved.getObjetivo(), saved.getCompetencias(), saved.getExperiencias(), saved.getEstudanteId());
    }

    @Override
    public Optional<Curriculo> buscarPorEstudante(UUID estudanteId) {
        return repository.findByEstudanteId(estudanteId)
                .map(e -> new Curriculo(e.getId(), e.getNomeCompleto(), e.getObjetivo(), e.getCompetencias(), e.getExperiencias(), e.getEstudanteId()));
    }
}
