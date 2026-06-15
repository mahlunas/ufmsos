package br.ufmsos.financeiro.application.usecase;

import br.ufmsos.financeiro.domain.model.LancamentoFinanceiro;
import br.ufmsos.financeiro.domain.repository.LancamentoRepository;

public class RegistrarLancamentoUseCase {
    private final LancamentoRepository repository;

    public RegistrarLancamentoUseCase(final LancamentoRepository repository) {
        this.repository = repository;
    }

    public LancamentoFinanceiro executar(final LancamentoFinanceiro lancamento) {
        // As validações de negócio (valor > 0) já estão no Record LancamentoFinanceiro
        return repository.salvar(lancamento);
    }
}
