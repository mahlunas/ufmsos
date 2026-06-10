package br.ufmsos.financeiro.domain.repository;

import br.ufmsos.financeiro.domain.model.LancamentoFinanceiro;
import java.util.UUID;

public interface LancamentoRepository {
    LancamentoFinanceiro salvar(LancamentoFinanceiro lancamento);
}
