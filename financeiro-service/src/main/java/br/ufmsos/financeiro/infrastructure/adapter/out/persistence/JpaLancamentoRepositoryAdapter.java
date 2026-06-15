package br.ufmsos.financeiro.infrastructure.adapter.out.persistence;

import br.ufmsos.financeiro.domain.model.LancamentoFinanceiro;
import br.ufmsos.financeiro.domain.model.TipoLancamentoEnum;
import br.ufmsos.financeiro.domain.repository.LancamentoRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JpaLancamentoRepositoryAdapter implements LancamentoRepository {
    private final SpringDataLancamentoRepository repository;

    public JpaLancamentoRepositoryAdapter(SpringDataLancamentoRepository repository) {
        this.repository = repository;
    }

    @Override
    public LancamentoFinanceiro salvar(LancamentoFinanceiro l) {
        final var entity = new LancamentoEntity(
            l.id(), 
            l.descricao(), 
            l.valor(), 
            l.tipo().name(), 
            l.dataPagamento(), 
            l.estudanteId(), 
            l.categoriaId()
        );
        final var saved = repository.save(entity);
        return toDomain(saved);
    }

    @Override
    public List<LancamentoFinanceiro> listarPorEstudante(UUID estudanteId) {
        return repository.findByEstudanteId(estudanteId).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<LancamentoFinanceiro> listarPorEstudanteEPiodo(UUID estudanteId, LocalDate inicio, LocalDate fim) {
        return repository.findByEstudanteIdAndDataPagamentoBetween(estudanteId, inicio, fim).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    private LancamentoFinanceiro toDomain(LancamentoEntity e) {
        return new LancamentoFinanceiro(
                e.getId(),
                e.getDescricao(),
                e.getValor(),
                TipoLancamentoEnum.valueOf(e.getTipo()),
                e.getDataPagamento(),
                e.getEstudanteId(),
                e.getCategoriaId()
        );
    }
}
