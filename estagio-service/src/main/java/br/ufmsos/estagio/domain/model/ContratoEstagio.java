package br.ufmsos.estagio.domain.model;

import java.time.LocalDate;
import java.util.UUID;

/**
 * Representa um Contrato de Estágio.
 * Mandato: Limite de 30h semanais.
 */
public record ContratoEstagio(
    UUID id,
    String empresaNome,
    LocalDate dataInicio,
    LocalDate dataFim,
    Integer cargaHorariaSemanal,
    UUID estudanteId,
    boolean ativo
) {
    public ContratoEstagio {
        if (cargaHorariaSemanal == null || cargaHorariaSemanal > 30) {
            throw new IllegalArgumentException("A carga horária semanal não pode exceder 30 horas (Teto Estatutário).");
        }
        if (cargaHorariaSemanal <= 0) {
            throw new IllegalArgumentException("A carga horária deve ser positiva.");
        }
    }
}
