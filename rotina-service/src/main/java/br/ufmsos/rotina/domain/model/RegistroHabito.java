package br.ufmsos.rotina.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Representa a conclusão de um hábito.
 */
public record RegistroHabito(
    UUID id,
    UUID habitoId,
    LocalDateTime dataConclusao
) {
    public RegistroHabito {
        if (dataConclusao == null) {
            dataConclusao = LocalDateTime.now();
        }
    }
}
