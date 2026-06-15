package br.ufmsos.rotina.infrastructure.adapter.out.persistence;

import br.ufmsos.rotina.domain.model.Habito;
import br.ufmsos.rotina.domain.repository.HabitoRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JpaHabitoRepositoryAdapter implements HabitoRepository {
    private final SpringDataHabitoRepository repository;

    public JpaHabitoRepositoryAdapter(SpringDataHabitoRepository repository) {
        this.repository = repository;
    }

    @Override
    public Habito salvar(Habito h) {
        var entity = new HabitoEntity(h.id(), h.nome(), h.frequenciaDiaria(), h.estudanteId());
        var saved = repository.save(entity);
        return new Habito(saved.getId(), saved.getNome(), saved.getFrequenciaDiaria(), saved.getEstudanteId());
    }

    @Override
    public Optional<Habito> buscarPorId(UUID id) {
        return repository.findById(id).map(e -> new Habito(e.getId(), e.getNome(), e.getFrequenciaDiaria(), e.getEstudanteId()));
    }

    @Override
    public List<Habito> listarPorEstudante(UUID estudanteId) {
        return repository.findByEstudanteId(estudanteId).stream()
                .map(e -> new Habito(e.getId(), e.getNome(), e.getFrequenciaDiaria(), e.getEstudanteId()))
                .collect(Collectors.toList());
    }

    @Override
    public void excluir(UUID id) {
        repository.deleteById(id);
    }
}
