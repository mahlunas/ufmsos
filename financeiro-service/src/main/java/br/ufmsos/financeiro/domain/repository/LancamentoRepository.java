package br.ufmsos.financeiro.domain.repository;

import br.ufmsos.financeiro.domain.model.LancamentoFinanceiro;
import java.util.UUID;

public interface LancamentoRepository {
    LancamentoFinanceiro salvar(LancamentoFinanceiro lancamento);
    java.util.List<LancamentoFinanceiro> listarPorEstudante(java.util.UUID estudanteId);
    java.util.List<LancamentoFinanceiro> listarPorEstudanteEPiodo(java.util.UUID estudanteId, java.time.LocalDate inicio, java.time.LocalDate fim);
}
