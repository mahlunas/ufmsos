package br.ufmsos.financeiro.domain.model;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

/**
 * Representa o resumo financeiro de um estudante.
 */
public record ResumoFinanceiro(
    UUID estudanteId,
    BigDecimal saldoTotal,
    BigDecimal totalReceitas,
    BigDecimal totalDespesas,
    Map<String, BigDecimal> gastosPorCategoria
) {}
