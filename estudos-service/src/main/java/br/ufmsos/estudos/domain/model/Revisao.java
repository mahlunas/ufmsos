package br.ufmsos.estudos.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Representa um agendamento de revisão para uma avaliação.
 */
public record Revisao(
    UUID id,
    UUID avaliacaoId,
    LocalDateTime dataHora,
    Integer duracaoMinutos,
    UUID estudanteId
) {
    public Revisao {
        if (dataHora == null || dataHora.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("A data da revisão deve ser no futuro.");
        }
        if (duracaoMinutos != null && duracaoMinutos <= 0) {
            throw new IllegalArgumentException("A duração deve ser positiva.");
        }
    }
}
