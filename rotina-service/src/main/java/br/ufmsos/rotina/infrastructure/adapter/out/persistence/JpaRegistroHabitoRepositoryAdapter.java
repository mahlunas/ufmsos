package br.ufmsos.rotina.infrastructure.adapter.out.persistence;

import br.ufmsos.rotina.domain.model.RegistroHabito;
import br.ufmsos.rotina.domain.repository.RegistroHabitoRepository;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JpaRegistroHabitoRepositoryAdapter implements RegistroHabitoRepository {
    private final SpringDataRegistroHabitoRepository repository;

    public JpaRegistroHabitoRepositoryAdapter(SpringDataRegistroHabitoRepository repository) {
        this.repository = repository;
    }

    @Override
    public RegistroHabito salvar(RegistroHabito r) {
        var entity = new RegistroHabitoEntity(r.id(), r.habitoId(), r.dataConclusao());
        var saved = repository.save(entity);
        return new RegistroHabito(saved.getId(), saved.getHabitoId(), saved.getDataConclusao());
    }

    @Override
    public List<RegistroHabito> listarPorHabitoEData(UUID habitoId, LocalDate data) {
        var inicio = data.atStartOfDay();
        var fim = data.plusDays(1).atStartOfDay();
        return repository.findByHabitoIdAndDataConclusaoBetween(habitoId, inicio, fim).stream()
                .map(e -> new RegistroHabito(e.getId(), e.getHabitoId(), e.getDataConclusao()))
                .collect(Collectors.toList());
    }
}
