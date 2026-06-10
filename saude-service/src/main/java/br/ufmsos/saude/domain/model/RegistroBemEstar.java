package br.ufmsos.saude.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

public record RegistroBemEstar(
    UUID id,
    int nivelHumor,
    int nivelExaustao,
    String observacao,
    LocalDateTime dataRegistro,
    UUID estudanteId
) {
    public RegistroBemEstar {
        if (nivelHumor < 1 || nivelHumor > 5) throw new IllegalArgumentException("Humor deve ser entre 1 e 5.");
        if (nivelExaustao < 1 || nivelExaustao > 5) throw new IllegalArgumentException("Exaustão deve ser entre 1 e 5.");
    }
}
