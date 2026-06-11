package br.ufmsos.financeiro.infrastructure.adapter.out.persistence;

import br.ufmsos.financeiro.domain.model.LancamentoFinanceiro;
import br.ufmsos.financeiro.domain.repository.LancamentoRepository;
import org.springframework.stereotype.Component;

@Component
public class JpaLancamentoRepositoryAdapter implements LancamentoRepository {
    private final SpringDataLancamentoRepository repository;

    public JpaLancamentoRepositoryAdapter(SpringDataLancamentoRepository repository) {
        this.repository = repository;
    }

    @Override
    public LancamentoFinanceiro salvar(LancamentoFinanceiro lancamento) {
        final var entity = new LancamentoEntity(
            lancamento.id(), 
            lancamento.descricao(), 
            lancamento.valor(), 
            "RECEITA", // Simplificado
            lancamento.dataPagamento(), 
            lancamento.estudanteId(), 
            lancamento.categoriaId()
        );
        final var saved = repository.save(entity);
        return new LancamentoFinanceiro(
            saved.getId(), 
            saved.getDescricao(), 
            saved.getValor(), 
            null, // tipo enum
            saved.getDataPagamento(), 
            saved.getEstudanteId(), 
            saved.getCategoriaId()
        );
    }
}
