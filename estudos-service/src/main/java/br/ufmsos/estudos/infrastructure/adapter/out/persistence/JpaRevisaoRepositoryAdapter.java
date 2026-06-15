package br.ufmsos.estudos.infrastructure.adapter.out.persistence;

import br.ufmsos.estudos.domain.model.Revisao;
import br.ufmsos.estudos.domain.repository.RevisaoRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JpaRevisaoRepositoryAdapter implements RevisaoRepository {
    private final SpringDataRevisaoRepository repository;

    public JpaRevisaoRepositoryAdapter(SpringDataRevisaoRepository repository) {
        this.repository = repository;
    }

    @Override
    public Revisao salvar(Revisao r) {
        var entity = new RevisaoEntity(r.id(), r.avaliacaoId(), r.dataHora(), r.duracaoMinutos(), r.estudanteId());
        var saved = repository.save(entity);
        return new Revisao(saved.getId(), saved.getAvaliacaoId(), saved.getDataHora(), saved.getDuracaoMinutos(), saved.getEstudanteId());
    }

    @Override
    public List<Revisao> buscarPorEstudante(UUID estudanteId) {
        return repository.findByEstudanteId(estudanteId).stream()
                .map(e -> new Revisao(e.getId(), e.getAvaliacaoId(), e.getDataHora(), e.getDuracaoMinutos(), e.getEstudanteId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Revisao> buscarPorAvaliacao(UUID avaliacaoId) {
        return repository.findByAvaliacaoId(avaliacaoId).stream()
                .map(e -> new Revisao(e.getId(), e.getAvaliacaoId(), e.getDataHora(), e.getDuracaoMinutos(), e.getEstudanteId()))
                .collect(Collectors.toList());
    }
}
