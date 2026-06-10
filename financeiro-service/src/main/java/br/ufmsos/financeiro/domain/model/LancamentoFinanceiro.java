package br.ufmsos.financeiro.domain.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Representa um Lançamento Financeiro (Receita ou Despesa).
 * Mandato: Valor deve ser positivo.
 */
public record LancamentoFinanceiro(
    UUID id,
    String descricao,
    BigDecimal valor,
    TipoLancamento tipo,
    LocalDate dataPagamento,
    UUID estudanteId,
    UUID categoriaId
) {
    public LancamentoFinanceiro {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor do lançamento deve ser maior que zero.");
        }
        if (descricao == null || descricao.isBlank()) {
            throw new IllegalArgumentException("A descrição é obrigatória.");
        }
    }
}

enum TipoLancamento {
    RECEITA, DESPESA
}
